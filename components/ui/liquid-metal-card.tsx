"use client"

import { useCallback, useState, type MouseEvent } from "react"
import { cn } from "@/lib/utils"

interface LiquidMetalCardProps {
  children: React.ReactNode
  className?: string
  contentClassName?: string
  disabled?: boolean
}

export function LiquidMetalCard({
  children,
  className,
  contentClassName,
  disabled = false,
}: LiquidMetalCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [pos, setPos] = useState({ x: 50, y: 50 })

  const onMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setPos({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    })
  }, [])

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        className
      )}
      onMouseMove={disabled ? undefined : onMove}
      onMouseEnter={disabled ? undefined : () => setIsHovering(true)}
      onMouseLeave={disabled ? undefined : () => setIsHovering(false)}
    >
      {!disabled && isHovering && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `
              radial-gradient(
                300px circle at ${pos.x}% ${pos.y}%,
                rgba(0, 0, 0, 0.06) 0%,
                rgba(0, 0, 0, 0.02) 40%,
                transparent 70%
              ),
              radial-gradient(
                150px circle at ${pos.x + 5}% ${pos.y - 5}%,
                rgba(255, 255, 255, 0.08) 0%,
                transparent 60%
              )
            `,
          }}
        />
      )}

      <div
        className={cn(
          "relative z-10 h-full w-full bg-white/95 backdrop-blur-sm",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}
