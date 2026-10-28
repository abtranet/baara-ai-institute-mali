'use client'

import { useState, useCallback } from "react"
import { SplineScene } from "./splite"
import type { Application } from "@splinetool/runtime"

export function HeroSplineRobot() {
  const [loaded, setLoaded] = useState(false)

  const handleLoad = useCallback((_app: Application) => {
    setLoaded(true)
    const container = document.getElementById("heroRobotContainer")
    if (container) {
      container.setAttribute("data-spline-ready", "true")
    }
    window.dispatchEvent(new CustomEvent("baara:hero-spline-ready"))
  }, [])

  return (
    <div
      className={`baara-hero-spline-inner w-full h-full transition-opacity duration-700 ${
        loaded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{ width: "100%", height: "100%", minHeight: "500px", position: "relative" }}
    >
      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full"
        onLoad={handleLoad}
      />
    </div>
  )
}
