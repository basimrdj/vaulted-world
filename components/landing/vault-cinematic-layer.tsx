"use client"

import { useMediaQuery } from "@/hooks/use-media-query"
import { useHydrated } from "@/hooks/use-hydrated"
import { Vault3DWrapper } from "@/components/landing/vault-3d-wrapper"
import { useWebGLSupport } from "@/hooks/use-webgl-support"
import { VaultFallbackVisual } from "@/components/landing/vault-fallback-visual"

export function VaultCinematicLayer() {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const hydrated = useHydrated()
  const hasWebGL = useWebGLSupport()

  if (!hydrated || isMobile || prefersReducedMotion) return null

  if (!hasWebGL) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0">
        <VaultFallbackVisual />
      </div>
    )
  }

  return <Vault3DWrapper />
}
