"use client"

import { BlurFade } from "@/components/ui/blur-fade"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Particles } from "@/components/ui/particles"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SplitHeadline } from "@/components/ui/split-headline"

const stats = [
  { label: "Items Saved", value: 50000, suffix: "+" },
  { label: "Price Drops Caught", value: 2300000, prefix: "$" },
  { label: "Average Rating", value: 4.8, suffix: "★", decimals: 1 },
]

export function Stats() {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const isMobile = useMediaQuery("(max-width: 767px)")

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-28">
      {!prefersReducedMotion && (
        <Particles
          quantity={isMobile ? 12 : 60}
          className="absolute inset-0 z-0 opacity-40"
          color="#ffffff"
          staticity={55}
          ease={60}
          size={0.8}
        />
      )}

      <div className="relative z-10 mx-auto max-w-5xl">
        <BlurFade delay={0.1} inView>
          <SplitHeadline
            text="Trusted by people who shop smart."
            className="text-center font-display text-4xl font-bold tracking-tight text-white md:text-5xl"
          />
        </BlurFade>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {stats.map((stat, i) => (
            <BlurFade key={stat.label} delay={0.15 + i * 0.08} inView>
              <div className="rounded-2xl border border-white/15 bg-white/5 px-6 py-8 text-center backdrop-blur-sm">
                <p className="font-mono text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {stat.prefix}
                  <NumberTicker
                    value={stat.value}
                    decimalPlaces={stat.decimals ?? 0}
                    className="font-mono text-3xl font-bold tracking-tight text-white md:text-4xl"
                  />
                  {stat.suffix}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-white/55">
                  {stat.label}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
