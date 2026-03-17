"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Crown, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { OnboardingBackground } from "@/components/ui/onboarding-background"
import { NeonGradientCard } from "@/components/ui/neon-gradient-card"
import { NumberTicker } from "@/components/ui/number-ticker"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { BlurFade } from "@/components/ui/blur-fade"
import { PRICING_PLANS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { PremiumCrystalWrapper } from "@/components/premium/premium-crystal-wrapper"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function PremiumPage() {
  const [isAnnual, setIsAnnual] = useState(true)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <div className="relative min-h-screen overflow-hidden">
      <OnboardingBackground />

      <div className="relative z-10 px-6 py-12 max-w-3xl mx-auto">
        <Link
          href="/vault"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Vault
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <PremiumCrystalWrapper />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-5 border border-white/10">
            <Crown className="w-7 h-7 text-white/70" />
          </div>
          <h1 className="font-panchang text-3xl md:text-[42px] font-bold text-white mb-4 tracking-tight leading-tight">
            <AnimatedShinyText
              shimmerWidth={200}
              className="text-white/90 dark:text-white/90 [--shiny-width:200px] dark:via-white/80"
            >
              Unlock the Full Vault
            </AnimatedShinyText>
          </h1>
          <p className="text-white/40 text-base tracking-wide">
            Everything you need. Nothing you don&apos;t.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span
            className={cn(
              "text-sm transition-colors",
              !isAnnual ? "text-white" : "text-white/40"
            )}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={cn(
              "relative w-12 h-6 rounded-full transition-colors",
              isAnnual ? "bg-white" : "bg-white/20"
            )}
          >
            <div
              className={cn(
                "absolute top-0.5 w-5 h-5 rounded-full transition-all",
                isAnnual
                  ? "left-[26px] bg-[#0A0A0A]"
                  : "left-0.5 bg-white"
              )}
            />
          </button>
          <span
            className={cn(
              "text-sm transition-colors",
              isAnnual ? "text-white" : "text-white/40"
            )}
          >
            Annual{" "}
            <span className="text-white/30 text-xs">(save 33%)</span>
          </span>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {PRICING_PLANS.map((plan, i) => {
            const priceValue = isAnnual
              ? plan.yearlyPrice / 12
              : plan.monthlyPrice
            const decimalPlaces = plan.monthlyPrice === 0 ? 0 : 2
            const isPopular = plan.popular

            const cardContent = (
              <>
                {isPopular && (
                  <div className="inline-block bg-white text-[#0A0A0A] text-[11px] font-bold px-3 py-1 rounded-lg mb-5 uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <h3 className="text-white font-semibold text-lg tracking-tight">
                  {plan.name}
                </h3>

                <div className="mt-4 mb-7">
                  <span className="font-mono text-[42px] font-bold text-white tabular-nums tracking-tight">
                    $<NumberTicker
                      value={priceValue}
                      decimalPlaces={decimalPlaces}
                      delay={0.3 + i * 0.15}
                      className="font-mono text-[42px] font-bold text-white tabular-nums tracking-tight"
                    />
                  </span>
                  <span className="text-white/35 text-sm ml-1">/month</span>
                  {isAnnual && plan.yearlyPrice > 0 && (
                    <p className="text-white/25 text-xs mt-1.5">
                      ${plan.yearlyPrice}/year billed annually
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fi) => (
                    <li
                      key={fi}
                      className="flex items-start gap-2.5 text-[13px] text-white/60"
                    >
                      <Check className={cn(
                        "w-4 h-4 mt-0.5 shrink-0",
                        isPopular ? "text-white/70" : "text-white/40"
                      )} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {isPopular ? (
                  <MagneticButton className="w-full" disabled={!isDesktop}>
                    <ShimmerButton
                      shimmerColor="#ffffff"
                      shimmerSize="0.05em"
                      background="rgba(255, 255, 255, 0.12)"
                      borderRadius="12px"
                      className="w-full h-12 text-sm font-semibold text-white"
                    >
                      Start Free Trial
                    </ShimmerButton>
                  </MagneticButton>
                ) : (
                  <button className="w-full h-12 rounded-xl border border-white/15 text-white text-sm font-semibold hover:bg-white/8 transition-all duration-200 cursor-pointer">
                    {plan.monthlyPrice === 0
                      ? "Current Plan"
                      : "Get Started"}
                  </button>
                )}
              </>
            )

            if (isPopular) {
              return (
                <BlurFade
                  key={plan.name}
                  delay={0.2 + i * 0.1}
                  inView
                  direction="up"
                >
                  <NeonGradientCard
                    neonColors={{
                      firstColor: "#FFFFFF",
                      secondColor: "#888888",
                    }}
                    borderSize={2}
                    borderRadius={24}
                    className="scale-[1.03]"
                    contentClassName="!bg-white/[0.12] !p-7 backdrop-blur-sm"
                  >
                    {cardContent}
                  </NeonGradientCard>
                </BlurFade>
              )
            }

            return (
              <BlurFade
                key={plan.name}
                delay={0.2 + i * 0.1}
                inView
                direction="up"
              >
                <div
                  className={cn(
                    "rounded-3xl p-7 transition-all backdrop-blur-sm h-full",
                    "bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06]"
                  )}
                >
                  {cardContent}
                </div>
              </BlurFade>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-white/30 text-sm mt-8"
        >
          7 days free. Cancel anytime. No questions asked.
        </motion.p>
      </div>
    </div>
  )
}
