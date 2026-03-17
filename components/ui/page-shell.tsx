"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ScrollProgress } from "@/components/ui/scroll-progress"

export function PageShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <ScrollProgress className="h-[2px] bg-[#0A0A0A]" />
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={pathname}
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, filter: "blur(4px)" }
          }
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, filter: "blur(4px)" }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
          }
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
