# baara.ai — Technical Architecture & Production Pipeline Engine (Bamako Edge Release)

**Project:** `baara.ai` (Bamako, Mali)  
**Target Environment:** West African Mobile Edge (Orange Mali / Moov Africa 3G HSPA+ & 4G LTE)  
**Color Science Anchors:** Terracotta (`#C85A32`), Mali Gold (`#E5A93C`), Deep Indigo (`#0B132B`)

---

## Project Structure

```text
Baara_AI_AGY_Version/
├── README.md                          # Architecture blueprint & operational guide
├── config/
│   ├── asset_bandwidth_matrix.json    # Deliverable 1: ABR ladder, codecs, payload budgets & fallbacks
│   ├── parametric_prompts.json        # Deliverable 2: HeyGen & Runway Gen-3 deterministic prompt matrix
│   └── timeline_schedule.json         # L-cut / J-cut edit decision list & audio sidechain spec
├── pipeline/
│   ├── generate_synthetic_sources.py  # Generates deterministic Sahel-graded test stems (HeyGen + 6 Runway clips + Kora bed)
│   ├── baara_pipeline_engine.py       # Deliverable 3: Idempotent FFmpeg L/J-cut assembler, -14dB sidechain ducker & CMAF packager
│   └── verify_qa_gate.py              # Deliverable 4: Automated QA verifier (AV drift <45ms, CIEDE2000 delta-E, 1.5Mbps TTFF)
└── web/
    ├── index.html                     # Low-latency Bamako Edge player shell + telemetry HUD + ABR/Fallback controller
    ├── sw-media-engine.js             # Offline-first Service Worker with Range-request CMAF caching & 2G Save-Data fallback
    └── app.js                         # Network Information API probe, LL-HLS/CMAF loader, real-time TTFF & QA telemetry UI
```

## Quick Start

### 1. Generate Reference Source Stems (or place raw HeyGen / Runway clips in `assets/raw/`)
```bash
python3 pipeline/generate_synthetic_sources.py
```

### 2. Run the Idempotent Assembly & CMAF Transcoding Pipeline
```bash
python3 pipeline/baara_pipeline_engine.py
```

### 3. Execute the Pre-Deployment QA Gate
```bash
python3 pipeline/verify_qa_gate.py
```

### 4. Launch the Low-Latency Bamako Edge Web Player
```bash
python3 -m http.server 8090 --directory .
# Open http://localhost:8090/web/
```
