import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { SplineSceneBasic } from "@/components/ui/demo"
import { HeroSplineRobot } from "@/components/ui/hero-spline-robot"

// 1. Projects Section 3D Scene Island
const mountProjects = document.getElementById("spline-island-root")
if (mountProjects) {
  let started = false
  const startProjects = () => {
    if (started) return
    started = true
    createRoot(mountProjects).render(
      <StrictMode>
        <SplineSceneBasic />
      </StrictMode>
    )
  }

  // Heavy 3D scene: only mount once approaching viewport
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          startProjects()
        }
      },
      { rootMargin: "400px 0px" }
    )
    io.observe(mountProjects)
  } else {
    startProjects()
  }
}

// 2. Hero Section 3D Robot Island (Auto-mounts 3D version by default)
const mountHero = document.getElementById("hero-spline-robot-root")
if (mountHero) {
  let heroStarted = false
  const startHeroSpline = () => {
    if (heroStarted) return
    heroStarted = true
    mountHero.style.display = "block"
    createRoot(mountHero).render(
      <StrictMode>
        <HeroSplineRobot />
      </StrictMode>
    )
  }

  // Load 3D Spline version automatically
  startHeroSpline()

  // Explicit enable hook fallback
  window.addEventListener("baara:enable-hero-3d", () => {
    startHeroSpline()
  })
}
