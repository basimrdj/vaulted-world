"use client"

export function VaultFallbackVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative h-[280px] w-[220px] rounded-[32px] border border-white/35 bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.28),rgba(255,255,255,0.08)_45%,rgba(255,255,255,0.02)_72%,transparent)] shadow-[0_30px_80px_rgba(255,255,255,0.08)]">
        <div className="absolute inset-[16px] rounded-[24px] border border-white/20" />
        <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35">
          <div className="absolute left-1/2 top-1/2 h-[2px] w-8 -translate-x-1/2 -translate-y-1/2 bg-white/60" />
          <div className="absolute left-1/2 top-1/2 h-8 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-white/60" />
        </div>
      </div>
    </div>
  )
}
