import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

interface VaultObjectProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
}

function VaultBody() {
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#1a1a1a'),
    metalness: 1,
    roughness: 0.18,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    reflectivity: 1,
    envMapIntensity: 0.8,
  }), []);

  return (
    <group>
      {/* Main body */}
      <RoundedBox args={[2.4, 3, 1.8]} radius={0.08} smoothness={4} material={material} castShadow receiveShadow />
      {/* Door frame inset */}
      <RoundedBox args={[2.1, 2.6, 0.05]} radius={0.02} smoothness={2} position={[0, 0, 0.91]} material={material} />
      {/* Handle */}
      <mesh position={[0.7, 0, 1.0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.8, 16]} />
        <meshPhysicalMaterial
          color="#2a2a2a"
          metalness={1}
          roughness={0.1}
          clearcoat={1}
        />
      </mesh>
      {/* Locking mechanism circles */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.6, 0.6 - i * 0.6, 0.95]}>
          <torusGeometry args={[0.12, 0.02, 8, 24]} />
          <meshPhysicalMaterial
            color="#333"
            metalness={1}
            roughness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

function VaultDoor({ openProgress }: { openProgress: number }) {
  const doorRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!doorRef.current) return;
    // Rotate door around its right edge (hinge)
    const targetRotation = -openProgress * Math.PI * 0.55;
    doorRef.current.rotation.y += (targetRotation - doorRef.current.rotation.y) * 0.06;
  });

  return (
    <group ref={doorRef} position={[1.05, 0, 0.9]}>
      {/* Door panel pivot is at left edge */}
      <RoundedBox args={[2.0, 2.5, 0.12]} radius={0.02} smoothness={2} position={[-1.05, 0, 0.05]} castShadow>
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={1}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </RoundedBox>
    </group>
  );
}

function DataCore({ intensity }: { intensity: number }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!coreRef.current || !glowRef.current) return;
    const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.15 + 0.85;
    const scale = 0.3 + intensity * 0.2;
    coreRef.current.scale.setScalar(scale * pulse);
    glowRef.current.intensity = intensity * 3 * pulse;
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.3, 3]} />
        <meshStandardMaterial
          color="#4d9fff"
          emissive="#4d9fff"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        ref={glowRef}
        color="#4d9fff"
        intensity={0}
        distance={5}
        decay={2}
      />
    </group>
  );
}

function VaultObject({ scrollProgress, mouseX, mouseY }: VaultObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotX = useRef(0);
  const targetRotY = useRef(0);
  const currentRotX = useRef(0);
  const currentRotY = useRef(0);

  // Scroll phases
  const doorOpen = useMemo(() => {
    if (scrollProgress < 0.25) return 0;
    if (scrollProgress > 0.55) return 1;
    return (scrollProgress - 0.25) / 0.3;
  }, [scrollProgress]);

  const coreIntensity = useMemo(() => {
    if (scrollProgress < 0.3) return 0.15;
    if (scrollProgress > 0.6) return 1;
    return 0.15 + ((scrollProgress - 0.3) / 0.3) * 0.85;
  }, [scrollProgress]);

  // Camera-like position based on scroll
  const scrollZ = useMemo(() => {
    if (scrollProgress < 0.25) return 0;
    if (scrollProgress < 0.5) return -(scrollProgress - 0.25) * 6;
    if (scrollProgress < 0.75) return -1.5;
    return -1.5 + (scrollProgress - 0.75) * 6;
  }, [scrollProgress]);

  const scrollY = useMemo(() => {
    if (scrollProgress < 0.5) return 0;
    if (scrollProgress < 0.75) return -(scrollProgress - 0.5) * 1;
    return -0.25 + (scrollProgress - 0.75) * 1;
  }, [scrollProgress]);

  useFrame(() => {
    if (!groupRef.current) return;

    // Pointer parallax (only strong in hero phase)
    const parallaxStrength = Math.max(0, 1 - scrollProgress * 2) * 0.15;
    targetRotY.current = mouseX * parallaxStrength;
    targetRotX.current = -mouseY * parallaxStrength;

    // Heavy damped spring
    currentRotX.current += (targetRotX.current - currentRotX.current) * 0.03;
    currentRotY.current += (targetRotY.current - currentRotY.current) * 0.03;

    groupRef.current.rotation.x = currentRotX.current;
    groupRef.current.rotation.y = currentRotY.current;

    // Scroll position
    groupRef.current.position.z += (scrollZ - groupRef.current.position.z) * 0.05;
    groupRef.current.position.y += (scrollY - groupRef.current.position.y) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <VaultBody />
      <VaultDoor openProgress={doorOpen} />
      <DataCore intensity={coreIntensity} />
    </group>
  );
}

export { VaultObject };
