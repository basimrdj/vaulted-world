"use client"

import Image from "next/image"
import { Plus } from "lucide-react"
import { VaultBackground } from "@/components/ui/vault-background"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Sidebar } from "@/components/navigation/sidebar"
import { useMediaQuery } from "@/hooks/use-media-query"
import { MOCK_BOARDS } from "@/lib/mock-data"
import type { Board } from "@/stores/vault-store"

const BOARD_TYPE_LABELS: Record<Board["type"], string> = {
  standard: "Standard",
  moodboard: "Moodboard",
  gift: "Gift",
  comparison: "Comparison",
}

export default function BoardsPage() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    <>
      <VaultBackground />
      {isDesktop && <Sidebar />}

      <main
        className={`min-h-screen pb-20 lg:pb-0 ${isDesktop ? "pl-[220px]" : ""}`}
      >
        <div className="max-w-6xl mx-auto px-4 py-6 lg:py-8">
          <h1 className="font-display font-bold text-2xl text-[#0A0A0A]">
            Your Boards
          </h1>

          <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_BOARDS.map((board) => (
              <article
                key={board.id}
                className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={board.coverImage}
                    alt={board.name}
                    width={400}
                    height={267}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-base text-[#0A0A0A]">
                    {board.name}
                  </h2>
                  <p className="text-sm text-[#9A9A9A] mt-0.5">
                    {board.itemIds.length} items
                  </p>
                  <span className="inline-block mt-2 text-[10px] uppercase tracking-wider text-[#9A9A9A]">
                    {BOARD_TYPE_LABELS[board.type]}
                  </span>
                </div>
              </article>
            ))}

            <button
              type="button"
              className="flex flex-col items-center justify-center min-h-[180px] bg-white border-2 border-dashed border-[#E8E8E8] rounded-xl hover:border-[#D0D0D0] transition-colors cursor-pointer"
            >
              <Plus className="w-8 h-8 text-[#9A9A9A] mb-2" />
              <span className="text-sm font-medium text-[#6B6B6B]">
                Create Board
              </span>
            </button>
          </div>
        </div>
      </main>

      {!isDesktop && <BottomNav />}
    </>
  )
}
