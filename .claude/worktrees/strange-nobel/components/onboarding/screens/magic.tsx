"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useUserStore } from "@/stores/user-store"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { Camera, Link, Sparkles } from "lucide-react"

interface MagicScreenProps {
  onNext: () => void
}

const PROCESSING_STEPS = [
  "Analyzing image...",
  "Identifying products...",
  "Searching 50+ retailers...",
  "Found it! ✨",
]

const DEMO_RESULT = {
  name: "Oversized Linen Blazer",
  brand: "Zara",
  price: "$89.90",
  image:
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop",
  retailer: "zara.com",
}

export function MagicScreen({ onNext }: MagicScreenProps) {
  const name = useUserStore((s) => s.name)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleDemo = () => {
    setIsProcessing(true)
    setProcessingStep(0)

    const steps = PROCESSING_STEPS.length
    for (let i = 0; i < steps; i++) {
      setTimeout(() => {
        setProcessingStep(i)
        if (i === steps - 1) {
          setTimeout(() => {
            setIsProcessing(false)
            setShowResult(true)
          }, 600)
        }
      }, (i + 1) * 800)
    }
  }

  const handleSave = () => {
    onNext()
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 md:px-12 max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!isProcessing && !showResult && (
          <motion.div
            key="options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.h2
              className="font-display text-2xl md:text-3xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Let&apos;s vault your first item, {name}
            </motion.h2>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] transition-all"
              >
                <Camera className="w-7 h-7 text-white/80" />
                <span className="text-sm font-medium text-white/80">
                  Screenshot
                </span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] transition-all"
              >
                <Link className="w-7 h-7 text-white/80" />
                <span className="text-sm font-medium text-white/80">
                  Paste a Link
                </span>
              </motion.button>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleDemo}
              className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.08] transition-all"
            >
              <Sparkles className="w-5 h-5 text-white/80" />
              <div className="text-left">
                <p className="text-sm font-medium text-white/90">
                  Try a Demo
                </p>
                <p className="text-xs text-white/40">
                  See the AI in action
                </p>
              </div>
            </motion.button>

            <motion.button
              className="mt-6 text-sm text-white/40 hover:text-white/60 transition-colors self-end block ml-auto"
              onClick={onNext}
            >
              Skip →
            </motion.button>
          </motion.div>
        )}

        {isProcessing && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-8">
              <motion.div
                className="w-48 h-48 rounded-2xl overflow-hidden border border-white/20"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(154, 154, 154, 0)",
                    "0 0 20px 4px rgba(154, 154, 154, 0.3)",
                    "0 0 0 0 rgba(154, 154, 154, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <img
                  src={DEMO_RESULT.image}
                  alt="Demo product"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={processingStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-white/60"
              >
                {PROCESSING_STEPS[processingStep]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}

        {showResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="flex flex-col items-center"
          >
            <div className="w-full p-4 rounded-2xl bg-white/[0.06] border border-white/[0.12] mb-6">
              <div className="flex gap-4">
                <img
                  src={DEMO_RESULT.image}
                  alt={DEMO_RESULT.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-white font-semibold text-base">
                    {DEMO_RESULT.name}
                  </p>
                  <p className="text-white/50 text-sm">{DEMO_RESULT.brand}</p>
                  <p className="text-white font-mono text-lg mt-1">
                    {DEMO_RESULT.price}
                  </p>
                  <p className="text-white/30 text-xs">
                    {DEMO_RESULT.retailer}
                  </p>
                </div>
              </div>
            </div>

            <LiquidButton size="xxl" onClick={handleSave}>
              <span className="text-white font-semibold text-base">
                Save to Vault
              </span>
            </LiquidButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
