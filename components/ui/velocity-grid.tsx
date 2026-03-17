"use client"

import type { ReactNode } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"

export function VelocityGrid({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)

  const skewY = useTransform(scrollVelocity, [-1200, 1200], [5, -5])
  const smoothSkew = useSpring(skewY, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
  })

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      style={{ skewY: smoothSkew, transformPerspective: 1200 }}
      className="origin-center [will-change:transform]"
    >
      {children}
    </motion.div>
  )
}
