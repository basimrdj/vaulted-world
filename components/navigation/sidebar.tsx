"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  LayoutGrid,
  Bell,
  Gift,
  Sparkles,
  Settings,
  Crown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ShineBorder } from "@/components/ui/shine-border"

const navItems = [
  { href: "/vault", icon: Home, label: "Vault" },
  { href: "/boards", icon: LayoutGrid, label: "Boards" },
  { href: "/alerts", icon: Bell, label: "Alerts" },
  { href: "/gifts", icon: Gift, label: "Gifts" },
  { href: "/style", icon: Sparkles, label: "Style" },
]

const bottomItems = [
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/premium", icon: Crown, label: "Premium" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 w-[240px] h-screen bg-white/80 backdrop-blur-xl border-r border-[#E8E8E8]/60 flex flex-col">
      <Link
        href="/vault"
        className="font-panchang font-semibold text-[15px] tracking-[0.18em] px-7 pt-8 pb-6 text-[#0A0A0A] block"
      >
        VAULTED
      </Link>

      <nav className="flex-1 px-3 py-1 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            item.href === "/vault"
              ? pathname === "/" || pathname.startsWith("/vault")
              : pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium rounded-xl transition-all duration-200",
                isActive
                  ? "bg-[#0A0A0A] text-white shadow-sm"
                  : "text-[#6B6B6B] hover:bg-[#F0F0F0] hover:text-[#0A0A0A]"
              )}
            >
              <Icon className={cn("w-[18px] h-[18px] shrink-0", isActive && "text-white")} />
              {item.label}
              {isActive && <ShineBorder shineColor={["#ffffff", "#9A9A9A"]} borderWidth={1} className="rounded-xl" />}
            </Link>
          )
        })}

        <div className="!my-4 mx-3 border-t border-[#E8E8E8]/60" />

        {bottomItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium rounded-xl transition-all duration-200",
                isActive
                  ? "bg-[#0A0A0A] text-white shadow-sm"
                  : "text-[#6B6B6B] hover:bg-[#F0F0F0] hover:text-[#0A0A0A]",
                item.href === "/premium" && !isActive && "text-[#0A0A0A]"
              )}
            >
              <Icon className={cn(
                "w-[18px] h-[18px] shrink-0",
                item.href === "/premium" && !isActive && "text-[#0A0A0A]"
              )} />
              {item.label}
              {item.href === "/premium" && !isActive && (
                <span className="ml-auto text-[10px] font-semibold tracking-wider uppercase bg-[#F0F0F0] text-[#6B6B6B] px-1.5 py-0.5 rounded-md">
                  Pro
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
