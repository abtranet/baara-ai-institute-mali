'use client'

import { Suspense, lazy } from 'react'
import type { Application } from '@splinetool/runtime'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  style?: React.CSSProperties
  onLoad?: (e: Application) => void
}

export function SplineScene({ scene, className, style, onLoad }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        style={style}
        onLoad={onLoad}
      />
    </Suspense>
  )
}

