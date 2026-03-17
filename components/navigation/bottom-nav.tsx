"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, Plus, Bell, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dock, DockIcon } from "@/components/ui/dock"

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
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-[env(safe-area-inset-bottom)]">
      <Dock
        direction="bottom"
        iconSize={40}
        iconMagnification={56}
        iconDistance={120}
        className="mx-auto mb-2 h-auto gap-3 rounded-2xl border-white/20 bg-white/60 px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
      >
        {navItems.map((item) => {
          const isActive =
            item.isAdd
              ? false
              : item.href === "/vault"
                ? pathname === "/" || pathname.startsWith("/vault")
                : pathname.startsWith(item.href)
          const Icon = item.icon

          if (item.isAdd) {
            return (
              <DockIcon key={item.label} className="relative">
                <button
                  type="button"
                  className="flex flex-col items-center justify-center"
                  aria-label="Add item"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A0A0A] text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-transform active:scale-95">
                    <Plus className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                </button>
              </DockIcon>
            )
          }

          return (
            <DockIcon key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center transition-colors duration-200",
                  isActive ? "text-[#0A0A0A]" : "text-[#B0B0B0]"
                )}
              >
                <Icon
                  className={cn(
                    "h-[22px] w-[22px]",
                    isActive && "stroke-[2.5]"
                  )}
                />
                <span
                  className={cn(
                    "mt-0.5 text-[9px] leading-tight transition-all",
                    isActive ? "font-semibold" : "font-medium"
                  )}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span className="mt-0.5 h-1 w-1 rounded-full bg-[#0A0A0A]" />
                )}
              </Link>
            </DockIcon>
          )
        })}
      </Dock>
    </div>
  )
}
