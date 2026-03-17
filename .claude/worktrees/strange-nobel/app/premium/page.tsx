"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Crown, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { MetalButton } from "@/components/ui/liquid-glass-button"
import { OnboardingBackground } from "@/components/ui/onboarding-background"
import { PRICING_PLANS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function PremiumPage() {
  const [isAnnual, setIsAnnual] = useState(true)

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
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Crown className="w-10 h-10 text-white/60 mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            Unlock the Full Vault
          </h1>
          <p className="text-white/50 text-lg">
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
        <div className="grid md:grid-cols-3 gap-4">
          {PRICING_PLANS.map((plan, i) => {
            const monthlyDisplay = isAnnual
              ? (plan.yearlyPrice / 12).toFixed(2)
              : plan.monthlyPrice.toFixed(2)
            const isPopular = plan.popular

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={cn(
                  "rounded-2xl p-6 transition-all",
                  isPopular
                    ? "bg-white/10 border-2 border-white ring-1 ring-white/20 scale-[1.02]"
                    : "bg-white/[0.04] border border-white/[0.08]"
                )}
              >
                {isPopular && (
                  <div className="inline-block bg-white text-[#0A0A0A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </div>
                )}

                <h3 className="text-white font-semibold text-lg">
                  {plan.name}
                </h3>

                <div className="mt-3 mb-6">
                  <span className="font-mono text-4xl font-bold text-white">
                    ${monthlyDisplay}
                  </span>
                  <span className="text-white/40 text-sm ml-1">/month</span>
                  {isAnnual && plan.yearlyPrice > 0 && (
                    <p className="text-white/30 text-xs mt-1">
                      ${plan.yearlyPrice}/year billed annually
                    </p>
                  )}
                </div>

                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((feature, fi) => (
                    <li
                      key={fi}
                      className="flex items-start gap-2 text-sm text-white/70"
                    >
                      <Check className="w-4 h-4 text-white/50 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {isPopular ? (
                  <MetalButton variant="bronze" className="w-full">
                    Start Free Trial
                  </MetalButton>
                ) : (
                  <button className="w-full h-11 rounded-md border border-white/20 text-white text-sm font-semibold hover:bg-white/5 transition-colors">
                    {plan.monthlyPrice === 0
                      ? "Current Plan"
                      : "Get Started"}
                  </button>
                )}
              </motion.div>
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
