"use client"

import Link from "next/link"
import {
  Palette,
  Gift,
  Shield,
  Bell,
  Link2,
  Lock,
  Crown,
  HelpCircle,
  ChevronRight,
} from "lucide-react"
import { VaultBackground } from "@/components/ui/vault-background"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Sidebar } from "@/components/navigation/sidebar"
import { useMediaQuery } from "@/hooks/use-media-query"
import { MOCK_ITEMS, MOCK_BOARDS } from "@/lib/mock-data"
import { useUserStore } from "@/stores/user-store"
import { BlurFade } from "@/components/ui/blur-fade"
import { NumberTicker } from "@/components/ui/number-ticker"

function getSavedAmount() {
  return MOCK_ITEMS.reduce((sum, item) => {
    if (item.originalPrice && item.originalPrice > item.price) {
      return sum + (item.originalPrice - item.price)
    }
    return sum
  }, 0)
}

const SETTINGS_ITEMS = [
  { icon: Palette, label: "Style Profile", href: "/settings/style" },
  { icon: Gift, label: "Gift Profiles", href: "/settings/gifts" },
  { icon: Shield, label: "Budget Guardian", href: "/settings/budget" },
  { icon: Bell, label: "Notifications", href: "/settings/notifications" },
  { icon: Link2, label: "Connected Accounts", href: "/settings/accounts" },
  { icon: Lock, label: "Privacy", href: "/settings/privacy" },
  { icon: Crown, label: "Premium", href: "/premium" },
  { icon: HelpCircle, label: "Help & Support", href: "/help" },
]

export default function ProfilePage() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const shouldAnimate = isDesktop && !prefersReducedMotion
  const name = useUserStore((s) => s.name)
  const displayName = name || "Guest"
  const initial = displayName.charAt(0).toUpperCase()
  const savedAmount = getSavedAmount()

  return (
    <>
      <VaultBackground />
      {isDesktop && <Sidebar />}

      <main
        className={`min-h-screen pb-24 lg:pb-0 ${isDesktop ? "pl-[240px]" : ""}`}
      >
        <div className="max-w-2xl mx-auto px-5 py-8 lg:py-10">
          {/* Profile Header */}
          <BlurFade delay={0.1} inView disabled={!shouldAnimate}>
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-[88px] h-[88px] rounded-3xl bg-[#0A0A0A] flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                <span className="font-display font-bold text-[28px] text-white">
                  {initial}
                </span>
              </div>
              <h1 className="font-display font-bold text-[22px] text-[#0A0A0A] mt-5 tracking-tight">
                {displayName}
              </h1>
              <p className="text-[13px] text-[#9A9A9A] mt-1">
                {displayName}&apos;s Vault
              </p>
            </div>
          </BlurFade>

          {/* Stats */}
          <BlurFade delay={0.2} inView disabled={!shouldAnimate}>
            <div className="flex gap-3 mb-10">
              <div className="flex-1 bg-white rounded-2xl p-5 text-center border border-[#E8E8E8]/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <p className="font-mono font-bold text-2xl text-[#0A0A0A] tabular-nums">
                  {shouldAnimate ? <NumberTicker value={MOCK_ITEMS.length} /> : MOCK_ITEMS.length}
                </p>
                <p className="text-[11px] text-[#9A9A9A] mt-1.5 uppercase tracking-wider font-medium">Items</p>
              </div>
              <div className="flex-1 bg-white rounded-2xl p-5 text-center border border-[#E8E8E8]/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <p className="font-mono font-bold text-2xl text-[#0A0A0A] tabular-nums">
                  {shouldAnimate ? <NumberTicker value={MOCK_BOARDS.length} /> : MOCK_BOARDS.length}
                </p>
                <p className="text-[11px] text-[#9A9A9A] mt-1.5 uppercase tracking-wider font-medium">Boards</p>
              </div>
              <div className="flex-1 bg-white rounded-2xl p-5 text-center border border-[#E8E8E8]/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <p className="font-mono font-bold text-2xl text-[#0A0A0A] tabular-nums">
                  $
                  {shouldAnimate ? (
                    <NumberTicker value={Math.round(savedAmount)} />
                  ) : (
                    Math.round(savedAmount)
                  )}
                </p>
                <p className="text-[11px] text-[#9A9A9A] mt-1.5 uppercase tracking-wider font-medium">Saved</p>
              </div>
            </div>
          </BlurFade>

          {/* Settings */}
          <BlurFade delay={0.3} inView disabled={!shouldAnimate}>
            <div className="bg-white border border-[#E8E8E8]/60 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              {SETTINGS_ITEMS.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group/item flex items-center gap-3.5 px-5 py-4 text-[13px] text-[#0A0A0A] hover:bg-[#FAFAFA] transition-all duration-200 hover:translate-x-0.5 ${index < SETTINGS_ITEMS.length - 1 ? "border-b border-[#F0F0F0]" : ""}`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#F7F7F7] flex items-center justify-center shrink-0 transition-colors duration-200 group-hover/item:bg-[#F0F0F0]">
                      <Icon className="w-4 h-4 text-[#6B6B6B] transition-colors duration-200 group-hover/item:text-[#0A0A0A]" />
                    </div>
                    <span className="flex-1 font-medium">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#D0D0D0] shrink-0 transition-transform duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-[#9A9A9A]" />
                  </Link>
                )
              })}
            </div>
          </BlurFade>
        </div>
      </main>

      {!isDesktop && <BottomNav />}
    </>
  )
}
