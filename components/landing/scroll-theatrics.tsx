"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useMediaQuery } from "@/hooks/use-media-query"
import { PremiumCrystalWrapper } from "@/components/premium/premium-crystal-wrapper"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { Meteors } from "@/components/ui/meteors"

const statements = [
  "Screenshot it.",
  "Save it.",
  "Track it.",
  "Own it.",
]

export function ScrollTheatrics() {
  const sectionRef = useRef<HTMLElement>(null)
  const statementRefs = useRef<(HTMLHeadingElement | null)[]>([])
  const objectRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const midgroundRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  useEffect(() => {
    if (!sectionRef.current || !isDesktop || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const headings = statementRefs.current.filter(Boolean) as HTMLHeadingElement[]
      if (!headings.length) return

      gsap.set(headings, {
        opacity: 0,
        yPercent: 20,
        scale: 0.96,
        filter: "blur(10px)",
      })
      gsap.set(headings[0], {
        opacity: 1,
        yPercent: 0,
        scale: 1,
        filter: "blur(0px)",
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=420%",
          pin: true,
          scrub: 1,
        },
      })

      const totalDuration = headings.length * 1.8

      if (backgroundRef.current) {
        timeline.fromTo(
          backgroundRef.current,
          { yPercent: 0, scale: 1, opacity: 0.85 },
          {
            yPercent: -22,
            scale: 1.08,
            opacity: 1,
            duration: totalDuration,
            ease: "none",
          },
          0
        )
      }

      if (midgroundRef.current) {
        timeline.fromTo(
          midgroundRef.current,
          { yPercent: 0, opacity: 0.35 },
          {
            yPercent: -56,
            opacity: 0.72,
            duration: totalDuration,
            ease: "none",
          },
          0
        )
      }

      headings.forEach((heading, index) => {
        timeline.to(
          heading,
          {
            opacity: 1,
            yPercent: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "power2.out",
          },
          index === 0 ? 0 : `+=${index === 1 ? 0.2 : 0.1}`
        )

        if (index < headings.length - 1) {
          timeline.to(
            heading,
            {
              opacity: 0,
              yPercent: -16,
              scale: 1.05,
              filter: "blur(10px)",
              duration: 0.7,
              ease: "power2.inOut",
            },
            "+=0.55"
          )
        }
      })

      if (objectRef.current) {
        timeline.fromTo(
          objectRef.current,
          { rotate: -8, scale: 0.84, y: 34, opacity: 0.58 },
          {
            rotate: 14,
            scale: 1.08,
            y: -24,
            opacity: 1,
            duration: totalDuration,
            ease: "none",
          },
          0
        )
      }
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [isDesktop, prefersReducedMotion])

  if (!isDesktop || prefersReducedMotion) {
    return (
      <section className="bg-[#0A0A0A] px-6 py-24">
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          {statements.map((statement) => (
            <h2
              key={statement}
              className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl"
            >
              {statement}
            </h2>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[#0A0A0A]">
      <div
        ref={backgroundRef}
        className="absolute inset-0 [will-change:transform,opacity]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_58%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_46%)]" />
      </div>

      <div
        ref={midgroundRef}
        className="pointer-events-none absolute inset-0 z-[5] overflow-hidden [will-change:transform,opacity]"
      >
        <Meteors number={30} className="bg-white/75 shadow-[0_0_0_1px_#ffffff25]" />
      </div>

      <ProgressiveBlur
        position="top"
        height="24%"
        className="!z-20"
        blurLevels={[0.6, 1.2, 2, 4, 8, 12, 20, 36]}
      />
      <ProgressiveBlur
        position="bottom"
        height="26%"
        className="!z-20"
        blurLevels={[0.6, 1.2, 2, 4, 8, 12, 20, 36]}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-between gap-12 px-6">
        <div className="relative flex-1">
          {statements.map((statement, index) => (
            <h2
              key={statement}
              ref={(node) => {
                statementRefs.current[index] = node
              }}
              className="absolute left-0 top-1/2 w-full -translate-y-1/2 font-display text-6xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl [will-change:transform,opacity,filter] supports-[mask-image:linear-gradient(black,transparent)]:[mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)]"
              style={{ opacity: 0 }}
            >
              {statement}
            </h2>
          ))}
        </div>

        <div
          ref={objectRef}
          className="relative flex h-[340px] w-[340px] items-center justify-center [will-change:transform,opacity]"
        >
          <PremiumCrystalWrapper />
        </div>
      </div>
    </section>
  )
}
