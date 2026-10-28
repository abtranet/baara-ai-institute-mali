import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// The host page is static HTML served from the site root, so the bundle is emitted into
// web/spline-island/ with stable entry names (island.js / island.css) that index.html can reference.
// The heavy Spline runtime stays in a lazily-loaded chunk (see splite.tsx).
export default defineConfig({
  plugins: [react()],
  base: "/web/spline-island/",
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    outDir: path.resolve(__dirname, "../web/spline-island"),
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: path.resolve(__dirname, "src/main.tsx"),
      output: {
        entryFileNames: "island.js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: (info) => (info.names?.[0]?.endsWith(".css") ? "island.css" : "assets/[name]-[hash][extname]"),
      },
    },
  },
})
