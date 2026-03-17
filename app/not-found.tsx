import Link from "next/link"
import { PremiumCrystalWrapper } from "@/components/premium/premium-crystal-wrapper"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] px-6 py-14 text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
        <PremiumCrystalWrapper />
        <h1 className="mt-10 font-display text-5xl font-bold tracking-tight md:text-6xl">
          404
        </h1>
        <p className="mt-3 text-base text-white/60">
          This vault door does not exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-xl border border-white/20 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
