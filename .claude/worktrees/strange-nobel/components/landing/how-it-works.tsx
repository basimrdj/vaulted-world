"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Screenshot",
    description:
      "See something you love? Screenshot it. From TikTok, Instagram, Safari — anywhere.",
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
  return (
    <section className="px-6 py-24">
      <motion.h2
        className="font-display mb-16 text-center text-3xl font-bold text-[#0A0A0A]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        How it works
      </motion.h2>

      <div className="mx-auto max-w-4xl">
        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative flex items-start justify-between">
            {/* Horizontal line */}
            <div className="absolute left-0 right-0 top-6 h-px bg-[#E8E8E8]" />

            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative z-10 flex w-1/3 flex-col items-center px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <span className="font-mono text-sm text-[#9A9A9A]">
                  {step.number}
                </span>
                <div className="mt-2 h-3 w-3 rounded-full bg-[#0A0A0A]" />
                <h3 className="mt-6 text-lg font-semibold text-[#0A0A0A]">
                  {step.title}
                </h3>
                <p className="mt-2 text-center text-base text-[#6B6B6B]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden">
          <div className="relative pl-6">
            {/* Vertical line */}
            <div className="absolute left-[5px] top-0 bottom-0 w-px bg-[#E8E8E8]" />

            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative pb-12 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute -left-6 top-0 flex items-center gap-2">
                  <span className="font-mono text-sm text-[#9A9A9A]">
                    {step.number}
                  </span>
                  <div className="h-3 w-3 rounded-full bg-[#0A0A0A]" />
                </div>
                <h3 className="mt-1 text-lg font-semibold text-[#0A0A0A]">
                  {step.title}
                </h3>
                <p className="mt-2 text-base text-[#6B6B6B]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
