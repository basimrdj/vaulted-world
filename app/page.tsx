import { Features } from "@/components/landing/features"
import { PricingSection } from "@/components/landing/pricing-section"
import { FooterCta } from "@/components/landing/footer-cta"
import { VaultedWorldLanding } from "@/components/landing/vaulted-world-landing"

export default function Home() {
  return (
    <main className="relative">
      <div className="relative z-0">
        <VaultedWorldLanding />
        <Features />
        <PricingSection />
        <FooterCta />
      </div>
    </main>
  )
}
