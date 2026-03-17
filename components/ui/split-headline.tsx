"use client"

import { useEffect, useMemo, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

interface SplitHeadlineProps {
  text: string
  className?: string
}

export function SplitHeadline({ text, className }: SplitHeadlineProps) {
  const rootRef = useRef<HTMLHeadingElement>(null)
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const characters = useMemo(() => text.split(""), [text])

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const chars = rootRef.current?.querySelectorAll("[data-char]")
      if (!chars || chars.length === 0) return

      gsap.set(chars, {
        yPercent: 105,
        opacity: 0,
        filter: "blur(8px)",
      })

      gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.025,
        ease: "expo.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 84%",
          once: true,
        },
      })
    }, rootRef)

    return () => {
      ctx.revert()
    }
  }, [prefersReducedMotion])

  return (
    <h2 ref={rootRef} className={cn("overflow-hidden", className)}>
      {characters.map((character, index) => (
        <span
          key={`${character}-${index}`}
          data-char
          className="inline-block [will-change:transform,opacity,filter]"
        >
          {character === " " ? "\u00A0" : character}
        </span>
      ))}
    </h2>
  )
}
