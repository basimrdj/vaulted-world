"use client"

import { type MutableRefObject, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox } from "@react-three/drei"
import * as THREE from "three"

interface VaultObjectProps {
  scrollProgress: number
  mouseX: number
  mouseY: number
}

function easeOutBack(t: number) {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function rangeProgress(value: number, start: number, end: number) {
  if (value <= start) return 0
  if (value >= end) return 1
  return (value - start) / (end - start)
}

function VaultBody() {
  const boltOffsets: Array<[number, number]> = [
    [-0.98, 1.18],
    [0.98, 1.18],
    [-0.98, -1.18],
    [0.98, -1.18],
  ]

  return (
    <group>
      <RoundedBox
        args={[2.6, 3.2, 0.12]}
        radius={0.06}
        smoothness={4}
        position={[0, 0, -0.85]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#0d0d0d"
          metalness={0.64}
          roughness={0.13}
          clearcoat={1}
          clearcoatRoughness={0.04}
          envMapIntensity={1.25}
        />
      </RoundedBox>

      <RoundedBox
        args={[0.12, 3.2, 1.7]}
        radius={0.04}
        smoothness={3}
        position={[-1.24, 0, 0]}
        castShadow
      >
        <meshPhysicalMaterial
          color="#0d0d0d"
          metalness={0.64}
          roughness={0.14}
          clearcoat={1}
          clearcoatRoughness={0.04}
          envMapIntensity={1}
        />
      </RoundedBox>

      <RoundedBox
        args={[0.12, 3.2, 1.7]}
        radius={0.04}
        smoothness={3}
        position={[1.24, 0, 0]}
        castShadow
      >
        <meshPhysicalMaterial
          color="#0d0d0d"
          metalness={0.64}
          roughness={0.14}
          clearcoat={1}
          clearcoatRoughness={0.04}
          envMapIntensity={1}
        />
      </RoundedBox>

      <RoundedBox
        args={[2.6, 0.12, 1.7]}
        radius={0.04}
        smoothness={3}
        position={[0, 1.56, 0]}
        castShadow
      >
        <meshPhysicalMaterial
          color="#0d0d0d"
          metalness={0.64}
          roughness={0.14}
          clearcoat={1}
          clearcoatRoughness={0.04}
          envMapIntensity={1}
        />
      </RoundedBox>

      <RoundedBox
        args={[2.6, 0.12, 1.7]}
        radius={0.04}
        smoothness={3}
        position={[0, -1.56, 0]}
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#0d0d0d"
          metalness={0.64}
          roughness={0.14}
          clearcoat={1}
          clearcoatRoughness={0.04}
          envMapIntensity={1}
        />
      </RoundedBox>

      <mesh position={[0, 0, 0.86]}>
        <torusGeometry args={[1.35, 0.03, 8, 64]} />
        <meshPhysicalMaterial color="#2a2a2a" metalness={1} roughness={0.05} clearcoat={1} />
      </mesh>

      <mesh position={[0.85, 0, 0.95]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 16]} />
        <meshPhysicalMaterial color="#3a3a3a" metalness={1} roughness={0.08} clearcoat={1} />
      </mesh>

      {[-0.88, -0.3, 0.3, 0.88].map((offset, index) => (
        <RoundedBox
          key={index}
          args={[0.05, 2.5, 0.04]}
          radius={0.012}
          smoothness={2}
          position={[offset, 0, 0.9]}
        >
          <meshStandardMaterial color="#1d1d1d" metalness={0.9} roughness={0.16} />
        </RoundedBox>
      ))}

      {boltOffsets.map(([x, y], index) => (
        <mesh key={index} position={[x, y, 0.92]}>
          <cylinderGeometry args={[0.045, 0.045, 0.02, 18]} />
          <meshPhysicalMaterial color="#4b4b4b" metalness={1} roughness={0.22} />
        </mesh>
      ))}
    </group>
  )
}

function VaultDoor({ openProgress }: { openProgress: number }) {
  const doorRef = useRef<THREE.Group>(null)
  const lockRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const door = doorRef.current
    if (door) {
      const targetRotation = -openProgress * Math.PI * 0.6
      door.rotation.y += (targetRotation - door.rotation.y) * 0.04
    }

    const lock = lockRef.current
    if (lock) {
      const pulse = Math.sin(clock.getElapsedTime() * 1.3) * 0.04
      lock.rotation.z += (openProgress * 0.45 + pulse - lock.rotation.z) * 0.05
    }
  })

  return (
    <group ref={doorRef} position={[1.18, 0, 0.85]}>
      <RoundedBox
        args={[2.36, 3, 0.08]}
        radius={0.04}
        smoothness={4}
        position={[-1.18, 0, 0.04]}
        castShadow
      >
        <meshPhysicalMaterial
          color="#111111"
          metalness={0.34}
          roughness={0.05}
          transmission={0.58}
          thickness={0.8}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={1.5}
          transparent
          opacity={0.92}
          side={THREE.DoubleSide}
        />
      </RoundedBox>

      <mesh position={[-1.18, 0, 0.088]}>
        <torusGeometry args={[0.5, 0.025, 8, 48]} />
        <meshStandardMaterial color="#3a3a3a" metalness={1} roughness={0.12} />
      </mesh>

      <group ref={lockRef} position={[-1.18, 0, 0.095]}>
        <mesh>
          <torusGeometry args={[0.28, 0.018, 8, 36]} />
          <meshStandardMaterial color="#a7c8ff" emissive="#a7c8ff" emissiveIntensity={0.65} toneMapped={false} />
        </mesh>
        {[0, 1, 2, 3].map((spoke) => (
          <RoundedBox
            key={spoke}
            args={[0.17, 0.03, 0.012]}
            radius={0.008}
            smoothness={2}
            rotation={[0, 0, (Math.PI / 2) * spoke]}
          >
            <meshStandardMaterial color="#d9e7ff" emissive="#a7c8ff" emissiveIntensity={0.3} toneMapped={false} />
          </RoundedBox>
        ))}
      </group>
    </group>
  )
}

function DataCore({ intensity }: { intensity: number }) {
  const coreRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)
  const pulseRingRef = useRef<THREE.Mesh>(null)
  const haloMaterialRef = useRef<THREE.MeshStandardMaterial>(null)
  const pulseMaterialRef = useRef<THREE.MeshStandardMaterial>(null)
  const glowRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    const core = coreRef.current
    const halo = haloRef.current
    const pulseRing = pulseRingRef.current
    const glow = glowRef.current
    const haloMaterial = haloMaterialRef.current
    const pulseMaterial = pulseMaterialRef.current
    if (!core || !halo || !pulseRing || !glow || !haloMaterial || !pulseMaterial) return

    const t = clock.getElapsedTime()
    const pulse = Math.sin(t * 1.5) * 0.12 + 0.88
    const scale = 0.25 + intensity * 0.25

    core.scale.setScalar(scale * pulse)
    core.rotation.y += 0.011
    halo.rotation.z += 0.014
    pulseRing.rotation.y -= 0.01

    const haloScale = 0.62 + intensity * 0.28 + Math.sin(t * 2.1) * 0.025
    halo.scale.setScalar(haloScale)
    pulseRing.scale.setScalar(0.88 + Math.sin(t * 1.25) * 0.04)

    haloMaterial.emissiveIntensity = 0.45 + intensity * 1.2
    pulseMaterial.emissiveIntensity = 0.2 + intensity * 0.65
    glow.intensity = intensity * 4 * pulse
  })

  return (
    <group position={[0, 0, -0.2]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.3, 4]} />
        <meshStandardMaterial
          color="#7cb2ff"
          emissive="#7cb2ff"
          emissiveIntensity={4}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={haloRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.48, 0.022, 10, 68]} />
        <meshStandardMaterial
          ref={haloMaterialRef}
          color="#c7dcff"
          emissive="#98beff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.75}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={pulseRingRef} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[0.72, 0.008, 8, 64]} />
        <meshStandardMaterial
          ref={pulseMaterialRef}
          color="#9ec5ff"
          emissive="#9ec5ff"
          emissiveIntensity={0.2}
          transparent
          opacity={0.5}
          toneMapped={false}
        />
      </mesh>

      <pointLight ref={glowRef} color="#7cb2ff" intensity={0} distance={6} decay={2} />
    </group>
  )
}

interface Card3DProps {
  index: number
  burstProgress: number
  arrangeProgress: number
  vaultXRef: MutableRefObject<number>
  totalCards: number
}

const CARD_DATA = [
  { color: "#141414", accent: "#9ec5ff", edge: "#e6f0ff" },
  { color: "#141414", accent: "#c6d8ff", edge: "#edf3ff" },
  { color: "#141414", accent: "#b6e0ff", edge: "#e8f6ff" },
  { color: "#141414", accent: "#d4d8ff", edge: "#f0f1ff" },
  { color: "#141414", accent: "#bcd5ff", edge: "#e8f0ff" },
  { color: "#141414", accent: "#dbe4ff", edge: "#f5f7ff" },
]

function Card3D({
  index,
  burstProgress,
  arrangeProgress,
  vaultXRef,
  totalCards,
}: Card3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const signalMaterialRef = useRef<THREE.MeshStandardMaterial>(null)
  const accentMaterialRef = useRef<THREE.MeshStandardMaterial>(null)
  const currentPos = useRef(new THREE.Vector3(0, 0, 0))
  const currentRot = useRef(new THREE.Euler(0, 0, 0))

  const burstTarget = useMemo(() => {
    const angle = (index / totalCards) * Math.PI * 2 + Math.PI * 0.15
    const radius = 2 + (index % 3) * 0.62
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * 0.5,
      2 + index * 0.3
    )
  }, [index, totalCards])

  const arrangedTarget = useMemo(() => {
    const cols = 3
    const row = Math.floor(index / cols)
    const col = index % cols
    return new THREE.Vector3((col - 1) * 2 + 1.92, (0.5 - row) * 2.58, 3)
  }, [index])

  const card = CARD_DATA[index % CARD_DATA.length]
  const tempOrigin = useRef(new THREE.Vector3())
  const tempTarget = useRef(new THREE.Vector3())

  useFrame(({ clock }) => {
    const group = groupRef.current
    const signalMaterial = signalMaterialRef.current
    const accentMaterial = accentMaterialRef.current
    if (!group || !signalMaterial || !accentMaterial) return

    const origin = tempOrigin.current.set(vaultXRef.current, 0, 0.5)
    const targetPos = tempTarget.current
    let targetRotX = 0
    let targetRotY = 0
    let targetRotZ = 0
    let targetScale = 1

    if (burstProgress <= 0) {
      targetPos.copy(origin)
      targetScale = 0
    } else if (arrangeProgress <= 0) {
      const eased = easeOutBack(Math.min(1, burstProgress))
      targetPos.copy(origin).lerp(burstTarget, eased)
      targetRotX = burstProgress * (index % 2 === 0 ? 0.4 : -0.4)
      targetRotY = burstProgress * Math.PI * 0.2 * (index % 2 === 0 ? 1 : -1)
      targetRotZ = burstProgress * (index % 3 === 0 ? 0.15 : -0.1)
      targetScale = Math.min(1, burstProgress * 2)
    } else {
      const eased = easeOutCubic(arrangeProgress)
      targetPos.copy(burstTarget).lerp(arrangedTarget, eased)
      targetRotX = (1 - eased) * 0.3 * (index % 2 === 0 ? 1 : -1)
      targetRotY = (1 - eased) * 0.2
      targetScale = 1
    }

    const arrangedFloat =
      Math.sin(clock.getElapsedTime() * 1.2 + index * 0.6) * 0.045 * arrangeProgress
    targetPos.y += arrangedFloat
    targetRotY += Math.sin(clock.getElapsedTime() * 0.95 + index * 0.75) * 0.05 * arrangeProgress

    currentPos.current.lerp(targetPos, 0.07)
    currentRot.current.x += (targetRotX - currentRot.current.x) * 0.05
    currentRot.current.y += (targetRotY - currentRot.current.y) * 0.05
    currentRot.current.z += (targetRotZ - currentRot.current.z) * 0.05

    group.position.copy(currentPos.current)
    group.rotation.copy(currentRot.current)

    const nextScale = group.scale.x + (targetScale - group.scale.x) * 0.08
    group.scale.setScalar(nextScale)

    const pulse = Math.sin(clock.getElapsedTime() * 2 + index * 0.8) * 0.5 + 0.5
    accentMaterial.emissiveIntensity = 0.62 + burstProgress * 0.52 + pulse * 0.22
    signalMaterial.emissiveIntensity = 0.34 + burstProgress * 0.5 + pulse * 0.25
  })

  return (
    <group ref={groupRef} scale={0}>
      <RoundedBox args={[1.4, 1.9, 0.05]} radius={0.06} smoothness={3} castShadow>
        <meshPhysicalMaterial
          color={card.color}
          metalness={0.2}
          roughness={0.09}
          clearcoat={1}
          clearcoatRoughness={0.03}
          envMapIntensity={0.92}
          transparent
          opacity={0.95}
        />
      </RoundedBox>

      <RoundedBox
        args={[1.18, 1.68, 0.01]}
        radius={0.04}
        smoothness={2}
        position={[0, 0, 0.031]}
      >
        <meshStandardMaterial color="#1d1d1d" metalness={0.45} roughness={0.28} />
      </RoundedBox>

      <RoundedBox
        args={[1.2, 0.06, 0.02]}
        radius={0.02}
        smoothness={2}
        position={[0, 0.7, 0.035]}
      >
        <meshStandardMaterial
          ref={accentMaterialRef}
          color={card.accent}
          emissive={card.accent}
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </RoundedBox>

      {[0.2, -0.02, -0.24].map((y, lineIndex) => (
        <RoundedBox
          key={lineIndex}
          args={[lineIndex === 0 ? 0.72 : 0.88, 0.04, 0.01]}
          radius={0.012}
          smoothness={2}
          position={[0, y, 0.036]}
        >
          <meshStandardMaterial color={lineIndex === 0 ? card.edge : "#6f6f6f"} />
        </RoundedBox>
      ))}

      <RoundedBox
        args={[0.42, 0.12, 0.01]}
        radius={0.016}
        smoothness={2}
        position={[-0.36, -0.68, 0.035]}
      >
        <meshStandardMaterial color={card.edge} emissive={card.accent} emissiveIntensity={0.2} toneMapped={false} />
      </RoundedBox>

      <mesh position={[0.44, -0.68, 0.04]}>
        <circleGeometry args={[0.085, 22]} />
        <meshStandardMaterial
          ref={signalMaterialRef}
          color={card.accent}
          emissive={card.accent}
          emissiveIntensity={0.65}
          transparent
          opacity={0.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

export function VaultObject({ scrollProgress, mouseX, mouseY }: VaultObjectProps) {
  const groupRef = useRef<THREE.Group>(null)
  const currentRotX = useRef(0)
  const currentRotY = useRef(0)
  const currentPosX = useRef(0)
  const currentPosY = useRef(0)
  const currentPosZ = useRef(0)

  const unlockProgress = useMemo(
    () => rangeProgress(scrollProgress, 0.2, 0.5),
    [scrollProgress]
  )

  const doorCloseProgress = useMemo(
    () => rangeProgress(scrollProgress, 0.5, 0.65),
    [scrollProgress]
  )

  const doorOpen = useMemo(() => {
    if (scrollProgress < 0.2) return 0
    if (scrollProgress <= 0.5) return unlockProgress
    if (scrollProgress <= 0.65) return 1 - doorCloseProgress
    return 0
  }, [doorCloseProgress, scrollProgress, unlockProgress])

  const coreIntensity = useMemo(
    () => (0.12 + unlockProgress * 0.88) * (1 - doorCloseProgress),
    [doorCloseProgress, unlockProgress]
  )

  const cardBurstProgress = useMemo(
    () => rangeProgress(scrollProgress, 0.38, 0.55),
    [scrollProgress]
  )

  const cardArrangeProgress = useMemo(
    () => rangeProgress(scrollProgress, 0.65, 0.85),
    [scrollProgress]
  )

  const targetX = useMemo(() => {
    if (scrollProgress < 0.55) return 0
    if (scrollProgress > 0.72) return -3.2
    return -rangeProgress(scrollProgress, 0.55, 0.72) * 3.2
  }, [scrollProgress])

  const targetY = useMemo(() => {
    if (scrollProgress < 0.32) return 0
    if (scrollProgress < 0.55) return rangeProgress(scrollProgress, 0.32, 0.55) * 0.12
    if (scrollProgress < 0.72) return (1 - rangeProgress(scrollProgress, 0.55, 0.72)) * 0.12
    return 0
  }, [scrollProgress])

  const targetZ = useMemo(() => {
    if (scrollProgress < 0.2) return 0
    if (scrollProgress < 0.4) return -rangeProgress(scrollProgress, 0.2, 0.4) * 1.2
    if (scrollProgress < 0.55) return -1.2
    if (scrollProgress < 0.72) return -1.2 + rangeProgress(scrollProgress, 0.55, 0.72) * 1.2
    return 0
  }, [scrollProgress])

  const targetScale = useMemo(() => {
    if (scrollProgress < 0.55) return 1
    if (scrollProgress > 0.78) return 0.68
    return 1 - rangeProgress(scrollProgress, 0.55, 0.78) * 0.32
  }, [scrollProgress])

  useFrame(({ clock }) => {
    const group = groupRef.current
    if (!group) return

    const parallaxWeight = Math.max(0, 1 - scrollProgress * 3)
    const parallaxStrength = 0.12 * (0.7 + unlockProgress * 0.3)
    const targetRotY = mouseX * parallaxStrength * parallaxWeight
    const targetRotX =
      -mouseY * parallaxStrength * parallaxWeight +
      Math.sin(clock.getElapsedTime() * 0.45) * 0.01 * (1 - cardArrangeProgress)

    currentRotX.current += (targetRotX - currentRotX.current) * 0.03
    currentRotY.current += (targetRotY - currentRotY.current) * 0.03

    group.rotation.x = currentRotX.current
    group.rotation.y = currentRotY.current

    currentPosX.current += (targetX - currentPosX.current) * 0.04
    currentPosZ.current += (targetZ - currentPosZ.current) * 0.04

    const ambientFloat =
      Math.sin(clock.getElapsedTime() * 1.1) * 0.05 * Math.max(0, 1 - scrollProgress * 1.8)
    currentPosY.current += (targetY + ambientFloat - currentPosY.current) * 0.04

    group.position.set(currentPosX.current, currentPosY.current, currentPosZ.current)

    const nextScale = group.scale.x + (targetScale - group.scale.x) * 0.05
    group.scale.setScalar(nextScale)
  })

  return (
    <>
      <group ref={groupRef}>
        <VaultBody />
        <VaultDoor openProgress={doorOpen} />
        <DataCore intensity={coreIntensity} />
      </group>

      {CARD_DATA.map((_, i) => (
        <Card3D
          key={i}
          index={i}
          burstProgress={cardBurstProgress}
          arrangeProgress={cardArrangeProgress}
          vaultXRef={currentPosX}
          totalCards={CARD_DATA.length}
        />
      ))}
    </>
  )
}
