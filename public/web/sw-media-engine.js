/**
 * baara.ai — Bamako Mobile Edge Service Worker (sw-media-engine.js)
 * Features:
 *  - Tiered Cache Partitioning (Static Shell, Lite Audio-Only Track, CMAF Video Segments)
 *  - HTTP 206 Partial Content Range-Request handler for cached .m4s / .mp4 segments
 *  - Save-Data / 2G header interception to rewrite heavy streams to Animated WebP + 32kbps Audio
 */

const CACHE_STATIC = "baara-static-cohorte2027-v1";
const CACHE_AUDIO_LITE = "baara-audio-cohorte2027-v1";
const CACHE_VIDEO_CMAF = "baara-video-cmaf-cohorte2027-v1";
const MAX_VIDEO_CACHE_ENTRIES = 60; // ~12-18 MB cap for 2s CMAF chunks

const PRECACHE_STATIC_ASSETS = [
  "./",
  "./index.html",
  "./app.js?v=cohorte2027-v1",
  "../media/baara-cohorte2027-v1-poster.webp"
];

// The approved video carries its own music and narration.
const PRECACHE_AUDIO_ASSETS = [];

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_STATIC).then((cache) => cache.addAll(PRECACHE_STATIC_ASSETS).catch(() => {})),
      caches.open(CACHE_AUDIO_LITE).then((cache) => cache.addAll(PRECACHE_AUDIO_ASSETS).catch(() => {}))
    ]).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  const allowedCaches = new Set([CACHE_STATIC, CACHE_AUDIO_LITE, CACHE_VIDEO_CMAF]);
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => (!allowedCaches.has(key) ? caches.delete(key) : Promise.resolve()))
      )
    ).then(() => self.clients.claim())
  );
});

/**
 * Enforces an LRU-style entry cap on the CMAF video segment cache so budget Android devices
 * in Bamako never suffer storage exhaustion.
 */
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    return trimCache(cacheName, maxItems);
  }
}

/**
 * Serves HTTP 206 Partial Content responses from a cached full ArrayBuffer when the browser
 * media engine requests byte ranges of `init.mp4` or `.m4s` segments.
 */
async function handleRangeRequest(request, cachedResponse) {
  const rangeHeader = request.headers.get("range");
  if (!rangeHeader || !cachedResponse) {
    return cachedResponse;
  }
  const arrayBuffer = await cachedResponse.arrayBuffer();
  const bytes = /^bytes=(\d+)-(\d+)?$/g.exec(rangeHeader);
  if (!bytes) {
    return cachedResponse;
  }
  const start = Number(bytes[1]);
  const end = bytes[2] ? Number(bytes[2]) : arrayBuffer.byteLength - 1;
  const slicedBuffer = arrayBuffer.slice(start, end + 1);

  return new Response(slicedBuffer, {
    status: 206,
    statusText: "Partial Content",
    headers: [
      ["Content-Type", cachedResponse.headers.get("Content-Type") || "video/iso.segment"],
      ["Content-Range", `bytes ${start}-${end}/${arrayBuffer.byteLength}`],
      ["Content-Length", String(slicedBuffer.byteLength)],
      ["X-Baara-Edge-Cache", "HIT-RANGE"]
    ]
  });
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Let the server handle byte ranges for the approved progressive video.
  // A cached full response must not replace a partial response during seeking.
  if (url.pathname.startsWith("/media/") && url.pathname.endsWith(".mp4")) {
    return;
  }

  // 1. CMAF Segments (.m4s, init_*.mp4) & HLS/DASH Manifests (.m3u8, .mpd)
  if (
    url.pathname.endsWith(".m4s") ||
    url.pathname.endsWith(".m3u8") ||
    url.pathname.endsWith(".mpd") ||
    url.pathname.includes("init_")
  ) {
    event.respondWith(
      caches.open(CACHE_VIDEO_CMAF).then(async (cache) => {
        const cached = await cache.match(request.url);
        if (cached) {
          if (request.headers.has("range")) {
            return handleRangeRequest(request, cached);
          }
          return cached;
        }
        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request.url, networkResponse.clone());
            trimCache(CACHE_VIDEO_CMAF, MAX_VIDEO_CACHE_ENTRIES);
          }
          return networkResponse;
        } catch (err) {
          return new Response("Offline CMAF segment miss", { status: 503 });
        }
      })
    );
    return;
  }

  // 2. Lite Audio-Only Track (Cache-First for uninterrupted voiceover during 3G dropouts)
  if (url.pathname.endsWith("audio-only-lite.m4a")) {
    event.respondWith(
      caches.open(CACHE_AUDIO_LITE).then(async (cache) => {
        const cached = await cache.match(request.url);
        if (cached) return cached;
        const net = await fetch(request);
        cache.put(request.url, net.clone());
        return net;
      })
    );
    return;
  }

  // 3. Static Shell, Config JSONs, Poster & Animated WebP (Stale-While-Revalidate)
  event.respondWith(
    caches.open(CACHE_STATIC).then(async (cache) => {
      const cached = await cache.match(request);
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
