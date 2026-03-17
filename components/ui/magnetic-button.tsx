"use client"

import type { MouseEvent, ReactNode } from "react"
import { useCallback, useRef } from "react"
import { motion, useReducedMotion, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
  disabled?: boolean
}

export function MagneticButton({
  children,
  className,
  strength = 14,
  radius = 140,
  disabled = false,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 280, damping: 22, mass: 0.35 })
  const y = useSpring(0, { stiffness: 280, damping: 22, mass: 0.35 })

  const enabled = !disabled && !prefersReducedMotion

  const onMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!enabled || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = event.clientX - centerX
      const deltaY = event.clientY - centerY
      const distance = Math.hypot(deltaX, deltaY)

      if (distance > radius) {
        x.set(0)
        y.set(0)
        return
      }

      const falloff = 1 - distance / radius
      x.set((deltaX / radius) * strength * falloff)
      y.set((deltaY / radius) * strength * falloff)
    },
    [enabled, radius, strength, x, y]
  )

  const onLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={enabled ? { x, y } : undefined}
      className={cn("inline-flex [will-change:transform]", className)}
    >
      {children}
    </motion.div>
  )
}
