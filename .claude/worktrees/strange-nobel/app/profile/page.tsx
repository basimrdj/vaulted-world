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
  const name = useUserStore((s) => s.name)
  const displayName = name || "Guest"
  const initial = displayName.charAt(0).toUpperCase()
  const savedAmount = getSavedAmount()

  return (
    <>
      <VaultBackground />
      {isDesktop && <Sidebar />}

      <main
        className={`min-h-screen pb-20 lg:pb-0 ${isDesktop ? "pl-[220px]" : ""}`}
      >
        <div className="max-w-2xl mx-auto px-4 py-6 lg:py-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-[#F0F0F0] flex items-center justify-center shrink-0">
              <span className="font-display font-bold text-2xl text-[#0A0A0A]">
                {initial}
              </span>
            </div>
            <h1 className="font-display font-bold text-xl text-[#0A0A0A] mt-4">
              {displayName}
            </h1>
            <p className="text-sm text-[#9A9A9A] mt-1">
              {displayName}&apos;s Vault
            </p>
          </div>

          <div className="flex gap-3 mb-8">
            <div className="flex-1 bg-[#F7F7F7] rounded-xl p-4 text-center">
              <p className="font-mono font-bold text-xl text-[#0A0A0A]">
                {MOCK_ITEMS.length}
              </p>
              <p className="text-xs text-[#9A9A9A] mt-1">Items</p>
            </div>
            <div className="flex-1 bg-[#F7F7F7] rounded-xl p-4 text-center">
              <p className="font-mono font-bold text-xl text-[#0A0A0A]">
                {MOCK_BOARDS.length}
              </p>
              <p className="text-xs text-[#9A9A9A] mt-1">Boards</p>
            </div>
            <div className="flex-1 bg-[#F7F7F7] rounded-xl p-4 text-center">
              <p className="font-mono font-bold text-xl text-[#0A0A0A]">
                ${Math.round(savedAmount)}
              </p>
              <p className="text-xs text-[#9A9A9A] mt-1">Saved</p>
            </div>
          </div>

          <div className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden">
            {SETTINGS_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 text-sm text-[#0A0A0A] border-b border-[#F0F0F0] last:border-b-0 hover:bg-[#F7F7F7] transition-colors`}
                >
                  <Icon className="w-4 h-4 text-[#6B6B6B] shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#9A9A9A] shrink-0" />
                </Link>
              )
            })}
          </div>
        </div>
      </main>

      {!isDesktop && <BottomNav />}
    </>
  )
}
