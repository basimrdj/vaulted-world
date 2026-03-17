import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ContactShadows } from '@react-three/drei';

interface VaultLightingProps {
  scrollProgress: number;
}

function VaultLighting({ scrollProgress }: VaultLightingProps) {
  const keyLightRef = useRef<THREE.SpotLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);

  const rimIntensity = useMemo(() => {
    return 0.5 + scrollProgress * 1.5;
  }, [scrollProgress]);

  useFrame(() => {
    if (rimLightRef.current) {
      rimLightRef.current.intensity += (rimIntensity - rimLightRef.current.intensity) * 0.05;
    }
  });

  return (
    <>
      {/* Key light — warm overhead */}
      <spotLight
        ref={keyLightRef}
        position={[3, 5, 5]}
        angle={0.4}
        penumbra={0.8}
        intensity={2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      
      {/* Rim light — cool blue from behind */}
      <pointLight
        ref={rimLightRef}
        position={[-3, 2, -3]}
        intensity={0.5}
        color="#4d8fff"
        decay={2}
        distance={15}
      />
      
      {/* Fill light — subtle bottom */}
      <pointLight
        position={[0, -3, 3]}
        intensity={0.3}
        color="#ffffff"
        decay={2}
        distance={10}
      />

      {/* Ambient base */}
      <ambientLight intensity={0.08} color="#ffffff" />

      {/* Contact shadows on floor */}
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.4}
        scale={8}
        blur={2.5}
        far={4}
        color="#000000"
      />
    </>
  );
}

export { VaultLighting };
