"use client"

import { TESTIMONIALS } from "@/lib/mock-data"
import Image from "next/image"
import { Marquee } from "@/components/ui/marquee"
import { MagicCard } from "@/components/ui/magic-card"

const row1 = TESTIMONIALS.slice(0, Math.ceil(TESTIMONIALS.length / 2))
const row2 = TESTIMONIALS.slice(Math.ceil(TESTIMONIALS.length / 2))

function TestimonialCard({
  author,
  avatar,
  text,
}: {
  author: string
  avatar: string
  text: string
}) {
  return (
    <MagicCard
      className="flex w-[350px] shrink-0 flex-col gap-3 rounded-2xl border border-[#E8E8E8]/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      gradientColor="rgba(0,0,0,0.03)"
    >
      <p className="text-[14px] leading-relaxed text-[#4A4A4A]">&ldquo;{text}&rdquo;</p>
      <div className="flex items-center gap-3 pt-1">
        <Image
          src={avatar}
          alt={author}
          width={28}
          height={28}
          className="rounded-full object-cover"
        />
        <span className="text-[13px] font-medium text-[#0A0A0A]">{author}</span>
      </div>
    </MagicCard>
  )
}

export function Testimonials() {
  return (
    <section className="px-6 py-28">
      <div className="text-center mb-14">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A0A0A] tracking-tight">
          Loved by smart shoppers
        </h2>
        <p className="text-[#9A9A9A] mt-4 text-base tracking-wide">
          See what our community is saying.
        </p>
      </div>

      <div className="relative mx-auto max-w-5xl overflow-hidden">
        {/* Top gradient mask */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent"
          aria-hidden
        />
        {/* Bottom gradient mask */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-16 bg-gradient-to-t from-white to-transparent"
          aria-hidden
        />

        <div className="flex flex-col gap-4">
          <Marquee pauseOnHover className="[--duration:35s]">
            {row1.map((t, i) => (
              <TestimonialCard
                key={`row1-${i}`}
                author={t.author}
                avatar={t.avatar}
                text={t.text}
              />
            ))}
          </Marquee>

          <Marquee pauseOnHover reverse className="[--duration:35s]">
            {row2.map((t, i) => (
              <TestimonialCard
                key={`row2-${i}`}
                author={t.author}
                avatar={t.avatar}
                text={t.text}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
