import type { Config } from "tailwindcss"

// The island lives inside an existing Bootstrap-style page, so:
//  - `important` scopes every utility under #spline-island-root (no leaking into / out of the host page)
//  - `preflight` is off so Tailwind's global reset can't restyle the rest of the site
//    (a scoped mini-reset is in src/index.css instead)
const config: Config = {
  darkMode: ["class"],
  important: "#spline-island-root",
  corePlugins: { preflight: false },
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
    },
  },
  plugins: [],
}
export default config
