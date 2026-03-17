"use client"

import { useRef } from "react"
import { BlurFade } from "@/components/ui/blur-fade"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SplitHeadline } from "@/components/ui/split-headline"
import { AiPointCloud } from "@/components/landing/ai-point-cloud"

const steps = [
  {
    number: "01",
    title: "Screenshot",
    description:
      "See something you love? Screenshot it. From TikTok, Instagram, Safari - anywhere.",
  },
  {
    number: "02",
    title: "AI Finds It",
    description:
      "Our AI identifies the product, finds it across retailers, and pulls in prices, reviews, and alternatives.",
  },
  {
    number: "03",
    title: "Track & Save",
    description:
      "Save to your vault. Track prices. Get alerts when it drops. Never miss a deal.",
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sourceARef = useRef<HTMLDivElement>(null)
  const sourceBRef = useRef<HTMLDivElement>(null)
  const aiRef = useRef<HTMLDivElement>(null)
  const outputARef = useRef<HTMLDivElement>(null)
  const outputBRef = useRef<HTMLDivElement>(null)

  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  return (
    <section className="px-6 py-28 bg-[#FAFAFA]">
      <BlurFade delay={0.1} inView>
        <div className="text-center mb-16">
          <SplitHeadline
            text="How it works"
            className="font-display text-4xl md:text-5xl font-bold text-[#0A0A0A] tracking-tight"
          />
          <p className="text-[#9A9A9A] mt-4 text-base tracking-wide">
            Three steps to never overpay again.
          </p>
        </div>
      </BlurFade>

      {isDesktop && !prefersReducedMotion && (
        <BlurFade delay={0.15} inView>
          <div
            ref={containerRef}
            className="relative mx-auto mb-14 flex max-w-4xl items-center justify-between overflow-hidden rounded-3xl border border-[#E8E8E8] bg-white p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
          >
            <AiPointCloud />

            <div className="relative z-10 space-y-4">
              <div
                ref={sourceARef}
                className="flex h-14 w-40 items-center justify-center rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] text-[12px] font-semibold uppercase tracking-wider text-[#4A4A4A]"
              >
                Screenshot A
              </div>
              <div
                ref={sourceBRef}
                className="flex h-14 w-40 items-center justify-center rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] text-[12px] font-semibold uppercase tracking-wider text-[#4A4A4A]"
              >
                Screenshot B
              </div>
            </div>

            <div
              ref={aiRef}
              className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0A0A0A] text-[11px] font-bold uppercase tracking-wider text-white"
            >
              AI
            </div>

            <div className="relative z-10 space-y-4">
              <div
                ref={outputARef}
                className="flex h-14 w-40 items-center justify-center rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] text-[12px] font-semibold uppercase tracking-wider text-[#4A4A4A]"
              >
                Vault Item
              </div>
              <div
                ref={outputBRef}
                className="flex h-14 w-40 items-center justify-center rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] text-[12px] font-semibold uppercase tracking-wider text-[#4A4A4A]"
              >
                Price Track
              </div>
            </div>

            <AnimatedBeam
              containerRef={containerRef}
              fromRef={sourceARef}
              toRef={aiRef}
              pathColor="#D0D0D0"
              gradientStartColor="#FFFFFF"
              gradientStopColor="#6B6B6B"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={sourceBRef}
              toRef={aiRef}
              pathColor="#D0D0D0"
              gradientStartColor="#FFFFFF"
              gradientStopColor="#6B6B6B"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={aiRef}
              toRef={outputARef}
              pathColor="#D0D0D0"
              gradientStartColor="#FFFFFF"
              gradientStopColor="#6B6B6B"
              reverse
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={aiRef}
              toRef={outputBRef}
              pathColor="#D0D0D0"
              gradientStartColor="#FFFFFF"
              gradientStopColor="#6B6B6B"
              reverse
            />
          </div>
        </BlurFade>
      )}

      <div className="mx-auto max-w-4xl">
        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative flex items-start justify-between">
            <div className="absolute left-[16.67%] right-[16.67%] top-5 h-px bg-[#E0E0E0]" />

            {steps.map((step, i) => (
              <BlurFade
                key={step.number}
                delay={0.1 + i * 0.08}
                inView
                className="relative z-10 flex w-1/3 flex-col items-center px-6"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] flex items-center justify-center mb-5">
                  <span className="font-mono text-[13px] font-bold text-white">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#0A0A0A] tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-center text-[14px] leading-relaxed text-[#6B6B6B]">
                  {step.description}
                </p>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden">
          <div className="space-y-8">
            {steps.map((step, i) => (
              <BlurFade
                key={step.number}
                delay={0.1 + i * 0.08}
                inView
                direction="right"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] flex items-center justify-center shrink-0">
                    <span className="font-mono text-[13px] font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0A0A0A] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-[#6B6B6B]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
