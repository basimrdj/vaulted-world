"use client"

import { useEffect, useRef } from "react"
import { BlurFade } from "@/components/ui/blur-fade"
import { useMediaQuery } from "@/hooks/use-media-query"
import { gsap } from "@/lib/gsap"
import { SplitHeadline } from "@/components/ui/split-headline"

const features = [
  {
    icon: "🔍",
    title: "AI Vision",
    description:
      "Screenshot anything from any app. Our AI identifies the product, finds it across 50+ retailers, and saves it to your vault.",
  },
  {
    icon: "📉",
    title: "Price Brain",
    description:
      "Never pay full price again. Track prices across retailers, get drop alerts, and let AI tell you the best time to buy.",
  },
  {
    icon: "🎨",
    title: "Dream Boards",
    description:
      "Turn saves into plans. Create moodboards, plan outfits, design rooms. AI suggests what's missing to complete your vision.",
  },
  {
    icon: "⚡",
    title: "Instant Alerts",
    description:
      "Get notified the moment price drops happen, stock is low, or a better alternative appears in your preferred range.",
  },
]

export function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  useEffect(() => {
    if (!sectionRef.current || !isDesktop || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[]
      if (!slides.length) return

      gsap.set(slides, { opacity: 0, y: 40, pointerEvents: "none" })
      gsap.set(slides[0], { opacity: 1, y: 0, pointerEvents: "auto" })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${Math.max(1, slides.length - 1) * 120}%`,
          pin: true,
          scrub: 1,
          snap:
            slides.length > 1
              ? {
                  snapTo: 1 / (slides.length - 1),
                  duration: 0.25,
                  ease: "power1.inOut",
                }
              : undefined,
        },
      })

      for (let i = 1; i < slides.length; i += 1) {
        timeline
          .to(
            slides[i - 1],
            { opacity: 0, y: -30, duration: 0.8, pointerEvents: "none" },
            i - 1
          )
          .to(
            slides[i],
            { opacity: 1, y: 0, duration: 0.8, pointerEvents: "auto" },
            i - 1
          )
      }
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [isDesktop, prefersReducedMotion])

  return (
    <section ref={sectionRef} className="px-6 py-28">
      <BlurFade delay={0.1} inView>
        <div className="text-center mb-16">
          <SplitHeadline
            text="Everything you need."
            className="font-display text-4xl md:text-5xl font-bold text-[#0A0A0A] tracking-tight"
          />
          <p className="text-[#9A9A9A] mt-4 text-base tracking-wide">
            Powerful features, beautifully simple.
          </p>
        </div>
      </BlurFade>

      {isDesktop && !prefersReducedMotion ? (
        <div className="mx-auto max-w-5xl">
          <div className="relative h-[360px]">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                ref={(el) => {
                  slideRefs.current[i] = el
                }}
                className="absolute inset-0"
              >
                <div className="mx-auto flex h-full w-full max-w-3xl items-center justify-center">
                  <div className="rounded-2xl border border-[#E8E8E8]/60 bg-white p-10 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                    <div className="w-12 h-12 rounded-2xl bg-[#F7F7F7] flex items-center justify-center mb-5 text-2xl">
                      {feature.icon}
                    </div>
                    <h3 className="font-sans text-2xl font-semibold text-[#0A0A0A] tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-3 max-w-xl font-sans text-[15px] leading-relaxed text-[#6B6B6B]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {features.map((feature, i) => (
            <BlurFade key={feature.title} delay={0.1 + i * 0.08} inView>
              <div className="rounded-2xl border border-[#E8E8E8]/60 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="w-12 h-12 rounded-2xl bg-[#F7F7F7] flex items-center justify-center mb-5 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="font-sans text-lg font-semibold text-[#0A0A0A] tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-3 font-sans text-[14px] leading-relaxed text-[#6B6B6B]">
                  {feature.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      )}
    </section>
  )
}
