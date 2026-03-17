"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SpiralAnimation } from "@/components/ui/spiral-animation"

type Phase = "spiral" | "vaulted" | "hidden"

export function LandingIntroOverlay() {
  const [phase, setPhase] = useState<Phase>("spiral")
  const [titleRect, setTitleRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    const toVaulted = setTimeout(() => setPhase("vaulted"), 5200)
    const toHidden = setTimeout(() => setPhase("hidden"), 9500)
    return () => {
      clearTimeout(toVaulted)
      clearTimeout(toHidden)
    }
  }, [])

  useLayoutEffect(() => {
    if (typeof window === "undefined") return
    const updateRect = () => {
      const el = document.getElementById("hero-vaulted-title")
      if (!el) return
      const rect = el.getBoundingClientRect()
      setTitleRect(rect)
    }
    updateRect()
    window.addEventListener("resize", updateRect)
    return () => {
      window.removeEventListener("resize", updateRect)
    }
  }, [])

  return (
    <AnimatePresence>
      {phase !== "hidden" ? (
        <motion.div
          className="fixed inset-0 z-40 bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.8, ease: "easeInOut" }}
        >
          <div className="absolute inset-0">
            <SpiralAnimation />
          </div>

          <div className="relative flex h-full w-full items-center justify-center px-6">
            <div className="relative z-10 flex flex-col items-center text-center">
              <AnimatePresence mode="wait">
                {phase === "spiral" && (
                  <motion.span
                    key="presenting"
                    className="font-display text-[32px] tracking-[0.3em] text-white/80 uppercase"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    PRESENTING
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {phase === "vaulted" && titleRect && (
            <motion.div
              key="vaulted-intro"
              className="fixed z-50 flex items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{
                top: titleRect.top,
                left: titleRect.left,
                width: titleRect.width,
                height: titleRect.height,
              }}
            >
              <span className="font-display text-[56px] font-black tracking-[0.15em] text-white md:text-[72px]">
                VAULTED
              </span>
            </motion.div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

