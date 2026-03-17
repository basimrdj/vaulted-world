"use client"

import { useState, useEffect } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

export function LandingShaderBg() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="absolute inset-0 bg-black" />

  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden">
      <MeshGradient
        className="w-full h-full absolute inset-0"
        colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
        speed={1.0}
      />
    </div>
  )
}
