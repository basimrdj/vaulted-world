"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { VaultBackground } from "@/components/ui/vault-background"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Sidebar } from "@/components/navigation/sidebar"
import { ItemCard } from "@/components/vault/item-card"
import { useMediaQuery } from "@/hooks/use-media-query"
import { MOCK_ITEMS } from "@/lib/mock-data"
import { useUserStore } from "@/stores/user-store"
import { cn } from "@/lib/utils"
import { BlurFade } from "@/components/ui/blur-fade"
import { TextAnimate } from "@/components/ui/text-animate"
import { RippleButton } from "@/components/ui/ripple-button"
import { EmptyVault3DWrapper } from "@/components/vault/empty-vault-3d-wrapper"
import { VelocityGrid } from "@/components/ui/velocity-grid"
import { useHydrated } from "@/hooks/use-hydrated"

const FILTER_CATEGORIES = ["All", "Fashion", "Home", "Tech", "Beauty", "Travel"]

function getGreeting(date: Date) {
  const hour = date.getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

export default function VaultPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const shouldAnimate = isDesktop && !prefersReducedMotion
  const name = useUserStore((s) => s.name)
  const hydrated = useHydrated()
  const now = useMemo(() => (hydrated ? new Date() : null), [hydrated])

  const greetingLabel = useMemo(
    () => (now ? getGreeting(now) : "Welcome"),
    [now]
  )
  const dateLabel = useMemo(
    () => (now ? formatDate(now) : " "),
    [now]
  )

  const filteredItems = MOCK_ITEMS.filter((item) => {
    const matchesCategory =
      activeFilter === "All" || item.category === activeFilter
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <VaultBackground />
      {isDesktop && <Sidebar />}

      <main
        className={cn(
          "min-h-screen pb-24 lg:pb-0",
          isDesktop && "pl-[240px]"
        )}
      >
        <div className="max-w-6xl mx-auto px-5 py-8 lg:py-10">
          {/* Header */}
          <BlurFade delay={0.1} inView disabled={!shouldAnimate}>
            <div className="flex items-end justify-between">
              <div>
                <h1 className="font-display font-bold text-[28px] tracking-tight text-[#0A0A0A]">
                  {shouldAnimate ? (
                    <TextAnimate animation="blurIn" by="word" delay={0.1}>
                      {`${greetingLabel}${name ? `, ${name}` : ""}`}
                    </TextAnimate>
                  ) : (
                    `${greetingLabel}${name ? `, ${name}` : ""}`
                  )}
                </h1>
                <p className="text-[13px] text-[#9A9A9A] mt-1.5 tracking-wide">
                  {dateLabel}
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-2 text-[13px] text-[#9A9A9A]">
                <span className="font-mono tabular-nums">{filteredItems.length}</span>
                <span>items</span>
              </div>
            </div>
          </BlurFade>

          {/* Search */}
          <div className="mt-6 relative group">
            <div className="flex items-center gap-3 px-4 h-12 bg-white rounded-2xl border border-[#E8E8E8]/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 focus-within:shadow-[0_2px_8px_rgba(0,0,0,0.08)] focus-within:border-[#D0D0D0]">
              <Search className="w-4 h-4 text-[#B0B0B0] shrink-0" />
              <input
                type="search"
                placeholder="Search your vault..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-[#0A0A0A] placeholder:text-[#B0B0B0] outline-none"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mt-5 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {FILTER_CATEGORIES.map((category) => (
              <RippleButton
                key={category}
                onClick={() => setActiveFilter(category)}
                rippleColor="#E8E8E8"
                duration="500ms"
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium cursor-pointer transition-all duration-200",
                  activeFilter === category
                    ? "bg-[#0A0A0A] text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                    : "bg-white text-[#6B6B6B] border border-[#E8E8E8] hover:border-[#D0D0D0] hover:text-[#0A0A0A]"
                )}
              >
                {category}
              </RippleButton>
            ))}
          </div>

          {/* Grid */}
          <VelocityGrid>
            <div className="mt-8 columns-2 gap-4 md:columns-3 lg:columns-4">
              {filteredItems.map((item, i) => (
                <BlurFade
                  key={item.id}
                  delay={0.05 + i * 0.05}
                  inView
                  disabled={!shouldAnimate}
                >
                  <div className="mb-4 break-inside-avoid">
                    <ItemCard item={item} />
                  </div>
                </BlurFade>
              ))}
            </div>
          </VelocityGrid>

          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <EmptyVault3DWrapper />
              <p className="text-[#9A9A9A] text-sm mt-3">No items found</p>
              <p className="text-[#B0B0B0] text-xs mt-1">Try a different search or filter</p>
            </div>
          )}
        </div>
      </main>

      {!isDesktop && <BottomNav />}
    </>
  )
}
