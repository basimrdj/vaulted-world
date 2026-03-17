"use client"

import {
  motion,
  useReducedMotion,
  useScroll,
  type MotionProps,
} from "motion/react"

import { cn } from "@/lib/utils"

interface ScrollProgressProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  keyof MotionProps
> {
  ref?: React.Ref<HTMLDivElement>
}

export function ScrollProgress({
  className,
  ref,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-px origin-left bg-[#0A0A0A]",
        className
      )}
      style={{
        scaleX: prefersReducedMotion ? 1 : scrollYProgress,
      }}
      {...props}
    />
  )
}
