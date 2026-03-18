import { SmoothScrollProvider } from "@/app/providers/smooth-scroll-provider";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { VaultedWorldLanding } from "@/components/landing/vaulted-world-landing";
import { Features } from "@/components/landing/features";
import { PricingSection } from "@/components/landing/pricing-section";
import { FooterCta } from "@/components/landing/footer-cta";

export default function App() {
  return (
    <SmoothScrollProvider>
      <ScrollProgress className="h-[2px] bg-[#0A0A0A]" />
      <main className="relative font-sans antialiased">
        <div className="relative z-0">
          <VaultedWorldLanding />
          <Features />
          <PricingSection />
          <FooterCta />
        </div>
      </main>
    </SmoothScrollProvider>
  );
}
