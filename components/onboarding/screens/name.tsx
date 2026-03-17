"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useUserStore } from "@/stores/user-store"
import { LiquidButton } from "@/components/ui/liquid-glass-button"

interface NameScreenProps {
  onNext: () => void
}

export function NameScreen({ onNext }: NameScreenProps) {
  const [localName, setLocalName] = useState("")
  const setName = useUserStore((s) => s.setName)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timeout = setTimeout(() => inputRef.current?.focus(), 500)
    return () => clearTimeout(timeout)
  }, [])

  const handleContinue = () => {
    if (localName.trim().length >= 2) {
      setName(localName.trim())
      onNext()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleContinue()
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-8 md:px-16 max-w-lg mx-auto">
      <motion.h2
        className="font-display text-3xl md:text-4xl font-bold text-white mb-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Hi, I&apos;m VAULTED.
      </motion.h2>

      <motion.p
        className="text-xl text-white/60 mb-12"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        What should I call you?
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mb-12"
      >
        <input
          ref={inputRef}
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Your name"
          className="w-full bg-transparent border-0 border-b border-white/30 pb-3 text-lg text-white placeholder:text-white/30 outline-none focus:border-white transition-colors"
          autoComplete="given-name"
        />
      </motion.div>

      <AnimatePresence>
        {localName.trim().length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <LiquidButton size="xxl" onClick={handleContinue}>
              <span className="text-white font-semibold text-base">
                Continue
              </span>
            </LiquidButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
