"use client"

import { useState, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/stores/user-store"
import { WelcomeScreen } from "./screens/welcome"
import { NameScreen } from "./screens/name"
import { InterestsScreen } from "./screens/interests"
import { MagicScreen } from "./screens/magic"
import { NotificationsScreen } from "./screens/notifications"
import { OnboardingBackground } from "@/components/ui/onboarding-background"

const TOTAL_STEPS = 5

export function OnboardingFlow() {
  const [step, setStep] = useState(0)
  const router = useRouter()
  const completeOnboarding = useUserStore((s) => s.completeOnboarding)

  const next = useCallback(() => {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1)
    } else {
      completeOnboarding()
      router.push("/vault")
    }
  }, [step, completeOnboarding, router])

  const finish = useCallback(() => {
    completeOnboarding()
    router.push("/vault")
  }, [completeOnboarding, router])

  const screens = [
    <WelcomeScreen key="welcome" onNext={next} />,
    <NameScreen key="name" onNext={next} />,
    <InterestsScreen key="interests" onNext={next} />,
    <MagicScreen key="magic" onNext={next} />,
    <NotificationsScreen key="notifications" onNext={finish} onSkip={finish} />,
  ]

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <OnboardingBackground />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/10">
        <motion.div
          className="h-full bg-white/30"
          initial={{ width: "0%" }}
          animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 min-h-screen"
        >
          {screens[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
