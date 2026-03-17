import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

interface VaultObjectProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
}

/* ─── Vault Body — dark glass translucent shell ─── */
function VaultBody() {
  return (
    <group>
      {/* Back wall */}
      <RoundedBox args={[2.6, 3.2, 0.12]} radius={0.06} smoothness={4} position={[0, 0, -0.85]} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#0d0d0d"
          metalness={0.6}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
          reflectivity={1}
          envMapIntensity={1.2}
        />
      </RoundedBox>
      {/* Left wall */}
      <RoundedBox args={[0.12, 3.2, 1.7]} radius={0.04} smoothness={3} position={[-1.24, 0, 0]} castShadow>
        <meshPhysicalMaterial
          color="#0d0d0d"
          metalness={0.6}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.0}
        />
      </RoundedBox>
      {/* Right wall */}
      <RoundedBox args={[0.12, 3.2, 1.7]} radius={0.04} smoothness={3} position={[1.24, 0, 0]} castShadow>
        <meshPhysicalMaterial
          color="#0d0d0d"
          metalness={0.6}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.0}
        />
      </RoundedBox>
      {/* Top */}
      <RoundedBox args={[2.6, 0.12, 1.7]} radius={0.04} smoothness={3} position={[0, 1.56, 0]} castShadow>
        <meshPhysicalMaterial color="#0d0d0d" metalness={0.6} roughness={0.15} clearcoat={1} envMapIntensity={1.0} />
      </RoundedBox>
      {/* Bottom */}
      <RoundedBox args={[2.6, 0.12, 1.7]} radius={0.04} smoothness={3} position={[0, -1.56, 0]} receiveShadow>
        <meshPhysicalMaterial color="#0d0d0d" metalness={0.6} roughness={0.15} clearcoat={1} envMapIntensity={1.0} />
      </RoundedBox>
      {/* Door frame ring — subtle chrome edge */}
      <mesh position={[0, 0, 0.86]}>
        <torusGeometry args={[1.35, 0.03, 8, 64]} />
        <meshPhysicalMaterial color="#2a2a2a" metalness={1} roughness={0.05} clearcoat={1} />
      </mesh>
      {/* Handle bar */}
      <mesh position={[0.85, 0, 0.95]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 16]} />
        <meshPhysicalMaterial color="#3a3a3a" metalness={1} roughness={0.08} clearcoat={1} />
      </mesh>
      {/* Lock mechanism circles */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.5, 0.5 - i * 0.5, 0.9]}>
          <torusGeometry args={[0.08, 0.015, 8, 32]} />
          <meshPhysicalMaterial color="#444" metalness={1} roughness={0.03} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Glass Door — translucent with realistic refraction ─── */
function VaultDoor({ openProgress }: { openProgress: number }) {
  const doorRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!doorRef.current) return;
    const targetRotation = -openProgress * Math.PI * 0.6;
    doorRef.current.rotation.y += (targetRotation - doorRef.current.rotation.y) * 0.04;
  });

  return (
    <group ref={doorRef} position={[1.18, 0, 0.85]}>
      <RoundedBox
        args={[2.36, 3.0, 0.08]}
        radius={0.04}
        smoothness={4}
        position={[-1.18, 0, 0.04]}
        castShadow
      >
        <meshPhysicalMaterial
          color="#111111"
          metalness={0.3}
          roughness={0.05}
          transmission={0.6}
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
    </group>
  );
}

/* ─── Internal glow — the core inside the vault ─── */
function DataCore({ intensity }: { intensity: number }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!coreRef.current || !glowRef.current) return;
    const pulse = Math.sin(clock.getElapsedTime() * 1.5) * 0.12 + 0.88;
    const scale = 0.25 + intensity * 0.25;
    coreRef.current.scale.setScalar(scale * pulse);
    glowRef.current.intensity = intensity * 4 * pulse;
  });

  return (
    <group position={[0, 0, -0.2]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.3, 4]} />
        <meshStandardMaterial
          color="#4d9fff"
          emissive="#4d9fff"
          emissiveIntensity={4}
          toneMapped={false}
        />
      </mesh>
      <pointLight ref={glowRef} color="#4d9fff" intensity={0} distance={6} decay={2} />
    </group>
  );
}

/* ─── Floating 3D Cards that burst from the vault ─── */
interface Card3DProps {
  index: number;
  burstProgress: number;  // 0→1 how much cards have burst out
  arrangeProgress: number; // 0→1 how much cards have arranged
  vaultX: number; // vault's current x position for burst origin
  totalCards: number;
}

const CARD_DATA = [
  { color: '#1a1a2e', accent: '#4d9fff', label: 'AI-Powered' },
  { color: '#1a1a2e', accent: '#7c4dff', label: 'Secure' },
  { color: '#1a1a2e', accent: '#00e5ff', label: 'Exclusive' },
  { color: '#1a1a2e', accent: '#ff4d6a', label: 'Curated' },
  { color: '#1a1a2e', accent: '#ffd740', label: 'Personal' },
  { color: '#1a1a2e', accent: '#69f0ae', label: 'Premium' },
];

// (Card3D removed — using Card3DWithRoundedBox instead)

// Custom easing functions
function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/* ─── roundedBoxGeometry helper — drei provides it but we need it inline too ─── */
// Actually drei's RoundedBox uses it, let's use RoundedBox for cards too

function Card3DWithRoundedBox({ index, burstProgress, arrangeProgress, vaultX, totalCards }: Card3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentRot = useRef(new THREE.Euler(0, 0, 0));

  const burstTarget = useMemo(() => {
    const angle = (index / totalCards) * Math.PI * 2 + Math.PI * 0.15;
    const radius = 2.0 + (index % 3) * 0.6;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * 0.5,
      2 + index * 0.3
    );
  }, [index, totalCards]);

  const arrangedTarget = useMemo(() => {
    const cols = 3;
    const row = Math.floor(index / cols);
    const col = index % cols;
    return new THREE.Vector3(
      (col - 1) * 2.0 + 1.8,
      (0.5 - row) * 2.6,
      3.0
    );
  }, [index]);

  const card = CARD_DATA[index % CARD_DATA.length];

  useFrame(() => {
    if (!groupRef.current) return;

    const origin = new THREE.Vector3(vaultX, 0, 0.5);
    let targetPos: THREE.Vector3;
    let targetRotX = 0, targetRotY = 0, targetRotZ = 0;
    let targetScale = 1;

    if (burstProgress <= 0) {
      targetPos = origin.clone();
      targetScale = 0;
    } else if (arrangeProgress <= 0) {
      const eased = easeOutBack(Math.min(1, burstProgress));
      targetPos = origin.clone().lerp(burstTarget, eased);
      targetRotX = burstProgress * (index % 2 === 0 ? 0.4 : -0.4);
      targetRotY = burstProgress * Math.PI * 0.2 * (index % 2 === 0 ? 1 : -1);
      targetRotZ = burstProgress * (index % 3 === 0 ? 0.15 : -0.1);
      targetScale = Math.min(1, burstProgress * 2);
    } else {
      const eased = easeOutCubic(arrangeProgress);
      targetPos = burstTarget.clone().lerp(arrangedTarget, eased);
      targetRotX = (1 - eased) * 0.3 * (index % 2 === 0 ? 1 : -1);
      targetRotY = (1 - eased) * 0.2;
      targetRotZ = 0;
      targetScale = 1;
    }

    currentPos.current.lerp(targetPos, 0.07);
    currentRot.current.x += (targetRotX - currentRot.current.x) * 0.05;
    currentRot.current.y += (targetRotY - currentRot.current.y) * 0.05;
    currentRot.current.z += (targetRotZ - currentRot.current.z) * 0.05;

    groupRef.current.position.copy(currentPos.current);
    groupRef.current.rotation.copy(currentRot.current);

    const s = groupRef.current.scale.x;
    const newScale = s + (targetScale - s) * 0.08;
    groupRef.current.scale.setScalar(newScale);
  });

  return (
    <group ref={groupRef} scale={0}>
      <RoundedBox args={[1.4, 1.9, 0.05]} radius={0.06} smoothness={3} castShadow>
        <meshPhysicalMaterial
          color={card.color}
          metalness={0.15}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.03}
          envMapIntensity={0.9}
          transparent
          opacity={0.95}
        />
      </RoundedBox>
      {/* Card accent surface */}
      <RoundedBox args={[1.2, 0.06, 0.02]} radius={0.02} smoothness={2} position={[0, 0.7, 0.035]}>
        <meshStandardMaterial
          color={card.accent}
          emissive={card.accent}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </RoundedBox>
      {/* Card inner glow dot */}
      <mesh position={[0, 0, 0.04]}>
        <circleGeometry args={[0.12, 24]} />
        <meshStandardMaterial
          color={card.accent}
          emissive={card.accent}
          emissiveIntensity={0.8}
          transparent
          opacity={0.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ─── Main VaultObject — orchestrates everything ─── */
function VaultObject({ scrollProgress, mouseX, mouseY }: VaultObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const currentRotX = useRef(0);
  const currentRotY = useRef(0);
  const currentPosX = useRef(0);
  const currentPosY = useRef(0);
  const currentPosZ = useRef(0);

  // ═══ Scroll Phases ═══
  // 0.00 - 0.20: Hero — vault centered, title visible
  // 0.20 - 0.40: Door opens slowly
  // 0.40 - 0.55: Cards burst out
  // 0.55 - 0.70: Vault closes door & slides left
  // 0.70 - 1.00: Cards arrange in grid, features visible

  const doorOpen = useMemo(() => {
    if (scrollProgress < 0.20) return 0;
    if (scrollProgress > 0.50) {
      // Door closing phase
      if (scrollProgress < 0.65) return 1 - (scrollProgress - 0.50) / 0.15;
      return 0;
    }
    return Math.min(1, (scrollProgress - 0.20) / 0.25);
  }, [scrollProgress]);

  const coreIntensity = useMemo(() => {
    if (scrollProgress < 0.20) return 0.1;
    if (scrollProgress < 0.50) return 0.1 + (scrollProgress - 0.20) / 0.30 * 0.9;
    if (scrollProgress < 0.65) return 1 - (scrollProgress - 0.50) / 0.15;
    return 0;
  }, [scrollProgress]);

  const cardBurstProgress = useMemo(() => {
    if (scrollProgress < 0.38) return 0;
    if (scrollProgress > 0.55) return 1;
    return (scrollProgress - 0.38) / 0.17;
  }, [scrollProgress]);

  const cardArrangeProgress = useMemo(() => {
    if (scrollProgress < 0.65) return 0;
    if (scrollProgress > 0.85) return 1;
    return (scrollProgress - 0.65) / 0.20;
  }, [scrollProgress]);

  // Vault target position
  const targetX = useMemo(() => {
    if (scrollProgress < 0.55) return 0;
    if (scrollProgress > 0.72) return -3.2;
    return -(scrollProgress - 0.55) / 0.17 * 3.2;
  }, [scrollProgress]);

  const targetZ = useMemo(() => {
    if (scrollProgress < 0.20) return 0;
    if (scrollProgress < 0.40) return -(scrollProgress - 0.20) / 0.20 * 1.2;
    if (scrollProgress < 0.55) return -1.2;
    return -1.2 + (scrollProgress - 0.55) / 0.17 * 1.2;
  }, [scrollProgress]);

  const targetScale = useMemo(() => {
    if (scrollProgress < 0.55) return 1;
    if (scrollProgress > 0.75) return 0.7;
    return 1 - (scrollProgress - 0.55) / 0.20 * 0.3;
  }, [scrollProgress]);

  useFrame(() => {
    if (!groupRef.current) return;

    // Pointer parallax — only in hero phase
    const parallaxStr = Math.max(0, 1 - scrollProgress * 3) * 0.12;
    const tRotY = mouseX * parallaxStr;
    const tRotX = -mouseY * parallaxStr;

    currentRotX.current += (tRotX - currentRotX.current) * 0.03;
    currentRotY.current += (tRotY - currentRotY.current) * 0.03;

    groupRef.current.rotation.x = currentRotX.current;
    groupRef.current.rotation.y = currentRotY.current;

    currentPosX.current += (targetX - currentPosX.current) * 0.04;
    currentPosY.current += (0 - currentPosY.current) * 0.04;
    currentPosZ.current += (targetZ - currentPosZ.current) * 0.04;

    groupRef.current.position.set(currentPosX.current, currentPosY.current, currentPosZ.current);

    const s = groupRef.current.scale.x;
    groupRef.current.scale.setScalar(s + (targetScale - s) * 0.05);
  });

  return (
    <>
      <group ref={groupRef}>
        <VaultBody />
        <VaultDoor openProgress={doorOpen} />
        <DataCore intensity={coreIntensity} />
      </group>

      {/* 3D Cards */}
      {CARD_DATA.map((_, i) => (
        <Card3DWithRoundedBox
          key={i}
          index={i}
          burstProgress={cardBurstProgress}
          arrangeProgress={cardArrangeProgress}
          vaultX={currentPosX.current ?? 0}
          totalCards={CARD_DATA.length}
        />
      ))}
    </>
  );
}

export { VaultObject };
