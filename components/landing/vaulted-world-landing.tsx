"use client"

import { useMemo, useState } from "react"
import VaultScroll from "@/components/VaultScroll"

interface EmergingCard {
  label: string
  detail: string
}

const vaultCards: EmergingCard[] = [
  { label: "AI-Powered", detail: "Vision engine" },
  { label: "Secure", detail: "Private vault" },
  { label: "Exclusive", detail: "Early drops" },
  { label: "Curated", detail: "Signal-first picks" },
  { label: "Personal", detail: "Intent memory" },
  { label: "Premium", detail: "Priority access" },
]

const burstTargets = [
  { x: 50, y: 44, rotate: -14 },
  { x: 58, y: 42, rotate: -8 },
  { x: 63, y: 48, rotate: -3 },
  { x: 51, y: 56, rotate: 9 },
  { x: 60, y: 57, rotate: 12 },
  { x: 68, y: 53, rotate: 16 },
]

const arrangedTargets = [
  { x: 67, y: 36, rotate: -4 },
  { x: 79, y: 36, rotate: 2 },
  { x: 91, y: 36, rotate: 5 },
  { x: 67, y: 56, rotate: -3 },
  { x: 79, y: 56, rotate: 1 },
  { x: 91, y: 56, rotate: 4 },
]

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function rangeProgress(value: number, start: number, end: number) {
  if (value <= start) return 0
  if (value >= end) return 1
  return (value - start) / (end - start)
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3)
}

function easeOutBack(value: number) {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2)
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t
}

export function VaultedWorldLanding() {
  const [scrollProgress, setScrollProgress] = useState(0)

  const heroOpacity = useMemo(() => {
    if (scrollProgress < 0.12) return 1
    if (scrollProgress > 0.26) return 0
    return 1 - rangeProgress(scrollProgress, 0.12, 0.26)
  }, [scrollProgress])

  const unlockOpacity = useMemo(() => {
    if (scrollProgress < 0.22) return 0
    if (scrollProgress < 0.3) return rangeProgress(scrollProgress, 0.22, 0.3)
    if (scrollProgress > 0.48) return 0
    if (scrollProgress > 0.4) return 1 - rangeProgress(scrollProgress, 0.4, 0.48)
    return 1
  }, [scrollProgress])

  const featureBlockOpacity = useMemo(
    () => rangeProgress(scrollProgress, 0.7, 0.84),
    [scrollProgress]
  )

  const ctaOpacity = useMemo(
    () => rangeProgress(scrollProgress, 0.88, 0.97),
    [scrollProgress]
  )

  const cardBurstProgress = useMemo(
    () => rangeProgress(scrollProgress, 0.38, 0.56),
    [scrollProgress]
  )

  const cardArrangeProgress = useMemo(
    () => rangeProgress(scrollProgress, 0.64, 0.86),
    [scrollProgress]
  )

  return (
    <VaultScroll
      onProgressChange={setScrollProgress}
      sectionClassName="relative h-[600vh] bg-white"
    >
      <div className="pointer-events-none absolute inset-0 z-10">
        <div
          className="absolute inset-0 isolate flex flex-col items-center justify-center px-6"
          style={{
            opacity: heroOpacity,
            transform: `translateY(${scrollProgress * -70}px)`,
          }}
        >
          <h1
            className="font-panchang text-6xl font-bold tracking-[0.22em] md:text-8xl"
          >
            <span className="text-black">V</span>
            <span className="text-white mix-blend-difference">AULTE</span>
            <span className="text-black">D</span>
          </h1>
          <p className="mt-4 text-[15px] font-medium tracking-[0.12em] text-white mix-blend-difference uppercase md:text-lg">
            The AI desire engine
          </p>
          <button
            type="button"
            className="mt-9 rounded-full border border-[#1A1A1A] bg-[#111111] px-8 py-3 text-sm font-semibold tracking-[0.12em] text-white uppercase shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
          >
            Open Your Vault
          </button>
          <p className="mt-7 text-xs font-medium tracking-[0.18em] text-white mix-blend-difference uppercase">
            Join 50,000+ smart shoppers
          </p>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ opacity: unlockOpacity }}
        >
          <div className="text-center">
            <p className="text-[11px] font-medium tracking-[0.42em] text-white mix-blend-difference uppercase">
              Unlocking
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-wide text-white mix-blend-difference md:text-6xl">
              Your digital vault
            </h2>
          </div>
        </div>

        <div className="absolute inset-0 hidden md:block" style={{ opacity: featureBlockOpacity }}>
          {vaultCards.map((card, index) => {
            const origin = { x: 46, y: 52, rotate: -2 }
            const burstTarget = burstTargets[index]
            const arrangedTarget = arrangedTargets[index]

            const burstEased = easeOutBack(cardBurstProgress)
            const arrangeEased = easeOutCubic(cardArrangeProgress)

            const x =
              cardArrangeProgress <= 0
                ? lerp(origin.x, burstTarget.x, burstEased)
                : lerp(burstTarget.x, arrangedTarget.x, arrangeEased)
            const y =
              cardArrangeProgress <= 0
                ? lerp(origin.y, burstTarget.y, burstEased)
                : lerp(burstTarget.y, arrangedTarget.y, arrangeEased)
            const rotate =
              cardArrangeProgress <= 0
                ? lerp(origin.rotate, burstTarget.rotate, burstEased)
                : lerp(burstTarget.rotate, arrangedTarget.rotate, arrangeEased)
            const scale =
              cardArrangeProgress <= 0
                ? clamp(0.36 + burstEased * 0.72, 0, 1.04)
                : lerp(1.04, 1, arrangeEased)
            const opacity = clamp(cardBurstProgress * 1.2, 0, 1)

            return (
              <div
                key={card.label}
                className="absolute w-[180px] rounded-2xl border border-[#DADADA] bg-white/95 p-4 shadow-[0_18px_42px_rgba(0,0,0,0.16)] backdrop-blur-sm"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  opacity,
                  transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
                }}
              >
                <div className="mb-3 h-[3px] w-full rounded-full bg-[#1A1A1A]" />
                <p className="text-[11px] font-semibold tracking-[0.16em] text-[#111111] uppercase">
                  {card.label}
                </p>
                <p className="mt-1 text-[11px] tracking-[0.08em] text-[#6A6A6A] uppercase">
                  {card.detail}
                </p>
              </div>
            )
          })}
        </div>

        <div
          className="absolute inset-x-0 top-[8vh] flex justify-center px-5"
          style={{
            opacity: featureBlockOpacity,
            transform: `translateY(${(1 - featureBlockOpacity) * 20}px)`,
          }}
        >
          <div className="w-full max-w-xl rounded-[28px] border border-[#DCDCDC] bg-white/88 px-6 py-5 shadow-[0_14px_36px_rgba(0,0,0,0.12)] backdrop-blur-md">
            <p className="text-[10px] font-semibold tracking-[0.34em] text-[#666666] uppercase">
              Vault Matrix
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-wide text-[#121212] md:text-3xl">
              Everything you need. Nothing you do not.
            </h3>
            <p className="mt-2 text-[12px] leading-relaxed text-[#5C5C5C]">
              AI-powered curation, secure storage, and timing intelligence in a
              single premium workflow.
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-16 left-0 right-0 flex justify-center"
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${(1 - ctaOpacity) * 24}px)`,
          }}
        >
          <button
            type="button"
            className="pointer-events-auto rounded-full border border-[#1A1A1A] bg-[#111111] px-10 py-4 text-sm font-semibold tracking-[0.14em] text-white uppercase shadow-[0_12px_36px_rgba(0,0,0,0.2)]"
          >
            Get Early Access
          </button>
        </div>
      </div>
    </VaultScroll>
  )
}
