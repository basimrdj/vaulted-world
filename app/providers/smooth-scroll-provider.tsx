"use client"

import { ReactLenis } from "lenis/react"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setPrefersReducedMotion(media.matches)
    onChange()
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  if (prefersReducedMotion) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.06,
        duration: 1.5,
        smoothWheel: true,
        orientation: "vertical",
        gestureOrientation: "vertical",
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  )
}
