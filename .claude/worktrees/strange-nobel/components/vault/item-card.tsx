"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { VaultItem } from "@/stores/vault-store"
import { cn } from "@/lib/utils"

interface ItemCardProps {
  item: VaultItem
}

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}

function getPriceDropPercent(item: VaultItem): number | null {
  if (
    (item.priceStatus === "dropped" || item.priceStatus === "best") &&
    item.originalPrice &&
    item.originalPrice > item.price
  ) {
    const percent = Math.round(
      ((item.originalPrice - item.price) / item.originalPrice) * 100
    )
    return percent
  }
  return null
}

function MiniSparkline({ priceHistory }: { priceHistory: { date: string; price: number }[] }) {
  if (priceHistory.length < 2) return null

  const prices = priceHistory.map((p) => p.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const range = max - min || 1
  const width = 40
  const height = 16

  const points = prices.map((price, i) => {
    const x = (i / (prices.length - 1)) * width
    const y = height - ((price - min) / range) * height
    return `${x},${y}`
  }).join(" ")

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="shrink-0"
    >
      <polyline
        points={points}
        fill="none"
        stroke="#0A0A0A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ItemCard({ item }: ItemCardProps) {
  const priceDropPercent = getPriceDropPercent(item)

  return (
    <motion.article
      className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group break-inside-avoid"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-xl">
        <Image
          src={item.image}
          alt={item.name}
          width={400}
          height={500}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        {priceDropPercent !== null && (
          <span className="absolute top-2 right-2 bg-[#0A0A0A] text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
            ↓ {priceDropPercent}%
          </span>
        )}
      </div>

      <div className="p-3 space-y-1">
        <h3 className="text-sm font-medium text-[#0A0A0A] line-clamp-2">
          {item.name}
        </h3>
        <p className="text-xs text-[#9A9A9A]">{item.brand}</p>
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-baseline gap-2">
            <span className="font-mono font-medium text-base text-[#0A0A0A]">
              {formatPrice(item.price, item.currency)}
            </span>
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="font-mono text-xs text-[#9A9A9A] line-through">
                {formatPrice(item.originalPrice, item.currency)}
              </span>
            )}
          </div>
          <MiniSparkline priceHistory={item.priceHistory} />
        </div>
      </div>
    </motion.article>
  )
}
