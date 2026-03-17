"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useUserStore } from "@/stores/user-store"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { Confetti } from "@/components/ui/confetti"
import type { ConfettiRef } from "@/components/ui/confetti"
import { useMediaQuery } from "@/hooks/use-media-query"

interface NotificationsScreenProps {
  onNext: () => void
  onSkip: () => void
}

const MOCK_NOTIFICATIONS = [
  {
    emoji: "📸",
    app: "VAULTED",
    title: "Nike Air Max 90 just dropped to $89",
    subtitle: "That's 26% off! 🔥",
    time: "2 minutes ago",
    opacity: 1,
  },
  {
    emoji: "💰",
    app: "VAULTED",
    title: "3 items in your vault are on sale",
    subtitle: "Don't miss out — ends tonight",
    time: "15 minutes ago",
    opacity: 0.6,
  },
]

export function NotificationsScreen({
  onNext,
  onSkip,
}: NotificationsScreenProps) {
  const confettiRef = useRef<ConfettiRef>(null)
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const name = useUserStore((s) => s.name)
  const enableNotifications = useUserStore((s) => s.enableNotifications)

  const fireAndContinue = (nextAction: () => void) => {
    if (!prefersReducedMotion) {
      confettiRef.current?.fire({
        particleCount: 110,
        spread: 85,
        startVelocity: 30,
        ticks: 220,
        colors: ["#0A0A0A", "#6B6B6B", "#9A9A9A", "#FFFFFF"],
        origin: { x: 0.5, y: 0.4 },
      })
    }

    window.setTimeout(() => {
      nextAction()
    }, 180)
  }

  const handleEnable = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        enableNotifications()
      }
    }
    fireAndContinue(onNext)
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-center px-6 md:px-12 max-w-md mx-auto">
      {!prefersReducedMotion && (
        <Confetti
          ref={confettiRef}
          manualstart
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      )}
      <motion.h2
        className="font-display text-2xl md:text-3xl font-bold text-white mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Never miss a deal,
        <br />
        {name}.
      </motion.h2>

      <div className="space-y-3 mb-10">
        {MOCK_NOTIFICATIONS.map((notif, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: notif.opacity, x: 0 }}
            transition={{ delay: 0.5 + i * 0.3, type: "spring", damping: 20 }}
            className="p-4 rounded-2xl bg-white/[0.06] border border-white/[0.08]"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-lg shrink-0">
                {notif.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/40 font-medium mb-0.5">
                  {notif.app}
                </p>
                <p className="text-sm text-white/90 font-medium">
                  {notif.title}
                </p>
                <p className="text-xs text-white/50 mt-0.5">
                  {notif.subtitle}
                </p>
                <p className="text-xs text-white/30 mt-1">{notif.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 25 }}
        className="flex flex-col items-center gap-4"
      >
        <LiquidButton size="xxl" onClick={handleEnable}>
          <span className="text-white font-semibold text-base">
            Turn On Notifications
          </span>
        </LiquidButton>

        <button
          onClick={() => {
            fireAndContinue(onSkip)
          }}
          className="text-sm text-white/40 hover:text-white/60 transition-colors"
        >
          Maybe later
        </button>
      </motion.div>
    </div>
  )
}
