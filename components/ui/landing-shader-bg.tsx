"use client"

import { useEffect, useState, type ComponentType } from "react"
import { useHydrated } from "@/hooks/use-hydrated"
import { useWebGLSupport } from "@/hooks/use-webgl-support"

type MeshGradientProps = {
  className?: string
  colors: string[]
  speed?: number
}

export function LandingShaderBg() {
  const hydrated = useHydrated()
  const hasWebGL = useWebGLSupport()
  const [MeshGradientComp, setMeshGradientComp] =
    useState<ComponentType<MeshGradientProps> | null>(null)

  useEffect(() => {
    if (!hydrated || !hasWebGL) return

    let cancelled = false
    import("@paper-design/shaders-react").then((mod) => {
      if (!cancelled) {
        setMeshGradientComp(() => mod.MeshGradient as ComponentType<MeshGradientProps>)
      }
    })

    return () => {
      cancelled = true
    }
  }, [hydrated, hasWebGL])

  if (!hydrated || !hasWebGL) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_65%,rgba(255,255,255,0.06),transparent_48%),#000000]" />
    )
  }

  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden">
      {MeshGradientComp ? (
        <MeshGradientComp
          className="w-full h-full absolute inset-0"
          colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
          speed={1.0}
        />
      ) : (
        <div className="absolute inset-0 bg-black" />
      )}
    </div>
  )
}
