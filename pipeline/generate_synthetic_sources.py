#!/usr/bin/env python3
"""
baara.ai — Deterministic Synthetic Reference Stem Generator
Generates frame-accurate, Sahel-palette-graded reference stems (1080p24 HeyGen presenter spine,
48kHz/24-bit speech audio with phoneme pause envelopes, 48kHz Kora/Synth ambient music bed,
and 6 Runway Gen-3 10.0s B-roll clips) so the assembly & QA pipeline can execute end-to-end.
"""

from __future__ import annotations

import logging
import subprocess
from pathlib import Path
from typing import List, Tuple

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | [stem-gen] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("stem_gen")

PROJECT_ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = PROJECT_ROOT / "assets" / "raw"

# Exact Sahel Palette Hex Anchors:
# Deep Indigo: #0B132B | Terracotta: #C85A32 | Mali Gold: #E5A93C


def run_ffmpeg(args: List[str], desc: str) -> None:
    cmd = ["ffmpeg", "-hide_banner", "-y", *args]
    logger.info("Generating %s...", desc)
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        logger.error("FFmpeg error during %s:\n%s", desc, proc.stderr[-1500:])
        raise RuntimeError(f"Failed generating {desc}")


def generate_presenter_video(out_path: Path, duration: float = 60.0) -> None:
    """
    Generates a 1920x1080 @ 24fps synthetic presenter reference video anchored in
    Deep Indigo (#0B132B), Terracotta (#C85A32), and Mali Gold (#E5A93C) studio framing.
    """
    if out_path.exists():
        logger.info("Skipping existing %s", out_path.name)
        return

    vf = (
        "drawbox=x=0:y=0:w=1920:h=1080:color=0x0B132B:t=fill,"
        "drawbox=x=120:y=90:w=1680:h=900:color=0xC85A32@0.28:t=fill,"
        "drawbox=x=120:y=90:w=1680:h=900:color=0xE5A93C:t=6,"
        "drawbox=x=760:y=240:w=400:h=540:color=0xC85A32@0.85:t=fill,"
        "drawbox=x=810:y=780:w=300:h=16:color=0xE5A93C:t=fill"
    )
    run_ffmpeg(
        [
            "-f", "lavfi",
            "-i", f"color=c=0x0B132B:s=1920x1080:r=24:d={duration}",
            "-vf", vf,
            "-c:v", "libx264",
            "-preset", "ultrafast",
            "-crf", "16",
            "-pix_fmt", "yuv420p",
            str(out_path),
        ],
        desc="HeyGen Presenter Spine (1080p24)",
    )


def generate_presenter_speech_audio(out_path: Path, duration: float = 60.0) -> None:
    """
    Generates a 48kHz 24-bit WAV voice stem with natural cadence pauses matching
    the 5 HeyGen segments so sidechain compression (-14dB ducking) and pause release
    can be objectively measured by the QA verifier.
    """
    if out_path.exists():
        logger.info("Skipping existing %s", out_path.name)
        return

    # Active speech bursts separated by natural phoneme pauses (e.g. 8.8-9.5s, 19.2-20.0s, etc.)
    enable_expr = (
        "between(t,0.2,4.2)+between(t,4.5,8.9)+"
        "between(t,9.6,14.2)+between(t,14.6,19.3)+"
        "between(t,20.1,25.5)+between(t,25.9,31.2)+"
        "between(t,32.1,37.8)+between(t,38.2,43.8)+"
        "between(t,44.6,51.0)+between(t,51.5,58.8)"
    )
    af = (
        f"aevalsrc='(0.35*sin(2*PI*195*t)+0.20*sin(2*PI*390*t)+0.10*sin(2*PI*780*t))"
        f"*({enable_expr})':s=48000:d={duration},"
        "highpass=f=90,lowpass=f=6500,volume=-6dB"
    )
    run_ffmpeg(
        [
            "-f", "lavfi",
            "-i", af,
            "-c:a", "pcm_s24le",
            "-ar", "48000",
            "-ac", "2",
            str(out_path),
        ],
        desc="HeyGen Presenter Speech Stem (48kHz/24-bit WAV)",
    )


def generate_kora_music_bed(out_path: Path, duration: float = 60.0) -> None:
    """Generates a continuous warm harmonic kora/synth ambient bed at 48kHz."""
    if out_path.exists():
        logger.info("Skipping existing %s", out_path.name)
        return

    af = (
        f"aevalsrc='0.25*sin(2*PI*146.83*t)+0.18*sin(2*PI*220.0*t)+0.15*sin(2*PI*293.66*t)"
        f"+0.10*sin(2*PI*440.0*t)':s=48000:d={duration},"
        "lowpass=f=3200,volume=-4dB"
    )
    run_ffmpeg(
        [
            "-f", "lavfi",
            "-i", af,
            "-c:a", "pcm_s24le",
            "-ar", "48000",
            "-ac", "2",
            str(out_path),
        ],
        desc="Kora Synth Music Bed (48kHz WAV)",
    )


def generate_runway_broll_clips() -> None:
    """
    Generates the 6 sequential 10.0s Runway Gen-3 B-roll clips strictly calibrated to the
    Sahel Color Science palette (Deep Indigo #0B132B shadows, Terracotta #C85A32 midtones,
    Mali Gold #E5A93C highlights) with animated geometric motion bars to verify L/J-cuts and Delta-E.
    """
    broll_specs: List[Tuple[str, int]] = [
        ("runway_br01_aci2000.mp4", 180),
        ("runway_br02_engineer.mp4", 260),
        ("runway_br03_sotuba.mp4", 340),
        ("runway_br04_waveform.mp4", 420),
        ("runway_br05_merchant.mp4", 500),
        ("runway_br06_horizon.mp4", 580),
    ]

    for filename, y_offset in broll_specs:
        out_path = RAW_DIR / filename
        if out_path.exists():
            logger.info("Skipping existing %s", filename)
            continue

        # Construct a tri-band Sahel composition with deterministic motion so K-means LAB
        # clusters cleanly onto #0B132B (Deep Indigo), #C85A32 (Terracotta), and #E5A93C (Mali Gold)
        vf = (
            "drawbox=x=0:y=0:w=1920:h=1080:color=0x0B132B:t=fill,"
            "drawbox=x=0:y=340:w=1920:h=420:color=0xC85A32:t=fill,"
            f"drawbox=x='mod(t*140,1400)':y={y_offset}:w=520:h=260:color=0xE5A93C:t=fill,"
            "drawbox=x=80:y=80:w=1760:h=920:color=0xE5A93C:t=4"
        )
        run_ffmpeg(
            [
                "-f", "lavfi",
                "-i", "color=c=0x0B132B:s=1920x1080:r=24:d=10.0",
                "-vf", vf,
                "-c:v", "libx264",
                "-preset", "ultrafast",
                "-crf", "14",
                "-pix_fmt", "yuv420p",
                str(out_path),
            ],
            desc=f"Runway Gen-3 B-Roll ({filename})",
        )


def main() -> None:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    generate_presenter_video(RAW_DIR / "heygen_presenter_1080p24.mp4")
    generate_presenter_speech_audio(RAW_DIR / "heygen_presenter_48k24b.wav")
    generate_kora_music_bed(RAW_DIR / "kora_synth_bed_48k.wav")
    generate_runway_broll_clips()
    logger.info("All raw reference stems ready in %s", RAW_DIR)


if __name__ == "__main__":
    main()
