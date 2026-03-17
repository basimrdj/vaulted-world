"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { VaultBackground } from "@/components/ui/vault-background"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Sidebar } from "@/components/navigation/sidebar"
import { ItemCard } from "@/components/vault/item-card"
import { useMediaQuery } from "@/hooks/use-media-query"
import { MOCK_ITEMS } from "@/lib/mock-data"
import { useUserStore } from "@/stores/user-store"
import { cn } from "@/lib/utils"

const FILTER_CATEGORIES = ["All", "Fashion", "Home", "Tech", "Beauty", "Travel"]

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

export default function VaultPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const name = useUserStore((s) => s.name)

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
          "min-h-screen pb-20 lg:pb-0",
          isDesktop && "pl-[220px]"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 py-6 lg:py-8">
          <h1 className="font-display font-bold text-2xl text-[#0A0A0A]">
            {getGreeting()},{name ? ` ${name}` : ""}
          </h1>
          <p className="text-sm text-[#9A9A9A] mt-1">{formatDate()}</p>

          <div className="mt-4 flex items-center gap-2 px-4 h-11 bg-[#F7F7F7] rounded-xl border border-[#E8E8E8]">
            <Search className="w-4 h-4 text-[#9A9A9A] shrink-0" />
            <input
              type="search"
              placeholder="Search your vault..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-[#0A0A0A] placeholder:text-[#9A9A9A] outline-none"
            />
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {FILTER_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "shrink-0 px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all",
                  activeFilter === category
                    ? "bg-[#0A0A0A] text-white"
                    : "bg-[#F7F7F7] text-[#6B6B6B] border border-[#E8E8E8]"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-6 columns-2 md:columns-3 lg:columns-4 gap-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="break-inside-avoid mb-4">
                <ItemCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </main>

      {!isDesktop && <BottomNav />}
    </>
  )
}
