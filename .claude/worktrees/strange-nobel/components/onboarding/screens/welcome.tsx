"use client"

import { motion } from "framer-motion"
import { GooeyText } from "@/components/ui/gooey-text-morphing"
import { LiquidButton } from "@/components/ui/liquid-glass-button"

interface WelcomeScreenProps {
  onNext: () => void
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <motion.h1
        className="font-display text-5xl md:text-6xl font-black text-white tracking-[0.15em] mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        VAULTED
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="h-16 mb-12"
      >
        <GooeyText
          texts={["Screenshot it.", "Organize it.", "Track it.", "Own it."]}
          morphTime={1.5}
          cooldownTime={0.5}
          className="h-16"
          textClassName="text-xl md:text-2xl font-light text-white/60"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.2,
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
      >
        <LiquidButton size="xxl" onClick={onNext}>
          <span className="text-white font-semibold text-base">
            Get Started
          </span>
        </LiquidButton>
      </motion.div>

      <motion.p
        className="mt-6 text-sm text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Already have an account?{" "}
        <button className="underline hover:text-white/60 transition-colors">
          Sign in
        </button>
      </motion.p>
    </div>
  )
}
