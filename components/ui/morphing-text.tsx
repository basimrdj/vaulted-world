"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MorphingTextProps {
  className?: string
  texts: string[]
  id?: string
}

export function MorphingText({ texts, className, id }: MorphingTextProps) {
  const normalizedTexts = useMemo(
    () => texts.filter((text) => text.trim().length > 0),
    [texts]
  )
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (normalizedTexts.length <= 1) return

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % normalizedTexts.length)
    }, 2800)

    return () => window.clearInterval(interval)
  }, [normalizedTexts.length])

  if (!normalizedTexts.length) return null

  return (
    <div
      id={id}
      className={cn(
        "relative mx-auto flex h-16 w-full max-w-2xl items-center justify-center overflow-hidden px-2 text-center font-sans font-semibold leading-tight text-white/85 md:h-20",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={normalizedTexts[index]}
          className="absolute inset-x-0"
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {normalizedTexts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
