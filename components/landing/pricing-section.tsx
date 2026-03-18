import { cn } from "@/lib/utils"
import { PRICING_PLANS } from "@/lib/mock-data"
import { useRef, useState } from "react"
import { BlurFade } from "@/components/ui/blur-fade"
import { NumberTicker } from "@/components/ui/number-ticker"
import { MagicCard } from "@/components/ui/magic-card"
import { Confetti } from "@/components/ui/confetti"
import type { ConfettiRef } from "@/components/ui/confetti"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import { RippleButton } from "@/components/ui/ripple-button"
import { PulsatingButton } from "@/components/ui/pulsating-button"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { useMediaQuery } from "@/hooks/use-media-query"

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)
  const confettiRef = useRef<ConfettiRef>(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const handlePremiumSelect = () => {
    confettiRef.current?.fire({
      particleCount: 120,
      spread: 80,
      startVelocity: 30,
      ticks: 220,
      colors: ["#0A0A0A", "#6B6B6B", "#9A9A9A", "#FFFFFF"],
      origin: { x: 0.5, y: 0.55 },
    })
  }

  return (
    <section className="relative px-6 py-28 bg-[#FAFAFA]">
      <Confetti
        ref={confettiRef}
        manualstart
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      />
      <BlurFade delay={0.1} inView>
        <div className="text-center mb-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A0A0A] tracking-tight">
            <AnimatedShinyText className="inline-block text-[#0A0A0A] [--shiny-width:140px]">
              Unlock the Full Vault
            </AnimatedShinyText>
          </h2>
          <p className="text-[#9A9A9A] mt-4 text-base tracking-wide">
            Start free. Upgrade when you&apos;re ready.
          </p>
        </div>
      </BlurFade>

      <BlurFade delay={0.2} inView>
        <div className="mb-14 flex justify-center">
        <div className="inline-flex rounded-full bg-white p-1 border border-[#E8E8E8]/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <RippleButton
            type="button"
            onClick={() => setIsAnnual(false)}
            rippleColor="#E8E8E8"
            duration="500ms"
            className={cn(
              "rounded-full border-0 px-5 py-2 text-[13px] font-medium transition-all duration-200",
              !isAnnual ? "bg-[#0A0A0A] text-white shadow-sm" : "text-[#6B6B6B] hover:text-[#0A0A0A]"
            )}
          >
            Monthly
          </RippleButton>
          <RippleButton
            type="button"
            onClick={() => setIsAnnual(true)}
            rippleColor="#E8E8E8"
            duration="500ms"
            className={cn(
              "rounded-full border-0 px-5 py-2 text-[13px] font-medium transition-all duration-200",
              isAnnual ? "bg-[#0A0A0A] text-white shadow-sm" : "text-[#6B6B6B] hover:text-[#0A0A0A]"
            )}
          >
            Annual
          </RippleButton>
        </div>
        </div>
      </BlurFade>

      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
        {PRICING_PLANS.map((plan, i) => {
          const price =
            isAnnual && plan.yearlyPrice > 0
              ? (plan.yearlyPrice / 12).toFixed(2)
              : plan.monthlyPrice.toFixed(2)
          const priceNum = parseFloat(price)
          const isPremium = plan.popular

          return (
            <BlurFade key={plan.name} delay={0.2 + i * 0.1} inView>
              <MagicCard
                className={cn(
                  "flex flex-col rounded-2xl bg-white p-8 transition-all duration-300 h-full",
                  isPremium
                    ? "border-2 border-[#0A0A0A] shadow-[0_8px_24px_rgba(0,0,0,0.08)] scale-[1.02]"
                    : "border border-[#E8E8E8]/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                )}
                gradientColor="rgba(0,0,0,0.03)"
              >
                {isPremium && (
                  <span className="mb-5 inline-flex w-fit rounded-lg bg-[#0A0A0A] px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <h3 className="text-lg font-semibold text-[#0A0A0A] tracking-tight">
                  {plan.name}
                </h3>

                <div className="mt-4 flex items-baseline">
                  <span className="font-mono text-[36px] font-bold text-[#0A0A0A] tabular-nums tracking-tight">
                    ${priceNum > 0 ? <NumberTicker value={priceNum} decimalPlaces={2} /> : "0.00"}
                  </span>
                  <span className="text-[13px] text-[#9A9A9A] ml-1">
                    /mo
                  </span>
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-[13px] text-[#4A4A4A]"
                    >
                      <span className="text-[#0A0A0A] font-medium mt-px">&#10003;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {isPremium ? (
                  <MagneticButton
                    className="mt-8 w-full"
                    disabled={!isDesktop}
                  >
                    <PulsatingButton
                      type="button"
                      onClick={handlePremiumSelect}
                      className="w-full h-12"
                      pulseColor="rgba(255,255,255,0.25)"
                    >
                      <span className="text-[13px] font-semibold text-white">Get Started</span>
                    </PulsatingButton>
                  </MagneticButton>
                ) : (
                  <button
                    type="button"
                    className="mt-8 flex h-12 w-full items-center justify-center rounded-xl font-semibold text-[13px] transition-all duration-200 border border-[#E8E8E8] bg-white text-[#0A0A0A] hover:bg-[#F7F7F7]"
                  >
                    Get Started
                  </button>
                )}
              </MagicCard>
            </BlurFade>
          )
        })}
      </div>
    </section>
  )
}
