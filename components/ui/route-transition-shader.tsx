"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useHydrated } from "@/hooks/use-hydrated"
import { useWebGLSupport } from "@/hooks/use-webgl-support"

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float u_time;
  uniform float u_progress;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = hash(i + vec2(0.0, 0.0));
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = p * 2.02 + vec2(8.3, 2.1);
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 flow = uv;
    flow.x += fbm(uv * 2.3 + vec2(u_time * 0.28, -u_time * 0.18)) * 0.14;
    flow.y += fbm(uv * 2.6 + vec2(-u_time * 0.2, u_time * 0.24)) * 0.12;

    float sweep = smoothstep(
      u_progress - 0.18,
      u_progress + 0.08,
      flow.y + (fbm(flow * 4.0 + u_time * 0.35) - 0.5) * 0.22
    );
    float trailingEdge = smoothstep(0.82, 1.0, u_progress);
    float mask = sweep * (1.0 - trailingEdge);

    float grain = noise(uv * 120.0 + vec2(u_time * 7.0, u_time * 3.3));
    float mercury = fbm(flow * 7.0 - vec2(u_time * 0.55, u_time * 0.2));
    float luma = clamp(mix(0.08, 1.0, mercury) + grain * 0.14, 0.0, 1.0);

    gl_FragColor = vec4(vec3(luma), mask * 0.95);
  }
`

function TransitionPlane({ progress }: { progress: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_progress: { value: 0 },
    }),
    []
  )

  useFrame((state) => {
    const material = materialRef.current
    if (!material) return
    material.uniforms.u_time.value = state.clock.elapsedTime
    material.uniforms.u_progress.value = progress
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

interface RouteTransitionShaderProps {
  trigger: string | number
  disabled?: boolean
}

export function RouteTransitionShader({
  trigger,
  disabled = false,
}: RouteTransitionShaderProps) {
  const hydrated = useHydrated()
  const hasWebGL = useWebGLSupport()
  const [progress, setProgress] = useState(1)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (disabled || !hydrated || !hasWebGL) return

    const duration = 760
    let start: number | null = null
    let cancelled = false

    const tick = (now: number) => {
      if (cancelled) return
      if (start === null) start = now
      const elapsed = now - start
      const next = Math.min(elapsed / duration, 1)
      setProgress(next)

      if (next < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [trigger, disabled, hydrated, hasWebGL])

  if (disabled || !hydrated || !hasWebGL) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 1], fov: 50 }}
      >
        <TransitionPlane progress={progress} />
      </Canvas>
    </div>
  )
}
