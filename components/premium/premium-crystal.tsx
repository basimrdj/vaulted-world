"use client"

import { Canvas } from "@react-three/fiber"
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
} from "@react-three/drei"
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"

function CrystalMesh() {
  return (
    <Float speed={1.4} rotationIntensity={0.45} floatIntensity={0.55}>
      <mesh>
        <octahedronGeometry args={[1.15, 0]} />
        <MeshTransmissionMaterial
          transmission={1}
          roughness={0.08}
          thickness={0.65}
          color="#ffffff"
          backside
        />
      </mesh>
    </Float>
  )
}

export function PremiumCrystal() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 46 }}>
      <ambientLight intensity={0.24} />
      <directionalLight position={[4, 4, 3]} intensity={0.75} />
      <CrystalMesh />
      <Environment preset="studio" />
      <EffectComposer multisampling={8} enableNormalPass={false}>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.45}
          mipmapBlur
        />
        <Noise
          opacity={0.04}
          premultiply
          blendFunction={BlendFunction.ADD}
        />
        <Vignette eskil={false} offset={0.08} darkness={1.15} />
        <ChromaticAberration offset={[0.001, 0.001]} />
        <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={2.1} />
      </EffectComposer>
    </Canvas>
  )
}
