#!/usr/bin/env python3
"""
baara.ai — Automated Media Assembly, Audio Ducking & CMAF Edge Transcoding Engine
Target: Bamako, Mali (3G/4G Low-Latency Mobile Delivery)
"""

from __future__ import annotations

import hashlib
import json
import logging
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import List

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | [baara-engine] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("baara_pipeline")

PROJECT_ROOT = Path(__file__).resolve().parent.parent


@dataclass(frozen=True)
class BRollInsert:
    scene_id: str
    clip_path: str
    timeline_video_in: float
    timeline_video_out: float
    clip_seek_in: float = 0.0
    fade_in_sec: float = 0.25
    fade_out_sec: float = 0.25
    cut_type: str = "L-CUT"
    narrative_note: str = ""


@dataclass(frozen=True)
class RenditionTier:
    tier_id: str
    width: int
    height: int
    fps: int
    v_bitrate_kbps: int
    v_maxrate_kbps: int
    v_bufsize_kbps: int
    a_bitrate_kbps: int
    a_channels: int
    av1_preset: int
    h264_profile: str
    h264_level: str


ABR_LADDER: List[RenditionTier] = [
    RenditionTier("T0_360p_3G",   640,  360,  24, 240,  340,  680,  32, 1, 10, "main", "3.0"),
    RenditionTier("T1_480p_Edge", 768,  432,  24, 480,  680,  1360, 48, 2, 10, "main", "3.1"),
    RenditionTier("T2_720p_4G",   1280, 720,  24, 950,  1350, 2700, 64, 2, 9,  "high", "3.1"),
    RenditionTier("T3_1080p_HD",  1920, 1080, 24, 1850, 2600, 5200, 96, 2, 8,  "high", "4.0"),
]


class BaaraMediaPipeline:
    def __init__(self, config: dict, build_dir: Path):
        self.config = config
        self.build_dir = build_dir
        self.intermediate_dir = build_dir / "intermediate"
        self.dist_dir = build_dir / "dist"
        self.manifest_lock_file = build_dir / ".pipeline_state.sha256"
        self.fps = int(config.get("fps", 24))
        self.gop_frames = self.fps * 2  # Strict 2.0s closed GOP (48 frames @ 24fps)
        self.broll_items = [BRollInsert(**item) for item in config["broll_schedule"]]

    def _resolve_path(self, rel_or_abs: str) -> Path:
        p = Path(rel_or_abs)
        return p if p.is_absolute() else (PROJECT_ROOT / p)

    def _compute_pipeline_signature(self) -> str:
        hasher = hashlib.sha256()
        hasher.update(json.dumps(self.config, sort_keys=True).encode("utf-8"))
        input_files = [
            self.config["presenter_video"],
            self.config["presenter_audio"],
            self.config["music_bed"],
            *[b.clip_path for b in self.broll_items],
        ]
        for fpath in input_files:
            p = self._resolve_path(fpath)
            if p.exists():
                stat = p.stat()
                hasher.update(f"{p.resolve()}:{stat.st_size}:{stat.st_mtime_ns}".encode("utf-8"))
        return hasher.hexdigest()

    def is_up_to_date(self) -> bool:
        if not self.manifest_lock_file.exists():
            return False
        recorded_sig = self.manifest_lock_file.read_text(encoding="utf-8").strip()
        current_sig = self._compute_pipeline_signature()
        master_hls = self.dist_dir / "master_h264.m3u8"
        return (recorded_sig == current_sig) and master_hls.exists()

    def _has_encoder(self, encoder_name: str) -> bool:
        res = subprocess.run(
            ["ffmpeg", "-hide_banner", "-encoders"],
            capture_output=True,
            text=True,
        )
        return encoder_name in res.stdout

    def _run_ffmpeg(self, args: List[str], step_name: str) -> None:
        cmd = ["ffmpeg", "-hide_banner", "-y", *args]
        logger.info("Executing [%s]...", step_name)
        proc = subprocess.run(cmd, capture_output=True, text=True)
        if proc.returncode != 0:
            logger.error("FFmpeg failure in [%s]:\n%s", step_name, proc.stderr[-2000:])
            raise RuntimeError(f"Pipeline step '{step_name}' failed with code {proc.returncode}")

    def assemble_master_video(self) -> Path:
        """
        Splices Runway Gen-3 B-roll dynamically over the HeyGen presenter spine
        according to the predefined JSON schedule (L-cuts and J-cuts).
        """
        output_mezzanine = self.intermediate_dir / "mezzanine_video_1080p24.mp4"
        inputs = ["-i", str(self._resolve_path(self.config["presenter_video"]))]
        for broll in self.broll_items:
            inputs.extend(["-i", str(self._resolve_path(broll.clip_path))])

        filter_chains: List[str] = [
            f"[0:v]fps={self.fps},scale=1920:1080:flags=lanczos,setsar=1,format=yuv420p[base0]"
        ]

        prev_label = "base0"
        for idx, broll in enumerate(self.broll_items, start=1):
            clip_dur = round(broll.timeline_video_out - broll.timeline_video_in, 4)
            fade_out_start = round(max(0.0, clip_dur - broll.fade_out_sec), 4)
            ov_label = f"broll{idx}"
            next_label = f"base{idx}"

            filter_chains.append(
                f"[{idx}:v]trim=start={broll.clip_seek_in}:duration={clip_dur},"
                f"fps={self.fps},scale=1920:1080:force_original_aspect_ratio=increase,"
                f"crop=1920:1080,setsar=1,"
                f"format=yuva420p,"
                f"fade=t=in:st=0:d={broll.fade_in_sec}:alpha=1,"
                f"fade=t=out:st={fade_out_start}:d={broll.fade_out_sec}:alpha=1,"
                f"setpts=PTS-STARTPTS+{broll.timeline_video_in}/TB[{ov_label}]"
            )
            filter_chains.append(
                f"[{prev_label}][{ov_label}]overlay=0:0:"
                f"enable='between(t,{broll.timeline_video_in},{broll.timeline_video_out})'[{next_label}]"
            )
            prev_label = next_label

        filter_chains.append(f"[{prev_label}]format=yuv420p[v_master]")
        filter_complex = ";".join(filter_chains)

        self._run_ffmpeg(
            [
                *inputs,
                "-filter_complex", filter_complex,
                "-map", "[v_master]",
                "-c:v", "libx264",
                "-preset", "fast",
                "-crf", "14",
                "-pix_fmt", "yuv420p",
                "-r", str(self.fps),
                "-t", str(self.config["duration_sec"]),
                str(output_mezzanine),
            ],
            step_name="assemble_master_video_l_j_cuts",
        )
        return output_mezzanine

    def mix_and_normalize_audio(self) -> Path:
        """
        Normalizes speech audio (-16 LUFS) and ducks background music by -14dB
        during voice activity via sidechain compression.
        """
        output_audio = self.intermediate_dir / "master_audio_48k.wav"
        presenter_audio = self._resolve_path(self.config["presenter_audio"])
        music_bed = self._resolve_path(self.config["music_bed"])

        audio_filter = (
            "[0:a]aresample=48000,highpass=f=85,"
            "equalizer=f=3200:t=q:w=1.2:g=2.0,"
            "loudnorm=I=-16:TP=-1.5:LRA=7,asplit=2[voice_main][voice_sc];"
            "[1:a]aresample=48000,volume=-8dB[music_pre];"
            "[music_pre][voice_sc]sidechaincompress="
            "threshold=0.025:ratio=10:attack=15:release=650:makeup=1.0:knee=2.8:level_sc=2.5[music_ducked];"
            "[voice_main][music_ducked]amix=inputs=2:duration=first:dropout_transition=0,"
            "alimiter=limit=0.891[a_master]"
        )

        self._run_ffmpeg(
            [
                "-i", str(presenter_audio),
                "-i", str(music_bed),
                "-filter_complex", audio_filter,
                "-map", "[a_master]",
                "-c:a", "pcm_s24le",
                "-ar", "48000",
                "-ac", "2",
                "-t", str(self.config["duration_sec"]),
                str(output_audio),
            ],
            step_name="sidechain_audio_ducking_minus_14db",
        )

        # Mux a unified mezzanine master (video + audio) for sync verification
        muxed_mezzanine = self.intermediate_dir / "mezzanine_muxed_1080p24.mp4"
        self._run_ffmpeg(
            [
                "-i", str(self.intermediate_dir / "mezzanine_video_1080p24.mp4"),
                "-i", str(output_audio),
                "-c:v", "copy",
                "-c:a", "aac",
                "-b:a", "192k",
                "-movflags", "+faststart",
                str(muxed_mezzanine),
            ],
            step_name="mux_mezzanine_master",
        )
        return output_audio

    def generate_fallback_assets(self, mezzanine_video: Path, master_audio: Path) -> None:
        """Generates low-data WebP poster, animated WebP storyboard loop, and 32kbps audio fallback."""
        poster_path = self.dist_dir / "poster-sahel-hero.webp"
        anim_webp_path = self.dist_dir / "storyboard-loop.webp"
        lite_audio_path = self.dist_dir / "audio-only-lite.m4a"

        if self._has_encoder("libwebp"):
            self._run_ffmpeg(
                [
                    "-ss", "2.50",
                    "-i", str(mezzanine_video),
                    "-frames:v", "1",
                    "-vf", "scale=1280:720:flags=lanczos",
                    "-c:v", "libwebp",
                    "-lossless", "0",
                    "-compression_level", "6",
                    "-q:v", "60",
                    str(poster_path),
                ],
                step_name="generate_low_data_poster_webp",
            )
        else:
            # Extract intermediate PNG and encode via official libwebp `cwebp` CLI
            tmp_poster_png = self.intermediate_dir / "poster_tmp.png"
            self._run_ffmpeg(
                [
                    "-ss", "2.50",
                    "-i", str(mezzanine_video),
                    "-frames:v", "1",
                    "-vf", "scale=1280:720:flags=lanczos",
                    str(tmp_poster_png),
                ],
                step_name="extract_poster_png",
            )
            logger.info("Encoding low-data WebP poster via cwebp...")
            subprocess.run(
                ["cwebp", "-quiet", "-q", "60", "-m", "6", "-sharp_yuv", str(tmp_poster_png), "-o", str(poster_path)],
                check=True,
            )

        if self._has_encoder("libwebp_anim"):
            select_expr = "+".join(
                [f"eq(n\\,{int((b.timeline_video_in + 1.5) * self.fps)})" for b in self.broll_items]
            )
            self._run_ffmpeg(
                [
                    "-i", str(mezzanine_video),
                    "-vf", f"select='{select_expr}',scale=640:360:flags=lanczos,setpts=N/(2*TB),fps=2",
                    "-c:v", "libwebp_anim",
                    "-loop", "0",
                    "-compression_level", "6",
                    "-q:v", "45",
                    str(anim_webp_path),
                ],
                step_name="generate_animated_webp_fallback",
            )
        else:
            # Extract 6 B-roll keyframes as PNGs and assemble animated WebP via `img2webp`
            frame_pngs: List[str] = []
            for idx, broll in enumerate(self.broll_items):
                ts = round(broll.timeline_video_in + 1.5, 2)
                frame_png = self.intermediate_dir / f"story_frame_{idx:02d}.png"
                self._run_ffmpeg(
                    [
                        "-ss", str(ts),
                        "-i", str(mezzanine_video),
                        "-frames:v", "1",
                        "-vf", "scale=640:360:flags=lanczos",
                        str(frame_png),
                    ],
                    step_name=f"extract_storyboard_frame_{idx:02d}",
                )
                frame_pngs.extend(["-d", "500", "-lossy", "-q", "48", "-m", "6", str(frame_png)])

            logger.info("Assembling 6-frame animated WebP storyboard via img2webp...")
            subprocess.run(
                ["img2webp", "-loop", "0", *frame_pngs, "-o", str(anim_webp_path)],
                check=True,
            )

        self._run_ffmpeg(
            [
                "-i", str(master_audio),
                "-c:a", "aac",
                "-b:a", "32k",
                "-ac", "1",
                "-ar", "48000",
                "-movflags", "+faststart",
                str(lite_audio_path),
            ],
            step_name="generate_32kbps_lite_audio",
        )

    def package_cmaf_hls_and_dash(self, mezzanine_video: Path, master_audio: Path) -> None:
        """Packages multi-bitrate CMAF HLS (.m3u8) and DASH (.mpd) manifests."""
        split_count = len(ABR_LADDER)
        split_outputs = "".join([f"[vin{i}]" for i in range(split_count)])
        scale_filters = [f"[0:v]split={split_count}{split_outputs}"]
        for i, tier in enumerate(ABR_LADDER):
            scale_filters.append(
                f"[vin{i}]scale=w={tier.width}:h={tier.height}:flags=lanczos,setdar=16/9[v_out{i}]"
            )
        filter_complex = ";".join(scale_filters)

        # 1. Universal H.264 CMAF HLS Ladder
        hls_args: List[str] = [
            "-i", str(mezzanine_video),
            "-i", str(master_audio),
            "-filter_complex", filter_complex,
        ]
        var_stream_map_parts: List[str] = []

        for i, tier in enumerate(ABR_LADDER):
            hls_args.extend([
                "-map", f"[v_out{i}]",
                "-map", "1:a:0",
                f"-c:v:{i}", "libx264",
                f"-profile:v:{i}", tier.h264_profile,
                f"-level:v:{i}", tier.h264_level,
                f"-b:v:{i}", f"{tier.v_bitrate_kbps}k",
                f"-maxrate:v:{i}", f"{tier.v_maxrate_kbps}k",
                f"-bufsize:v:{i}", f"{tier.v_bufsize_kbps}k",
                f"-g:v:{i}", str(self.gop_frames),
                f"-keyint_min:v:{i}", str(self.gop_frames),
                f"-sc_threshold:v:{i}", "0",
                f"-c:a:{i}", "aac",
                f"-b:a:{i}", f"{tier.a_bitrate_kbps}k",
                f"-ac:a:{i}", str(tier.a_channels),
                "-ar", "48000",
            ])
            var_stream_map_parts.append(f"v:{i},a:{i},name:{tier.tier_id}")

        hls_args.extend([
            "-f", "hls",
            "-hls_time", "2",
            "-hls_playlist_type", "vod",
            "-hls_flags", "independent_segments",
            "-hls_segment_type", "fmp4",
            "-hls_fmp4_init_filename", "init_%v.mp4",
            "-hls_segment_filename", str(self.dist_dir / "seg_%v_%03d.m4s"),
            "-master_pl_name", "master_h264.m3u8",
            "-var_stream_map", " ".join(var_stream_map_parts),
            str(self.dist_dir / "stream_%v.m3u8"),
        ])
        self._run_ffmpeg(hls_args, step_name="package_cmaf_hls_abr_ladder")

        # 2. DASH (.mpd) + HLS Dual Manifest (Uses libsvtav1 if compiled, else libx265/libx264)
        dash_dir = self.dist_dir / "cmaf_dash"
        dash_dir.mkdir(parents=True, exist_ok=True)
        primary_codec = "libsvtav1" if self._has_encoder("libsvtav1") else (
            "libx265" if self._has_encoder("libx265") else "libx264"
        )
        logger.info("Using primary next-gen codec '%s' for DASH/HLS dual manifest", primary_codec)

        dash_args: List[str] = [
            "-i", str(mezzanine_video),
            "-i", str(master_audio),
            "-filter_complex", filter_complex,
        ]
        for i, tier in enumerate(ABR_LADDER):
            dash_args.extend([
                "-map", f"[v_out{i}]",
                f"-c:v:{i}", primary_codec,
                f"-b:v:{i}", f"{tier.v_bitrate_kbps}k",
                f"-g:v:{i}", str(self.gop_frames),
            ])
            if primary_codec == "libsvtav1":
                dash_args.extend([f"-preset:v:{i}", str(tier.av1_preset)])
            else:
                dash_args.extend([
                    f"-maxrate:v:{i}", f"{tier.v_maxrate_kbps}k",
                    f"-bufsize:v:{i}", f"{tier.v_bufsize_kbps}k",
                ])

        dash_args.extend([
            "-map", "1:a:0",
            "-c:a:0", "aac",
            "-b:a:0", "48k",
            "-ar", "48000",
            "-ac", "2",
            "-f", "dash",
            "-seg_duration", "2",
            "-use_template", "1",
            "-use_timeline", "1",
            "-hls_playlist", "1",
            "-hls_master_name", "master_nextgen.m3u8",
            "-adaptation_sets", "id=0,streams=v id=1,streams=a",
            str(dash_dir / "manifest.mpd"),
        ])
        self._run_ffmpeg(dash_args, step_name="package_dash_and_hls_cmaf")

    def run(self, force: bool = False) -> None:
        self.intermediate_dir.mkdir(parents=True, exist_ok=True)
        self.dist_dir.mkdir(parents=True, exist_ok=True)

        if not force and self.is_up_to_date():
            logger.info("Idempotency check PASSED: Outputs match input signature. Skipping build.")
            return

        logger.info("Starting baara.ai Production Media Assembly Pipeline...")
        mezzanine_video = self.assemble_master_video()
        master_audio = self.mix_and_normalize_audio()
        self.generate_fallback_assets(mezzanine_video, master_audio)
        self.package_cmaf_hls_and_dash(mezzanine_video, master_audio)

        self.manifest_lock_file.write_text(self._compute_pipeline_signature(), encoding="utf-8")
        logger.info("Pipeline complete. Deliverables written to: %s", self.dist_dir.resolve())


if __name__ == "__main__":
    schedule_file = PROJECT_ROOT / "config" / "timeline_schedule.json"
    active_config = json.loads(schedule_file.read_text(encoding="utf-8"))
    pipeline = BaaraMediaPipeline(
        config=active_config,
        build_dir=PROJECT_ROOT / "build_baara_media",
    )
    pipeline.run(force="--force" in sys.argv)
