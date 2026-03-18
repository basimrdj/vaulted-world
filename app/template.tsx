"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { V_ULTRA_SPRING } from "@/lib/physics"

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <ScrollProgress className="h-[2px] bg-[#0A0A0A]" />

      <LayoutGroup id="vault-shared-elements">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={pathname}
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            animate={{ opacity: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            transition={prefersReducedMotion ? { duration: 0 } : V_ULTRA_SPRING}
            className="min-h-screen"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>
    </>
  )
}
