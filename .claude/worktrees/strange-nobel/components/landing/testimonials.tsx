"use client"

import { cn } from "@/lib/utils"
import { TESTIMONIALS } from "@/lib/mock-data"
import Image from "next/image"

// Split testimonials into 3 columns for desktop
const col1 = TESTIMONIALS.slice(0, 3)
const col2 = TESTIMONIALS.slice(3, 6)
const col3 = TESTIMONIALS.slice(6, 9)

const columns = [
  { items: col1, duration: "30s" },
  { items: col2, duration: "25s" },
  { items: col3, duration: "35s" },
]

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
    <div className="flex shrink-0 flex-col gap-3 rounded-xl border border-[#E8E8E8] bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <Image
          src={avatar}
          alt={author}
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
        <span className="text-sm font-medium text-[#0A0A0A]">{author}</span>
      </div>
      <p className="text-sm leading-relaxed text-[#6B6B6B]">{text}</p>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="px-6 py-24">
      <h2 className="font-display mb-12 text-center text-4xl font-bold text-[#0A0A0A]">
        Loved by smart shoppers
      </h2>

      <div className="relative mx-auto max-h-[500px] max-w-5xl overflow-hidden">
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

        <div className="flex flex-col gap-8 md:flex-row md:gap-6">
          {columns.map((col, colIndex) => (
            <div
              key={colIndex}
              className={cn(
                "flex flex-1 flex-col gap-4",
                colIndex > 0 && "hidden md:flex"
              )}
              style={{
                animation: `testimonial-scroll ${col.duration} linear infinite`,
              }}
            >
              {/* Duplicate content for seamless loop */}
              <div className="flex flex-col gap-4">
                {col.items.map((t, i) => (
                  <TestimonialCard
                    key={`${colIndex}-a-${i}`}
                    author={t.author}
                    avatar={t.avatar}
                    text={t.text}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {col.items.map((t, i) => (
                  <TestimonialCard
                    key={`${colIndex}-b-${i}`}
                    author={t.author}
                    avatar={t.avatar}
                    text={t.text}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
