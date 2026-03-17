"use client"

import { useMemo } from "react"
import * as THREE from "three"
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"

interface VaultPostprocessingProps {
  scrollProgress: number
}

function rangeProgress(value: number, start: number, end: number) {
  if (value <= start) return 0
  if (value >= end) return 1
  return (value - start) / (end - start)
}

export function VaultPostprocessing({ scrollProgress }: VaultPostprocessingProps) {
  const unlockProgress = useMemo(
    () => rangeProgress(scrollProgress, 0.2, 0.5),
    [scrollProgress]
  )
  const burstProgress = useMemo(
    () => rangeProgress(scrollProgress, 0.38, 0.55),
    [scrollProgress]
  )
  const arrangeProgress = useMemo(
    () => rangeProgress(scrollProgress, 0.65, 0.85),
    [scrollProgress]
  )

  const bloomIntensity = useMemo(
    () => 0.52 + unlockProgress * 0.28 + burstProgress * 0.24 - arrangeProgress * 0.12,
    [arrangeProgress, burstProgress, unlockProgress]
  )

  const chromaticOffset = useMemo(() => {
    const amount = 0.0001 + burstProgress * 0.00028 + unlockProgress * 0.00008
    return new THREE.Vector2(amount, amount * 0.6)
  }, [burstProgress, unlockProgress])

  const noiseOpacity = useMemo(
    () => 0.028 + unlockProgress * 0.018 + burstProgress * 0.02 - arrangeProgress * 0.008,
    [arrangeProgress, burstProgress, unlockProgress]
  )

  const vignetteDarkness = useMemo(
    () => 0.66 + burstProgress * 0.11 - arrangeProgress * 0.08,
    [arrangeProgress, burstProgress]
  )

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.86}
        luminanceSmoothing={0.36}
        intensity={bloomIntensity}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={chromaticOffset}
        radialModulation
        modulationOffset={0.24}
      />
      <Noise blendFunction={BlendFunction.OVERLAY} opacity={noiseOpacity} />
      <Vignette
        offset={0.29}
        darkness={vignetteDarkness}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}
