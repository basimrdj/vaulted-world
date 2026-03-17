"use client"

import { useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring } from "framer-motion"
import type { VaultItem } from "@/stores/vault-store"
import { MagicCard } from "@/components/ui/magic-card"
import { BorderBeam } from "@/components/ui/border-beam"
import { Lens } from "@/components/ui/lens"
import { useMediaQuery } from "@/hooks/use-media-query"
import { LiquidMetalCard } from "@/components/ui/liquid-metal-card"
import { V_ULTRA_SPRING } from "@/lib/physics"

const TILT_MAX_DEG = 4
const TILT_SPRING = {
  stiffness: V_ULTRA_SPRING.stiffness,
  damping: V_ULTRA_SPRING.damping,
  mass: V_ULTRA_SPRING.mass,
}

interface ItemCardProps {
  item: VaultItem
}

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}

function getPriceDropPercent(item: VaultItem): number | null {
  if (
    (item.priceStatus === "dropped" || item.priceStatus === "best") &&
    item.originalPrice &&
    item.originalPrice > item.price
  ) {
    const percent = Math.round(
      ((item.originalPrice - item.price) / item.originalPrice) * 100
    )
    return percent
  }
  return null
}

function MiniSparkline({ priceHistory, isDropping }: { priceHistory: { date: string; price: number }[]; isDropping?: boolean }) {
  if (priceHistory.length < 2) return null

  const prices = priceHistory.map((p) => p.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const range = max - min || 1
  const width = 44
  const height = 18

  const points = prices.map((price, i) => {
    const x = (i / (prices.length - 1)) * width
    const y = height - ((price - min) / range) * (height - 2) - 1
    return `${x},${y}`
  }).join(" ")

  const strokeColor = isDropping ? "#4A4A4A" : "#0A0A0A"

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="shrink-0 opacity-60"
    >
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ItemCard({ item }: ItemCardProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const shouldAnimate = isDesktop && !prefersReducedMotion
  const priceDropPercent = getPriceDropPercent(item)
  const isDropping = item.priceStatus === "dropped" || item.priceStatus === "best"

  const cardRef = useRef<HTMLElement>(null)

  // Raw motion values driven by mouse position
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)

  // Sprung values for smooth interpolation
  const rotateX = useSpring(rawRotateX, TILT_SPRING)
  const rotateY = useSpring(rawRotateY, TILT_SPRING)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!shouldAnimate || !cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      // Normalize cursor position to -1…1 from card center
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5
      // Invert Y so tilting toward cursor feels natural
      rawRotateX.set(-yNorm * TILT_MAX_DEG * 2)
      rawRotateY.set(xNorm * TILT_MAX_DEG * 2)
    },
    [shouldAnimate, rawRotateX, rawRotateY]
  )

  const handleMouseLeave = useCallback(() => {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }, [rawRotateX, rawRotateY])

  return (
    <motion.article
      ref={cardRef}
      className="rounded-2xl break-inside-avoid cursor-pointer group"
      style={
        shouldAnimate
          ? {
              perspective: 800,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d" as const,
            }
          : undefined
      }
      whileHover={shouldAnimate ? { y: -3 } : undefined}
      whileTap={{ scale: 0.98 }}
      transition={V_ULTRA_SPRING}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/vault/${item.id}`} className="block">
        <LiquidMetalCard disabled={!shouldAnimate}>
          <MagicCard
            className="overflow-hidden rounded-2xl border border-[#E8E8E8]/60 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            gradientColor="rgba(0,0,0,0.03)"
          >
            <motion.div
              layoutId={`product-image-${item.id}`}
              transition={V_ULTRA_SPRING}
              className="relative aspect-[4/5] overflow-hidden"
            >
              {shouldAnimate ? (
                <Lens zoomFactor={1.5} lensSize={100}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={500}
                    className="h-full w-full object-cover grayscale contrast-[1.15] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </Lens>
              ) : (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={500}
                  className="h-full w-full object-cover grayscale contrast-[1.15] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              )}
              {priceDropPercent !== null && (
                <span className="absolute right-2.5 top-2.5 z-[60] rounded-lg bg-[#0A0A0A] px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                  -{priceDropPercent}%
                </span>
              )}
            </motion.div>

            <div className="space-y-1.5 p-3.5">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-[#9A9A9A]">
                  {item.brand}
                </p>
                <h3 className="mt-0.5 line-clamp-2 text-[13px] font-medium leading-snug text-[#0A0A0A]">
                  {item.name}
                </h3>
              </div>
              <div className="flex items-center justify-between gap-2 pt-0.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-[15px] font-semibold text-[#0A0A0A]">
                    {formatPrice(item.price, item.currency)}
                  </span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="font-mono text-[11px] text-[#B0B0B0] line-through">
                      {formatPrice(item.originalPrice, item.currency)}
                    </span>
                  )}
                </div>
                <MiniSparkline priceHistory={item.priceHistory} isDropping={isDropping} />
              </div>
            </div>

            {priceDropPercent !== null && (
              <BorderBeam
                size={80}
                duration={8}
                colorFrom="#FFFFFF"
                colorTo="#9A9A9A"
                borderWidth={1.5}
              />
            )}
          </MagicCard>
        </LiquidMetalCard>
      </Link>
    </motion.article>
  )
}
