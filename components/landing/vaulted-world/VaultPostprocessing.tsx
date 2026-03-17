"use client"

import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

function VaultPostprocessing() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.9}
        luminanceSmoothing={0.4}
        intensity={0.6}
        mipmapBlur
      />
      <Noise
        blendFunction={BlendFunction.OVERLAY}
        opacity={0.04}
      />
      <Vignette
        offset={0.3}
        darkness={0.7}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}

export { VaultPostprocessing };
