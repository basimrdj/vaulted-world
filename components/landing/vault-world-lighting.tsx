"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { ContactShadows } from "@react-three/drei"
import * as THREE from "three"

interface VaultLightingProps {
  scrollProgress: number
}

function rangeProgress(value: number, start: number, end: number) {
  if (value <= start) return 0
  if (value >= end) return 1
  return (value - start) / (end - start)
}

export function VaultLighting({ scrollProgress }: VaultLightingProps) {
  const keyLightRef = useRef<THREE.SpotLight>(null)
  const rimLightRef = useRef<THREE.PointLight>(null)
  const accentLightRef = useRef<THREE.PointLight>(null)
  const fillLightRef = useRef<THREE.PointLight>(null)

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

  const targetKeyIntensity = useMemo(
    () => 1.8 + unlockProgress * 0.55 + burstProgress * 0.22 - arrangeProgress * 0.3,
    [arrangeProgress, burstProgress, unlockProgress]
  )

  const targetRimIntensity = useMemo(
    () => 0.5 + unlockProgress * 1.1 + burstProgress * 0.55 - arrangeProgress * 0.2,
    [arrangeProgress, burstProgress, unlockProgress]
  )

  const targetAccentIntensity = useMemo(
    () => 0.16 + unlockProgress * 0.9 + burstProgress * 0.95 - arrangeProgress * 0.35,
    [arrangeProgress, burstProgress, unlockProgress]
  )

  const targetFillIntensity = useMemo(
    () => 0.26 + burstProgress * 0.2 + arrangeProgress * 0.14,
    [arrangeProgress, burstProgress]
  )

  useFrame(({ clock }) => {
    const pulse = Math.sin(clock.getElapsedTime() * 1.8) * 0.08 + 0.92

    const key = keyLightRef.current
    if (key) {
      key.intensity += (targetKeyIntensity - key.intensity) * 0.06
    }

    const rim = rimLightRef.current
    if (rim) {
      rim.intensity += (targetRimIntensity * pulse - rim.intensity) * 0.06
    }

    const accent = accentLightRef.current
    if (accent) {
      accent.intensity += (targetAccentIntensity * (pulse + 0.06) - accent.intensity) * 0.08
      accent.position.x = Math.sin(clock.getElapsedTime() * 0.42) * 0.22
    }

    const fill = fillLightRef.current
    if (fill) {
      fill.intensity += (targetFillIntensity - fill.intensity) * 0.05
    }
  })

  return (
    <>
      <spotLight
        ref={keyLightRef}
        position={[3, 5, 5]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.8}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      <pointLight
        ref={rimLightRef}
        position={[-3, 2, -3]}
        intensity={0.5}
        color="#9ec5ff"
        decay={2}
        distance={15}
      />

      <pointLight
        ref={accentLightRef}
        position={[0, 0.15, 1.1]}
        intensity={0.16}
        color="#cbe0ff"
        decay={2}
        distance={5}
      />

      <pointLight
        ref={fillLightRef}
        position={[0, -3, 3]}
        intensity={0.26}
        color="#ffffff"
        decay={2}
        distance={10}
      />

      <ambientLight intensity={0.08 + burstProgress * 0.03} color="#ffffff" />
      <hemisphereLight
        intensity={0.1 + unlockProgress * 0.08}
        color="#f7f7f7"
        groundColor="#080808"
      />

      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.35 + unlockProgress * 0.18 - arrangeProgress * 0.08}
        scale={8}
        blur={2.4 + burstProgress * 0.55}
        far={4}
        color="#000000"
      />
    </>
  )
}
