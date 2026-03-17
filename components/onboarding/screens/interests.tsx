"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useUserStore } from "@/stores/user-store"
import { INTERESTS } from "@/lib/mock-data"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { cn } from "@/lib/utils"

interface InterestsScreenProps {
  onNext: () => void
}

export function InterestsScreen({ onNext }: InterestsScreenProps) {
  const name = useUserStore((s) => s.name)
  const interests = useUserStore((s) => s.interests)
  const toggleInterest = useUserStore((s) => s.toggleInterest)

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 md:px-12 max-w-md mx-auto">
      <motion.h2
        className="font-display text-2xl md:text-3xl font-bold text-white mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        What catches your eye, {name}?
      </motion.h2>

      <motion.p
        className="text-base text-white/40 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Pick 2 or more
      </motion.p>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {INTERESTS.map((interest, i) => {
          const isSelected = interests.includes(interest.id)
          return (
            <motion.button
              key={interest.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i, type: "spring", stiffness: 300 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleInterest(interest.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 py-4 px-2 rounded-xl transition-all duration-200",
                isSelected
                  ? "bg-white/10 border-2 border-white scale-[1.02]"
                  : "bg-white/[0.04] border-2 border-white/[0.08] hover:bg-white/[0.06]"
              )}
            >
              <span className="text-2xl">{interest.emoji}</span>
              <span
                className={cn(
                  "text-xs font-medium",
                  isSelected ? "text-white" : "text-white/80"
                )}
              >
                {interest.label}
              </span>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {interests.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="flex justify-center"
          >
            <LiquidButton size="xxl" onClick={onNext}>
              <span className="text-white font-semibold text-base">
                Continue
              </span>
            </LiquidButton>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="mt-4 text-sm text-white/40 hover:text-white/60 transition-colors self-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={onNext}
      >
        Skip →
      </motion.button>
    </div>
  )
}
