import { Canvas } from '@react-three/fiber';
import { Suspense, memo } from 'react';
import { VaultObject } from './VaultObject';
import { VaultLighting } from './VaultLighting';
import { VaultPostprocessing } from './VaultPostprocessing';
import { Environment } from '@react-three/drei';

interface VaultSceneProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
}

const VaultScene = memo(({ scrollProgress, mouseX, mouseY }: VaultSceneProps) => {
  return (
    <Canvas
      className="!fixed inset-0 !h-screen !w-screen"
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        stencil: false,
        depth: true,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 7], fov: 42, near: 0.1, far: 100 }}
      style={{ background: '#050505' }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 10, 30]} />
        
        <VaultLighting scrollProgress={scrollProgress} />
        <VaultObject
          scrollProgress={scrollProgress}
          mouseX={mouseX}
          mouseY={mouseY}
        />
        
        <Environment preset="city" environmentIntensity={0.4} />
        <VaultPostprocessing />
      </Suspense>
    </Canvas>
  );
});

VaultScene.displayName = 'VaultScene';
export { VaultScene };
