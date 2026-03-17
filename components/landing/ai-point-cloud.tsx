"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useWebGLSupport } from "@/hooks/use-webgl-support"

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453123
  return value - Math.floor(value)
}

function PointsCloud() {
  const pointsRef = useRef<THREE.Points>(null)

  const { base, target } = useMemo(() => {
    const count = 1400
    const baseArray = new Float32Array(count * 3)
    const targetArray = new Float32Array(count * 3)

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3

      // Chaotic cloud positions
      const theta = pseudoRandom(i * 0.73 + 1.11) * Math.PI * 2
      const radius = 0.2 + pseudoRandom(i * 1.37 + 0.41) * 1.4
      baseArray[i3] = Math.cos(theta) * radius
      baseArray[i3 + 1] = (pseudoRandom(i * 2.03 + 2.27) - 0.5) * 1.8
      baseArray[i3 + 2] = (pseudoRandom(i * 2.91 + 3.19) - 0.5) * 1.4

      // Structured terminal-like slab target
      const x = (i % 35) / 35
      const y = Math.floor(i / 35) / 40
      targetArray[i3] = (x - 0.5) * 2.1
      targetArray[i3 + 1] = (0.5 - y) * 1.5
      targetArray[i3 + 2] = (pseudoRandom(i * 3.17 + 0.83) - 0.5) * 0.06
    }

    return { base: baseArray, target: targetArray }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return

    const progress = (Math.sin(state.clock.elapsedTime * 0.8) + 1) * 0.5
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = THREE.MathUtils.lerp(base[i], target[i], progress)
      positions[i + 1] = THREE.MathUtils.lerp(base[i + 1], target[i + 1], progress)
      positions[i + 2] = THREE.MathUtils.lerp(base[i + 2], target[i + 2], progress)
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.06
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[base, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  )
}

export function AiPointCloud() {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const hasWebGL = useWebGLSupport()

  if (isMobile || prefersReducedMotion || !hasWebGL) return null

  return (
    <div className="pointer-events-none absolute inset-0 opacity-70">
      <Canvas camera={{ position: [0, 0, 2.7], fov: 48 }}>
        <ambientLight intensity={0.4} />
        <PointsCloud />
      </Canvas>
    </div>
  )
}
