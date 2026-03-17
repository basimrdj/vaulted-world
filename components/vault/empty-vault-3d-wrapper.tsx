"use client"

import dynamic from "next/dynamic"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useWebGLSupport } from "@/hooks/use-webgl-support"

const EmptyVault3D = dynamic(
  () => import("./empty-vault-3d").then((mod) => ({ default: mod.EmptyVault3D })),
  { ssr: false }
)

export function EmptyVault3DWrapper() {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const hasWebGL = useWebGLSupport()

  if (isMobile || prefersReducedMotion || !hasWebGL) {
    return (
      <div className="h-[120px] w-[120px] rounded-2xl border border-[#d7d7d7] bg-gradient-to-b from-white to-[#f2f2f2] shadow-[0_10px_30px_rgba(0,0,0,0.08)]" />
    )
  }

  return (
    <div className="h-[160px] w-[160px]">
      <EmptyVault3D />
    </div>
  )
}
