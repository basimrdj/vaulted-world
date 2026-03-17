"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { LandingShaderBg } from "@/components/ui/landing-shader-bg"

export function FooterCta() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-24">
      <LandingShaderBg />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.h2
          className="font-display max-w-2xl text-3xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          Your desires deserve better than a camera roll.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Link
            href="/onboarding"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-white px-8 font-semibold text-[#0A0A0A] transition-opacity hover:opacity-90"
          >
            Get Started Free
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
