"use client"

import {
  Component,
  type ErrorInfo,
  type ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useWebGLSupport } from "@/hooks/use-webgl-support"
import { Vault3D } from "./vault-3d"
import { VaultFallbackVisual } from "./vault-fallback-visual"
import { HeroDomOverlay } from "./hero-dom-overlay"

class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  public state = { hasError: false }

  public static getDerivedStateFromError() {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    void error
    void info
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}

export function Vault3DWrapper() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const isMobile = useMediaQuery("(max-width: 767px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const hasWebGL = useWebGLSupport()

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight
    const progress = documentHeight > 0 ? scrollY / documentHeight : 0
    setScrollProgress(Math.min(Math.max(progress, 0), 1))
  }, [])

  const handlePointerMove = useCallback((event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1
    const y = (event.clientY / window.innerHeight) * 2 - 1
    setMouse({ x, y })
  }, [])

  useEffect(() => {
    if (isMobile || prefersReducedMotion || !hasWebGL) return

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handlePointerMove)
    const frame = window.requestAnimationFrame(handleScroll)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handlePointerMove)
    }
  }, [handlePointerMove, handleScroll, hasWebGL, isMobile, prefersReducedMotion])

  if (isMobile || prefersReducedMotion) return null

  if (!hasWebGL) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0">
        <VaultFallbackVisual />
      </div>
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <WebGLErrorBoundary fallback={<VaultFallbackVisual />}>
        <Vault3D
          scrollProgress={scrollProgress}
          mouseX={mouse.x}
          mouseY={mouse.y}
        />
      </WebGLErrorBoundary>
      <HeroDomOverlay scrollProgress={scrollProgress} />
    </div>
  )
}
