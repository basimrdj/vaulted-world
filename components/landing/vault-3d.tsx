"use client"

import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import { VaultLighting } from "./vault-world-lighting"
import { VaultPostprocessing } from "./vault-world-postprocessing"
import { VaultObject } from "./vault-world"

interface CameraRigProps {
  scrollProgress: number
  mouseX: number
  mouseY: number
}

function CameraRig({ scrollProgress, mouseX, mouseY }: CameraRigProps) {
  const targetPos = useRef(new THREE.Vector3(0, 0, 6))
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(({ camera }) => {
    let camX = 0
    let camY = 0.06
    let camZ = 6.2

    if (scrollProgress < 0.2) {
      camZ = 6.2 - scrollProgress * 2.6
    } else if (scrollProgress < 0.55) {
      camZ = 5.68
      camY = -0.02
    } else if (scrollProgress < 0.72) {
      const t = (scrollProgress - 0.55) / 0.17
      camX = t * 1.2
      camY = -0.04 + t * 0.12
      camZ = 5.8 + t * 0.5
    } else {
      camX = 1.2
      camY = 0.08
      camZ = 6.3
    }

    const parallaxWeight = Math.max(0, 1 - scrollProgress * 3)
    camX += mouseX * 0.34 * parallaxWeight
    camY += mouseY * 0.2 * parallaxWeight

    targetPos.current.set(camX, camY, camZ)

    if (scrollProgress < 0.55) {
      lookTarget.current.set(0, 0, -0.15)
    } else {
      lookTarget.current.set(-1.15, 0, 0.4)
    }

    camera.position.lerp(targetPos.current, 0.05)
    camera.lookAt(lookTarget.current)
  })

  return null
}

interface Vault3DProps {
  scrollProgress: number
  mouseX: number
  mouseY: number
}

export function Vault3D({ scrollProgress, mouseX, mouseY }: Vault3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 36 }}
      dpr={[1, 2]}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      fallback={<div className="absolute inset-0 bg-transparent" />}
    >
      <fog attach="fog" args={["#030303", 4.6, 14]} />
      <Environment preset="warehouse" />

      <CameraRig scrollProgress={scrollProgress} mouseX={mouseX} mouseY={mouseY} />
      <VaultLighting scrollProgress={scrollProgress} />
      <VaultObject scrollProgress={scrollProgress} mouseX={mouseX} mouseY={mouseY} />
      <VaultPostprocessing scrollProgress={scrollProgress} />
    </Canvas>
  )
}
