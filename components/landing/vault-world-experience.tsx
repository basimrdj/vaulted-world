"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useHydrated } from "@/hooks/use-hydrated"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useWebGLSupport } from "@/hooks/use-webgl-support"
import { HeroDomOverlay } from "@/components/landing/hero-dom-overlay"
import { Vault3D } from "@/components/landing/vault-3d"
import { VaultFallbackVisual } from "@/components/landing/vault-fallback-visual"

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function VaultWorldExperience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const hydrated = useHydrated()
  const isMobile = useMediaQuery("(max-width: 767px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const hasWebGL = useWebGLSupport()

  const updateProgress = useCallback(() => {
    const section = sectionRef.current
    if (!section) return

    const scrollableDistance = section.offsetHeight - window.innerHeight
    if (scrollableDistance <= 0) {
      setScrollProgress(0)
      return
    }

    const sectionStart = section.offsetTop
    const travelled = window.scrollY - sectionStart
    const progress = clamp(travelled / scrollableDistance, 0, 1)
    setScrollProgress(progress)
  }, [])

  const handlePointerMove = useCallback((event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1
    const y = (event.clientY / window.innerHeight) * 2 - 1
    setMouse({ x, y })
  }, [])

  useEffect(() => {
    if (!hydrated || isMobile || prefersReducedMotion) return

    let frame: number | null = null
    const onViewportChange = () => {
      if (frame !== null) return
      frame = window.requestAnimationFrame(() => {
        updateProgress()
        frame = null
      })
    }

    onViewportChange()
    window.addEventListener("scroll", onViewportChange, { passive: true })
    window.addEventListener("resize", onViewportChange)
    window.addEventListener("mousemove", handlePointerMove)

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onViewportChange)
      window.removeEventListener("resize", onViewportChange)
      window.removeEventListener("mousemove", handlePointerMove)
    }
  }, [handlePointerMove, hydrated, isMobile, prefersReducedMotion, updateProgress])

  if (!hydrated) {
    return <section className="relative h-[560vh] bg-[#050505]" aria-hidden />
  }

  if (isMobile || prefersReducedMotion) {
    return (
      <section className="relative overflow-hidden bg-[#050505] px-6 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0)_60%)]" />
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] font-medium tracking-[0.28em] text-white/45 uppercase">
            Vaulted World
          </p>
          <h2 className="mt-5 font-display text-4xl font-semibold text-white md:text-6xl">
            Unlock your digital vault.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[14px] leading-relaxed text-white/65">
            Your screenshots become a private intelligence layer for tracking, timing,
            and discovery.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[560vh] bg-[#050505]"
      aria-label="Vaulted world experience"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0">
          {hasWebGL ? (
            <Vault3D
              scrollProgress={scrollProgress}
              mouseX={mouse.x}
              mouseY={mouse.y}
            />
          ) : (
            <VaultFallbackVisual />
          )}
        </div>
        <HeroDomOverlay scrollProgress={scrollProgress} />
      </div>
    </section>
  )
}
