"use client"

import { useMemo } from "react"

interface HeroDomOverlayProps {
  scrollProgress: number
}

const featurePills = [
  "AI Vision",
  "Price Brain",
  "Dream Boards",
  "Instant Alerts",
]

function rangeProgress(value: number, start: number, end: number) {
  if (value <= start) return 0
  if (value >= end) return 1
  return (value - start) / (end - start)
}

function fadeInOut(
  value: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number
) {
  if (value <= enterStart || value >= exitEnd) return 0
  if (value < enterEnd) return rangeProgress(value, enterStart, enterEnd)
  if (value > exitStart) return 1 - rangeProgress(value, exitStart, exitEnd)
  return 1
}

export function HeroDomOverlay({ scrollProgress }: HeroDomOverlayProps) {
  const unlockOpacity = useMemo(() => {
    return fadeInOut(scrollProgress, 0.2, 0.3, 0.41, 0.5)
  }, [scrollProgress])

  const featureOpacity = useMemo(() => {
    return fadeInOut(scrollProgress, 0.66, 0.75, 0.9, 0.98)
  }, [scrollProgress])

  const ctaOpacity = useMemo(() => {
    return fadeInOut(scrollProgress, 0.86, 0.94, 0.985, 1)
  }, [scrollProgress])

  const progress = useMemo(
    () => rangeProgress(scrollProgress, 0.08, 0.95),
    [scrollProgress]
  )

  const railOpacity = useMemo(
    () => fadeInOut(scrollProgress, 0.12, 0.2, 0.94, 1),
    [scrollProgress]
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-[4]">
      <div
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 md:flex"
        style={{ opacity: railOpacity }}
      >
        <div className="relative h-40 w-[2px] bg-white/20">
          <div
            className="absolute left-0 top-0 w-full bg-white transition-all duration-300"
            style={{ height: `${Math.max(progress * 100, 2)}%` }}
          />
        </div>
        <div className="ml-3 flex flex-col justify-between text-[9px] font-medium tracking-[0.24em] text-white/55 uppercase">
          <span>Lock</span>
          <span>Open</span>
          <span>Curate</span>
          <span>Own</span>
        </div>
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center px-6"
        style={{
          opacity: unlockOpacity,
          transform: `translateY(${(1 - unlockOpacity) * 18}px)`,
        }}
      >
        <div className="text-center">
          <p className="text-[10px] font-medium tracking-[0.42em] text-white/48 uppercase">
            Unlocking
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-wide text-white md:text-6xl">
            Your digital vault
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[12px] tracking-[0.08em] text-white/55">
            Scanning intent. Mapping products. Preparing your private feed.
          </p>
        </div>
      </div>

      <div
        className="absolute inset-x-0 top-[11vh] flex justify-center px-5"
        style={{
          opacity: featureOpacity,
          transform: `translateY(${(1 - featureOpacity) * 14}px)`,
        }}
      >
        <div className="w-full max-w-3xl rounded-[28px] border border-white/12 bg-black/35 px-5 py-5 backdrop-blur-xl md:px-7 md:py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-medium tracking-[0.36em] text-white/45 uppercase">
                Vault Matrix
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-wide text-white md:text-3xl">
                Everything you need. Nothing you do not.
              </h2>
            </div>
            <p className="max-w-xs text-[12px] leading-relaxed text-white/58">
              The vault turns screenshots into a live intelligence layer for
              discovery, pricing, and timing.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {featurePills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.16em] text-white/80 uppercase"
              >
                {pill}
              </span>
            ))}
          </div>
          <div className="mt-4 h-px w-full bg-gradient-to-r from-white/0 via-white/28 to-white/0" />
          <p className="mt-3 text-[10px] tracking-[0.18em] text-white/42 uppercase">
            Personal catalog • Live pricing • AI-assisted intent
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
        <div className="rounded-full border border-white/20 bg-black/45 px-8 py-3 text-[11px] font-medium tracking-[0.2em] text-white/82 uppercase backdrop-blur-md">
          Enter Your Curated Feed
        </div>
      </div>
    </div>
  )
}
