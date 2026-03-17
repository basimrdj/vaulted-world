"use client"

import { cn } from "@/lib/utils"
import { PRICING_PLANS } from "@/lib/mock-data"
import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section className="px-6 py-24">
      <motion.h2
        className="font-display mb-12 text-center text-4xl font-bold text-[#0A0A0A]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        Simple, transparent pricing
      </motion.h2>

      {/* Billing toggle */}
      <motion.div
        className="mb-16 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="inline-flex rounded-full bg-[#F7F7F7] p-1">
          <button
            type="button"
            onClick={() => setIsAnnual(false)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
              !isAnnual ? "bg-white text-[#0A0A0A] shadow-sm" : "text-[#6B6B6B]"
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setIsAnnual(true)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
              isAnnual ? "bg-white text-[#0A0A0A] shadow-sm" : "text-[#6B6B6B]"
            )}
          >
            Annual
          </button>
        </div>
      </motion.div>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {PRICING_PLANS.map((plan, i) => {
          const price =
            isAnnual && plan.yearlyPrice > 0
              ? (plan.yearlyPrice / 12).toFixed(2)
              : plan.monthlyPrice.toFixed(2)
          const isPremium = plan.popular

          return (
            <motion.div
              key={plan.name}
              className={cn(
                "flex flex-col rounded-xl border bg-white p-8",
                isPremium
                  ? "border-2 border-[#0A0A0A]"
                  : "border-[#E8E8E8]"
              )}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {isPremium && (
                <span className="mb-4 inline-flex w-fit rounded-full bg-[#0A0A0A] px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </span>
              )}

              <h3 className="font-sans text-lg font-semibold text-[#0A0A0A]">
                {plan.name}
              </h3>

              <div className="mt-4 font-mono text-3xl font-medium text-[#0A0A0A]">
                ${price}
                <span className="text-base font-normal text-[#6B6B6B]">
                  /mo
                </span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-[#0A0A0A]"
                  >
                    <span className="text-[#0A0A0A]">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={isPremium ? "/onboarding" : "/onboarding"}
                className={cn(
                  "mt-8 flex h-11 w-full items-center justify-center rounded-md font-semibold transition-opacity hover:opacity-90",
                  isPremium
                    ? "bg-[#0A0A0A] text-white"
                    : "border border-[#E8E8E8] bg-white text-[#0A0A0A]"
                )}
              >
                Get Started
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
