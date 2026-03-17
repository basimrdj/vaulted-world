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
    <aside className="fixed left-0 top-0 z-40 w-[220px] h-screen bg-white border-r border-[#E8E8E8] flex flex-col">
      <Link
        href="/vault"
        className="font-display font-bold text-lg tracking-[0.1em] px-6 py-6 text-[#0A0A0A]"
      >
        VAULTED
      </Link>

      <nav className="flex-1 px-0 py-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/vault" && (pathname === "/" || pathname === "/vault"))
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-6 py-2.5 text-sm font-medium rounded-lg mx-3 transition-colors",
                isActive
                  ? "bg-[#F7F7F7] text-[#0A0A0A]"
                  : "text-[#6B6B6B] hover:bg-[#F7F7F7]"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}

        <div className="my-2 mx-6 border-t border-[#E8E8E8]" />

        {bottomItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-6 py-2.5 text-sm font-medium rounded-lg mx-3 transition-colors",
                isActive
                  ? "bg-[#F7F7F7] text-[#0A0A0A]"
                  : "text-[#6B6B6B] hover:bg-[#F7F7F7]"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
