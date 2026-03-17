"use client"

import dynamic from "next/dynamic"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useWebGLSupport } from "@/hooks/use-webgl-support"

const PremiumCrystal = dynamic(
  () =>
    import("./premium-crystal").then((mod) => ({
      default: mod.PremiumCrystal,
    })),
  { ssr: false }
)

export function PremiumCrystalWrapper() {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const isMobile = useMediaQuery("(max-width: 767px)")
  const hasWebGL = useWebGLSupport()

  if (prefersReducedMotion || isMobile || !hasWebGL) {
    return (
      <div className="mx-auto h-[180px] w-[180px] rounded-3xl border border-white/20 bg-white/[0.06] shadow-[0_12px_28px_rgba(255,255,255,0.08)]" />
    )
  }

  return (
    <div className="pointer-events-none mx-auto h-[260px] w-[260px] rounded-3xl border border-white/15 bg-white/[0.04]">
      <PremiumCrystal />
    </div>
  )
}
