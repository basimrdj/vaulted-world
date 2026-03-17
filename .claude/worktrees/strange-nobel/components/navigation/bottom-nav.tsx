"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, Plus, Bell, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/vault", icon: Home, label: "Vault" },
  { href: "/boards", icon: LayoutGrid, label: "Boards" },
  { href: "#", icon: Plus, label: "Add", isAdd: true },
  { href: "/alerts", icon: Bell, label: "Alerts" },
  { href: "/profile", icon: User, label: "Profile" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-xl border-t border-[#E8E8E8]">
      <div className="flex items-center justify-around h-full max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive =
            item.isAdd ? false : pathname === item.href || (item.href === "/vault" && pathname === "/")
          const Icon = item.icon

          if (item.isAdd) {
            return (
              <button
                key={item.label}
                type="button"
                className="flex flex-col items-center justify-center flex-1 gap-0.5 min-w-0"
                aria-label="Add item"
              >
                <div className="w-11 h-11 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center shadow-lg">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium text-[#9A9A9A] mt-0.5">
                  Add
                </span>
              </button>
            )
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 gap-0.5 min-w-0",
                isActive ? "text-[#0A0A0A]" : "text-[#9A9A9A]"
              )}
            >
              <div className="relative flex flex-col items-center">
                <Icon className="w-5 h-5" />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0A0A0A]" />
                )}
              </div>
              <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
