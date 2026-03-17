"use client"

import { useRef, useCallback } from "react"
import Image from "next/image"
import { Plus } from "lucide-react"
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion"
import { VaultBackground } from "@/components/ui/vault-background"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Sidebar } from "@/components/navigation/sidebar"
import { useMediaQuery } from "@/hooks/use-media-query"
import { MOCK_BOARDS } from "@/lib/mock-data"
import type { Board } from "@/stores/vault-store"
import { BlurFade } from "@/components/ui/blur-fade"
import { MagicCard } from "@/components/ui/magic-card"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { V_ULTRA_SPRING } from "@/lib/physics"

const BOARD_TYPE_LABELS: Record<Board["type"], string> = {
  standard: "Standard",
  moodboard: "Moodboard",
  gift: "Gift",
  comparison: "Comparison",
}

const TILT_DEGREES = 4

/**
 * Perspective-tilt wrapper for board cards.
 * Tracks pointer position over the card and maps it to subtle rotateX / rotateY
 * transforms. Uses V_ULTRA_SPRING for the return animation on mouse leave.
 * Disabled on mobile and when the user prefers reduced motion.
 */
function TiltCard({
  children,
  enabled,
}: {
  children: React.ReactNode
  enabled: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  // Raw motion values updated synchronously from pointer events
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)

  // Spring-smoothed values using the project's V_ULTRA_SPRING config
  const springConfig = {
    stiffness: V_ULTRA_SPRING.stiffness,
    damping: V_ULTRA_SPRING.damping,
    mass: V_ULTRA_SPRING.mass,
    restDelta: V_ULTRA_SPRING.restDelta,
  }
  const rotateX = useSpring(rawRotateX, springConfig)
  const rotateY = useSpring(rawRotateY, springConfig)

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!enabled || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      // Normalise pointer position to -1..1 range
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      // rotateX is inverted: pointer at top -> positive rotation (tilt towards viewer)
      rawRotateX.set(-ny * TILT_DEGREES * 2)
      rawRotateY.set(nx * TILT_DEGREES * 2)
    },
    [enabled, rawRotateX, rawRotateY],
  )

  const handlePointerLeave = useCallback(() => {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }, [rawRotateX, rawRotateY])

  if (!enabled) {
    return <>{children}</>
  }

  return (
    <div ref={ref} style={{ perspective: 800 }}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function BoardsPage() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const shouldAnimate = isDesktop && !prefersReducedMotion

  return (
    <>
      <VaultBackground />
      {isDesktop && <Sidebar />}

      <main
        className={`min-h-screen pb-24 lg:pb-0 ${isDesktop ? "pl-[240px]" : ""}`}
      >
        <div className="max-w-6xl mx-auto px-5 py-8 lg:py-10">
          <BlurFade delay={0.1} inView disabled={!shouldAnimate}>
            <div className="flex items-end justify-between">
              <div>
                <h1 className="font-display font-bold text-[28px] tracking-tight text-[#0A0A0A]">
                  Your Boards
                </h1>
                <p className="text-[13px] text-[#9A9A9A] mt-1.5">
                  {MOCK_BOARDS.length} collections
                </p>
              </div>
            </div>
          </BlurFade>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-5">
            {MOCK_BOARDS.map((board, i) => (
              <BlurFade
                key={board.id}
                delay={0.05 + i * 0.08}
                inView
                disabled={!shouldAnimate}
              >
                <TiltCard enabled={shouldAnimate}>
                  <MagicCard className="group bg-white rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer border border-[#E8E8E8]/60" gradientColor="rgba(0,0,0,0.03)">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={board.coverImage}
                        alt={board.name}
                        width={400}
                        height={267}
                        className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="font-semibold text-[15px] text-[#0A0A0A]">
                          {board.name}
                        </h2>
                        <span className="shrink-0 text-[10px] uppercase tracking-wider text-[#9A9A9A] bg-[#F7F7F7] px-2 py-0.5 rounded-md font-medium">
                          {BOARD_TYPE_LABELS[board.type]}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#9A9A9A] mt-1">
                        {board.itemIds.length} items
                      </p>
                    </div>
                  </MagicCard>
                </TiltCard>
              </BlurFade>
            ))}

            <div className="flex min-h-[220px] items-center justify-center rounded-2xl border-2 border-dashed border-[#E0E0E0] bg-white/60 p-5">
              <InteractiveHoverButton
                type="button"
                className="border-[#D0D0D0] bg-white text-[#0A0A0A]"
              >
                <span className="inline-flex items-center gap-2 text-[13px]">
                  <Plus className="w-4 h-4" />
                  Create Board
                </span>
              </InteractiveHoverButton>
            </div>
          </div>
        </div>
      </main>

      {!isDesktop && <BottomNav />}
    </>
  )
}
