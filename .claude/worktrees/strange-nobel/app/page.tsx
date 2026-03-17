import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Testimonials } from "@/components/landing/testimonials"
import { PricingSection } from "@/components/landing/pricing-section"
import { FooterCta } from "@/components/landing/footer-cta"
import { LandingIntroOverlay } from "@/components/landing/landing-intro-overlay"

export default function Home() {
  return (
    <main className="relative">
      <LandingIntroOverlay />
      <div className="relative z-0">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <PricingSection />
        <FooterCta />
      </div>
    </main>
  )
}
