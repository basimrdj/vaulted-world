"use client"

import Link from "next/link"
import { useMemo } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Sidebar } from "@/components/navigation/sidebar"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { VaultBackground } from "@/components/ui/vault-background"
import { useMediaQuery } from "@/hooks/use-media-query"
import { MOCK_ITEMS } from "@/lib/mock-data"
import { BLUR_FADE_TRANSITION, V_ULTRA_SPRING } from "@/lib/physics"

export default function VaultItemDetailPage() {
  const params = useParams<{ id: string }>()
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const id = params?.id
  const item = useMemo(() => MOCK_ITEMS.find((entry) => entry.id === id), [id])

  if (!item) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-6 text-white">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.22em] text-white/40">
            Item not found
          </p>
          <Link
            href="/vault"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-white/20 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Back to Vault
          </Link>
        </div>
      </main>
    )
  }

  return (
    <>
      <VaultBackground />
      {isDesktop && <Sidebar />}

      <main className={`${isDesktop ? "pl-[240px]" : ""} min-h-screen pb-24 lg:pb-0`}>
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={BLUR_FADE_TRANSITION}
          >
            <Link
              href="/vault"
              className="mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#6B6B6B] transition-colors hover:text-[#0A0A0A]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Vault
            </Link>
          </motion.div>

          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_420px] md:items-start">
            <motion.div
              layoutId={`product-image-${item.id}`}
              transition={V_ULTRA_SPRING}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[#D8D8D8] bg-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover grayscale contrast-[1.15]"
                priority
              />
            </motion.div>

            <div className="pt-2">
              <motion.h1
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ ...BLUR_FADE_TRANSITION, delay: 0.05 }}
                className="font-display text-4xl font-bold tracking-tight text-[#0A0A0A] md:text-5xl"
              >
                {item.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ ...BLUR_FADE_TRANSITION, delay: 0.12 }}
                className="mt-2 text-sm uppercase tracking-[0.16em] text-[#6B6B6B]"
              >
                {item.brand}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ ...BLUR_FADE_TRANSITION, delay: 0.2 }}
                className="mt-8 rounded-2xl border border-[#E0E0E0] bg-white/80 p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
              >
                <p className="font-mono text-[36px] font-bold tracking-tight text-[#0A0A0A]">
                  ${item.price.toFixed(2)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">
                  Tracking {item.retailer}. AI signals a {item.priceStatus} price pattern from recent movement.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ ...BLUR_FADE_TRANSITION, delay: 0.28 }}
                className="mt-5 rounded-2xl border border-[#E8E8E8] bg-white/75 p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9A9A9A]">
                  Notes
                </p>
                <p className="mt-2 text-sm text-[#4A4A4A]">
                  {item.notes || "No notes yet. Save context from screenshots, links, and retailer scans to enrich AI recommendations."}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {!isDesktop && <BottomNav />}
    </>
  )
}
