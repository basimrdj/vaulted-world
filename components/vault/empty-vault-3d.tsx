"use client"

import { Canvas } from "@react-three/fiber"
import { Edges, Float } from "@react-three/drei"
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing"

export function EmptyVault3D() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 3, 3]} intensity={0.7} />
      <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh>
          <boxGeometry args={[1.6, 1.6, 1.6]} />
          <meshStandardMaterial color="#f3f3f3" metalness={0.2} roughness={0.5} />
          <Edges color="#6B6B6B" />
        </mesh>
      </Float>
      <EffectComposer multisampling={4}>
        <Bloom luminanceThreshold={0.45} luminanceSmoothing={0.85} intensity={0.65} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.14} darkness={1.05} />
      </EffectComposer>
    </Canvas>
  )
}
