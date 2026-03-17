"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { LandingShaderBg } from "@/components/ui/landing-shader-bg"
import { LiquidButton } from "@/components/ui/liquid-glass-button"

const avatars = [
  { initials: "SM", bg: "#6B6B6B" },
  { initials: "JL", bg: "#9A9A9A" },
  { initials: "MC", bg: "#6B6B6B" },
  { initials: "DK", bg: "#9A9A9A" },
  { initials: "ER", bg: "#6B6B6B" },
]

export function Hero() {
  const router = useRouter()

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] px-6">
      <LandingShaderBg />

      <div className="relative z-10 flex flex-col items-center text-center mix-blend-difference">
        <motion.h1
          id="hero-vaulted-title"
          className="font-display text-[56px] font-black tracking-[0.15em] text-white md:text-[72px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          VAULTED
        </motion.h1>

        <motion.p
          className="font-stardom mt-5 text-base tracking-wide text-white md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          Your desires, organized.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        >
          <LiquidButton
            size="hero"
            onClick={() => router.push("/onboarding")}
          >
            <span className="font-panchang text-[13px] font-medium tracking-wide text-white">
              Start Free — No Credit Card
            </span>
          </LiquidButton>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        >
          <p className="font-stardom text-xs tracking-wider text-white/60">
            Join 50,000+ smart shoppers
          </p>
          <div className="flex -space-x-2.5">
            {avatars.map((avatar, i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-[#0A0A0A] text-[10px] font-medium text-white"
                style={{ backgroundColor: avatar.bg }}
              >
                {avatar.initials}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
