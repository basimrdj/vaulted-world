"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { MorphingText } from "@/components/ui/morphing-text"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { useMediaQuery } from "@/hooks/use-media-query"
import { MagneticButton } from "@/components/ui/magnetic-button"

const avatars = [
  { initials: "SM", bg: "#6B6B6B" },
  { initials: "JL", bg: "#9A9A9A" },
  { initials: "MC", bg: "#6B6B6B" },
  { initials: "DK", bg: "#9A9A9A" },
  { initials: "ER", bg: "#6B6B6B" },
]

const heroPhrases = [
  "Your desires, organized.",
  "Screenshot it. Save it. Track it.",
  "The AI desire engine.",
]

export function Hero() {
  const router = useRouter()
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] px-6">
      <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center pt-36">
        <div className="relative h-[244px] w-[182px] rounded-[28px] border border-white/20 bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.18),rgba(255,255,255,0.05)_42%,rgba(255,255,255,0.02)_75%,transparent)] opacity-30 shadow-[0_25px_80px_rgba(255,255,255,0.08)]">
          <div className="absolute inset-[15px] rounded-[22px] border border-white/14" />
          <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30" />
        </div>
      </div>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        <motion.h1
          id="hero-vaulted-title"
          className="font-panchang text-[48px] font-bold tracking-[0.18em] text-white md:text-[72px]"
          initial={{ opacity: 0, letterSpacing: "0.35em" }}
          animate={{ opacity: 1, letterSpacing: "0.18em" }}
          transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
        >
          VAULTED
        </motion.h1>

        <motion.div
          className="mt-7 h-16 w-full md:h-20"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
        >
          {prefersReducedMotion ? (
            <p className="font-sans text-[16px] tracking-[0.06em] text-white/80 md:text-[20px]">
              Your desires, organized.
            </p>
          ) : (
            <MorphingText
              id="hero-morphing-text"
              texts={heroPhrases}
              className="h-16 max-w-2xl text-[16px] font-medium tracking-[0.06em] text-white/85 md:h-20 md:text-[20px]"
            />
          )}
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
        >
          <MagneticButton disabled={!isDesktop}>
            <ShimmerButton
              type="button"
              onClick={() => router.push("/onboarding")}
              className="h-13 rounded-2xl px-10"
              shimmerColor="#ffffff"
              shimmerSize="0.08em"
              background="#0A0A0A"
            >
              <span className="font-panchang text-[13px] font-medium tracking-wide text-white">
                Open Your Vault
              </span>
            </ShimmerButton>
          </MagneticButton>
        </motion.div>

        <motion.div
          className="mt-14 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.78, ease: "easeOut" }}
        >
          <div className="flex -space-x-2">
            {avatars.map((avatar, i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0A0A0A] text-[10px] font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                style={{ backgroundColor: avatar.bg }}
              >
                {avatar.initials}
              </div>
            ))}
          </div>
          <p className="text-[11px] tracking-[0.12em] uppercase text-white/50 font-medium">
            Join 50,000+ smart shoppers
          </p>
        </motion.div>
      </div>
    </section>
  )
}
