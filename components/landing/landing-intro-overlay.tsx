"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SpiralAnimation } from "@/components/ui/spiral-animation"

type Phase = "presenting" | "vaulted" | "fading" | "hidden"

export function LandingIntroOverlay() {
  const [phase, setPhase] = useState<Phase>("presenting")
  const [enabled, setEnabled] = useState(true)
  const [heroStyle, setHeroStyle] = useState<{
    top: number; left: number; width: number; height: number
    fontSize: string; fontFamily: string; fontWeight: string
    letterSpacing: string; lineHeight: string
  } | null>(null)

  // Measure hero VAULTED exact position + computed styles
  useEffect(() => {
    const measure = () => {
      const el = document.getElementById("hero-vaulted-title")
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cs = window.getComputedStyle(el)
      setHeroStyle({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        fontSize: cs.fontSize,
        fontFamily: cs.fontFamily,
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing,
        lineHeight: cs.lineHeight,
      })
    }
    measure()
    requestAnimationFrame(measure)
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setEnabled(!media.matches)
    onChange()
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const t1 = setTimeout(() => setPhase("vaulted"), 1200)
    const t2 = setTimeout(() => setPhase("fading"), 2100)
    const t3 = setTimeout(() => setPhase("hidden"), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [enabled])

  // Keep hero VAULTED hidden until the overlay starts fading,
  // then reveal it so it's underneath as the overlay fades out
  useEffect(() => {
    const el = document.getElementById("hero-vaulted-title")
    if (!el) return
    if (phase === "presenting" || phase === "vaulted") {
      el.style.visibility = "hidden"
    } else {
      el.style.visibility = "visible"
    }
    return () => { el.style.visibility = "visible" }
  }, [phase])

  if (!enabled || phase === "hidden") return null

  return (
    <AnimatePresence>
      <motion.div
        key="intro-overlay"
        className="pointer-events-none fixed inset-0 z-40"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "fading" ? 0 : 1 }}
        transition={{
          duration: phase === "fading" ? 2.8 : 0,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        onAnimationComplete={() => {
          if (phase === "fading") setPhase("hidden")
        }}
      >
        <div className="absolute inset-0 bg-black" />

        <motion.div
          className="absolute inset-0 z-0"
          animate={{ opacity: phase === "presenting" ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <SpiralAnimation />
        </motion.div>

        {phase === "presenting" && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <motion.h1
              className="font-display text-[28px] tracking-[0.35em] text-white/70 uppercase sm:text-[32px]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            >
              PRESENTING
            </motion.h1>
          </div>
        )}

        {(phase === "vaulted" || phase === "fading") && heroStyle && (
          <motion.span
            key="vaulted-text"
            className="absolute z-20 m-0 p-0 block text-white"
            style={{
              top: heroStyle.top,
              left: heroStyle.left,
              width: heroStyle.width,
              height: heroStyle.height,
              fontSize: heroStyle.fontSize,
              fontFamily: heroStyle.fontFamily,
              fontWeight: heroStyle.fontWeight,
              letterSpacing: heroStyle.letterSpacing,
              lineHeight: heroStyle.lineHeight,
              textAlign: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
          >
            VAULTED
          </motion.span>
        )}

        {(phase === "vaulted" || phase === "fading") && !heroStyle && (
          <motion.span
            className="absolute inset-0 z-20 flex items-center justify-center font-panchang text-[56px] font-bold tracking-[0.2em] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            VAULTED
          </motion.span>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
