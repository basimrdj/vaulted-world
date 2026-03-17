"use client"

import { useRouter } from "next/navigation"
import { LandingShaderBg } from "@/components/ui/landing-shader-bg"
import { BlurFade } from "@/components/ui/blur-fade"
import { Meteors } from "@/components/ui/meteors"
import { useMediaQuery } from "@/hooks/use-media-query"
import { TextAnimate } from "@/components/ui/text-animate"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { MagneticButton } from "@/components/ui/magnetic-button"

export function FooterCta() {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const router = useRouter()

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-32 text-white">
      <LandingShaderBg />
      {!prefersReducedMotion && <Meteors number={15} className="opacity-50" />}

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <BlurFade delay={0.1} inView>
          <h2 className="font-display max-w-2xl text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            <TextAnimate
              animation="blurInUp"
              by="word"
              className="text-white"
              segmentClassName="text-white"
            >
              Start organizing your desires.
            </TextAnimate>
          </h2>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p className="text-white/60 mt-5 text-base tracking-wide max-w-md">
            Join thousands who save smarter, not harder.
          </p>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <MagneticButton className="mt-10" disabled={!isDesktop}>
            <ShimmerButton
              type="button"
              onClick={() => router.push("/onboarding")}
              className="h-13 rounded-2xl px-10 text-[14px] font-semibold"
              shimmerColor="#ffffff"
              shimmerSize="0.08em"
              background="#FFFFFF"
            >
              <span className="text-[#0A0A0A]">Get Started Free</span>
            </ShimmerButton>
          </MagneticButton>
        </BlurFade>
      </div>
    </section>
  )
}
