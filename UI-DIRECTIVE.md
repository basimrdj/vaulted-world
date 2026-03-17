# VAULTED — UI Upgrade Directive
## From Flat to Cinematic. Same Identity. New Dimension.

---

## PHASE 0: LEARN BEFORE YOU TOUCH

**Before writing a single line of code, complete this analysis phase.**

Traverse the entire VAULTED codebase. Read every component, every page, every layout, every CSS file, every config. Build a complete mental model of:

1. **The color system** — every hex value, every CSS variable, every oklch value, every opacity, every background, every border, every text color. Map the full palette. Understand where white is used, where black is used, where greys appear, what the hierarchy is. Do not change any of this.
2. **The typography** — every font family, every weight, every size, every line-height, every letter-spacing. Know which font is used for headings, which for body, which for data/prices. Do not change any of this.
3. **The spacing system** — paddings, margins, gaps, the rhythm of the layout. Do not change any of this.
4. **The component architecture** — what's built with shadcn, what's custom, what uses Radix primitives, what's pure HTML/CSS. Understand the dependency tree.
5. **The existing animations** — any Framer Motion, any CSS transitions, any keyframes already in place. Note what moves and what doesn't.
6. **The layout patterns** — card grids, sidebars, modals, sheets, the responsive breakpoints, the mobile-first approach.

**Your job is to UPGRADE visual fidelity and interactivity while preserving exact identity.** The monochrome palette stays. The fonts stay. The spacing stays. The layout structure stays. What changes is the *depth*, the *motion*, the *materiality*, and the *scroll experience*.

Think of it like this: the current app is a beautifully composed black-and-white photograph. Your job is to make it a beautifully composed black-and-white *film* — same aesthetic, but now it breathes, it moves, it responds, it has depth.

---

## PHASE 1: INSTALL THE ANIMATION STACK

Install these dependencies. Every one is justified by its role in the system.

```bash
# Core animation engine (choreography + scroll-link)
npm install gsap @gsap/react

# Smooth scrolling (overrides native scroll physics)
npm install lenis

# 3D rendering (hero scenes + premium moments only)
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing

# Magic UI components (via MCP — see Phase 2)
npx shadcn@latest add "https://magicui.design/r/border-beam"
npx shadcn@latest add "https://magicui.design/r/shimmer-button"
npx shadcn@latest add "https://magicui.design/r/magic-card"
npx shadcn@latest add "https://magicui.design/r/particles"
npx shadcn@latest add "https://magicui.design/r/animated-beam"
npx shadcn@latest add "https://magicui.design/r/animated-shiny-text"
npx shadcn@latest add "https://magicui.design/r/blur-fade"
npx shadcn@latest add "https://magicui.design/r/text-reveal"
npx shadcn@latest add "https://magicui.design/r/text-animate"
npx shadcn@latest add "https://magicui.design/r/scroll-progress"
npx shadcn@latest add "https://magicui.design/r/scroll-based-velocity"
npx shadcn@latest add "https://magicui.design/r/number-ticker"
npx shadcn@latest add "https://magicui.design/r/lens"
npx shadcn@latest add "https://magicui.design/r/marquee"
npx shadcn@latest add "https://magicui.design/r/shine-border"
npx shadcn@latest add "https://magicui.design/r/morphing-text"
npx shadcn@latest add "https://magicui.design/r/hyper-text"
npx shadcn@latest add "https://magicui.design/r/light-rays"
npx shadcn@latest add "https://magicui.design/r/warp-background"
npx shadcn@latest add "https://magicui.design/r/smooth-cursor"
npx shadcn@latest add "https://magicui.design/r/progressive-blur"
npx shadcn@latest add "https://magicui.design/r/confetti"
npx shadcn@latest add "https://magicui.design/r/icon-cloud"
npx shadcn@latest add "https://magicui.design/r/globe"
npx shadcn@latest add "https://magicui.design/r/dock"
npx shadcn@latest add "https://magicui.design/r/interactive-hover-button"
npx shadcn@latest add "https://magicui.design/r/ripple-button"
npx shadcn@latest add "https://magicui.design/r/pulsating-button"
npx shadcn@latest add "https://magicui.design/r/neon-gradient-card"
npx shadcn@latest add "https://magicui.design/r/meteors"
```

---

## PHASE 2: HOW TO USE THE MCP TOOLS

You have two MCP servers installed. Here is how to use them.

### Magic UI MCP (`@magicuidesign/mcp`)

Direct access to Magic UI's 150+ component registry.

- **`searchRegistryItems`** — Search by keyword: "scroll animation", "3D card", "beam border"
- **`getRegistryItem`** — Get full source code. Always pass `includeSource: true` and `includeExamples: true`
- **`listRegistryItems`** — Browse all. Use `kind: "component"` to filter

**Workflow:** Before implementing any upgrade, ALWAYS search the Magic UI registry first. If a component exists, use it. Fetch its source. Adapt to the monochrome palette. Do not reinvent what already exists.

### 21st.dev Magic MCP (`@21st-dev/magic`)

AI-powered component generator. Use it when:
- A custom component doesn't exist in the Magic UI registry
- You want a variation of an existing component
- You need a bespoke scroll animation or 3D effect

Use `/ui` followed by a description. Example: `/ui create a monochrome 3D product card with perspective tilt on hover, glassmorphic border, and subtle shadow depth — black and white only, no color`.

**Critical rule for both MCPs:** Every component pulled or generated MUST be adapted to use the existing project's color variables. No new colors. No gradients with hue. Monochrome only. If a component ships with colored defaults, strip them and replace with the project's existing CSS variables.

---

## PHASE 3: THE PHYSICS CONFIG

Before any animation, define the physics system globally. All motion must feel deliberate, heavy, and premium — not linear, not generic cubic-bezier.

```typescript
// lib/physics.ts
export const V_SPRING = {
  type: "spring",
  stiffness: 250,
  damping: 25,
  mass: 0.8,
  restDelta: 0.001,
} as const;

export const V_SNAP = {
  type: "spring",
  stiffness: 200,
  damping: 20,
  mass: 0.6,
} as const;

export const V_FADE = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1], // sharp snap into place
} as const;

export const V_EXIT = {
  duration: 0.2,
  ease: [0.55, 0, 1, 0.45], // exits faster than entrances
} as const;
```

Use `V_SPRING` for entrance + hover effects. Use `V_SNAP` for interactive hover (snappier response). Use `V_FADE` for blur-to-sharp reveals. Use `V_EXIT` for departures.

---

## PHASE 4: THE SCROLL ARCHITECTURE

This is the backbone of the entire upgrade. The app must feel like an Apple product page when scrolled.

### 4.1 — Global Smooth Scroll with Lenis

Wrap the entire app in Lenis. This replaces native jerky scroll with buttery 60fps interpolated scrolling.

```tsx
// app/providers/SmoothScrollProvider.tsx
"use client"
import { ReactLenis } from "lenis/react"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,         // Heavy, deliberate, premium feel
        duration: 1.4,
        smoothWheel: true,
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  )
}
```

Add this to `app/layout.tsx` wrapping the children.

### 4.2 — GSAP Plugin Registration

```typescript
// lib/gsap.ts
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
```

Import from this file everywhere — never register plugins more than once.

### 4.3 — Scroll-Triggered Section Reveals

Every major section on every page animates in on scroll.

- **Sections fade up + blur-to-sharp** as they enter the viewport (Magic UI `BlurFade`)
- **Staggered children** — multiple cards animate in with 80ms stagger
- **Scrub-linked parallax** — background at 0.3x, foreground at 1x

```tsx
<BlurFade delay={0.1} inView>
  <section className="...">
    {items.map((item, i) => (
      <BlurFade key={i} delay={0.1 + i * 0.08} inView>
        <Card>{/* ... */}</Card>
      </BlurFade>
    ))}
  </section>
</BlurFade>
```

### 4.4 — Scroll Progress Indicator

Add `ScrollProgress` (Magic UI) to the top of every page. A thin animated bar, foreground color, shows scroll depth.

### 4.5 — Pinned Sections (Apple-Style)

For landing page feature showcases, use GSAP ScrollTrigger pins.

```tsx
// components/landing/ScrollTheatrics.tsx
"use client"
import { useRef } from "react"
import { gsap } from "@/lib/gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

const statements = [
  "Screenshot your desires.",
  "Let AI build the database.",
  "Track every price drop.",
  "Your personal Vault."
]

export function ScrollTheatrics() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([])

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 1,
      }
    })

    textRefs.current.forEach((text, i) => {
      if (!text) return
      tl.fromTo(
        text,
        { opacity: 0, y: 100, scale: 0.9, filter: "blur(10px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", ease: "power2.out", duration: 1 },
        i === 0 ? 0 : "+=0.5"
      )
      if (i !== statements.length - 1) {
        tl.to(text, {
          opacity: 0, y: -100, scale: 1.1, filter: "blur(10px)",
          ease: "power2.in", duration: 1
        }, "+=1")
      }
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-5xl mx-auto px-6 h-[200px] flex items-center justify-center">
        {statements.map((stmt, i) => (
          <h2
            key={i}
            ref={(el) => { textRefs.current[i] = el }}
            className="absolute text-5xl md:text-8xl font-bold tracking-tighter text-white text-center will-change-transform"
            style={{ opacity: 0 }}
          >
            {stmt}
          </h2>
        ))}
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-white opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />
    </div>
  )
}
```

### 4.6 — Velocity Skew

When the user scrolls fast, the DOM grid physically leans into the scroll direction.

```tsx
// components/ui/VelocityGrid.tsx
"use client"
import { motion, useScroll, useTransform, useSpring } from "motion/react"

export function VelocityGrid({ children }: { children: React.ReactNode }) {
  const { scrollYVelocity } = useScroll()
  const skewY = useTransform(scrollYVelocity, [-1000, 1000], [4, -4])
  const smoothSkew = useSpring(skewY, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div style={{ skewY: smoothSkew }} className="origin-center">
      {children}
    </motion.div>
  )
}
```

Wrap the vault grid with this.

---

## PHASE 5: PAGE TRANSITIONS (FLUID ROUTING)

The user must never perceive a hard page load. The app must feel like a single breathing application.

### 5.1 — The Global Template

`app/template.tsx` re-mounts on every navigation (unlike `layout.tsx`). Wrap it in Framer Motion to intercept route changes and apply a blur-scale crossfade.

```tsx
// app/template.tsx
"use client"
import { motion, AnimatePresence } from "motion/react"
import { usePathname } from "next/navigation"
import { V_SPRING } from "@/lib/physics"

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        exit={{ opacity: 0, filter: "blur(4px)", scale: 0.98 }}
        transition={V_SPRING}
        className="w-full h-full min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

### 5.2 — Shared Element Transitions (The Killer Feature)

When a user clicks a Vault card, the image should not load on a new page — it should physically fly from the grid into the hero position of the detail page. This is what separates the app from every competitor.

**The grid card (origin):**

```tsx
// components/vault/VaultCard.tsx
"use client"
import { motion } from "motion/react"
import Link from "next/link"
import { V_SPRING } from "@/lib/physics"

export function VaultCard({ id, title, price, imageUrl }: VaultCardProps) {
  return (
    <Link href={`/vault/${id}`}>
      <motion.div
        className="group relative flex flex-col gap-4 cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={V_SPRING}
      >
        <div className="relative aspect-square overflow-hidden bg-[#111] rounded-xl border border-[#333] transition-colors group-hover:border-[#555]">
          {/* layoutId is the quantum tether — same string on the detail page */}
          <motion.img
            layoutId={`vault-image-${id}`}
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover grayscale contrast-125"
            transition={V_SPRING}
          />
        </div>
        <motion.div
          className="flex justify-between items-end"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          <h3 className="text-sm font-medium tracking-tight">{title}</h3>
          <p className="text-sm text-[#666] tabular-nums">{price}</p>
        </motion.div>
      </motion.div>
    </Link>
  )
}
```

**The detail page (destination):**

```tsx
// app/vault/[id]/page.tsx
"use client"
import { motion } from "motion/react"
import { useParams } from "next/navigation"
import { V_SPRING, V_FADE } from "@/lib/physics"

export default function VaultDetail() {
  const { id } = useParams()
  // fetch item data by id

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="relative aspect-[4/5] w-full bg-[#0a0a0a] rounded-2xl overflow-hidden border border-[#222]">
          {/* Same layoutId — Framer Motion handles the coordinate math */}
          <motion.img
            layoutId={`vault-image-${id}`}
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover grayscale contrast-125"
            transition={V_SPRING}
          />
        </div>
        <div className="flex flex-col gap-8 pt-8">
          {[
            { delay: 0.1, content: <h1 className="text-5xl font-semibold tracking-tighter">{item.title}</h1> },
            { delay: 0.2, content: <p className="text-2xl text-[#666] tabular-nums">{item.price}</p> },
            { delay: 0.3, content: <p className="text-[#888] leading-relaxed max-w-md">{item.description}</p> },
          ].map(({ delay, content }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ ...V_FADE, delay }}
            >
              {content}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

## PHASE 6: ELEMENT-BY-ELEMENT UPGRADE MAP

### 6.1 — Cards (Vault Items, Product Cards, Board Cards)

**Current:** Flat cards with border and shadow.

**Upgrade to:**
- Wrap every card in `MagicCard` — spotlight effect that follows the mouse cursor
- Add `BorderBeam` to priority cards (featured items, price drop alerts, AI picks) — a beam of light traveling along the border
- On hover: 3–5° CSS `perspective` tilt toward cursor via `mousemove` listener
- Add `ProgressiveBlur` to card images — sharp center, blurred edges, cinematic depth

```tsx
<MagicCard className="..." gradientColor="currentColor" gradientOpacity={0.05}>
  <div className="relative overflow-hidden">
    <ProgressiveBlur>{/* card image */}</ProgressiveBlur>
    {isPriorityCard && <BorderBeam size={200} duration={8} />}
  </div>
</MagicCard>
```

### 6.2 — Liquid Metal Card (Advanced — Landing Page Only)

For the feature showcase on the landing page, replace simple MagicCard with the GLSL liquid-metal shader variant. This only runs on desktop and falls back to a standard `MagicCard` on mobile.

```tsx
// components/ui/liquid-metal-card.tsx
"use client"
import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float dist = distance(st, u_mouse);
    float ripple = sin(dist * 20.0 - u_time * 5.0) * 0.5 + 0.5;
    float n = snoise(st * 3.0 + u_time * 0.2);
    float intensity = mix(n, ripple, smoothstep(0.5, 0.0, dist));
    vec3 color = vec3(intensity * 0.3);
    gl_FragColor = vec4(color, 1.0);
  }
`

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

function LiquidPlane() {
  const ref = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_resolution: { value: new THREE.Vector2(800, 400) },
  }), [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.uniforms.u_time.value = state.clock.getElapsedTime()
    ref.current.uniforms.u_mouse.value.x = THREE.MathUtils.lerp(
      ref.current.uniforms.u_mouse.value.x, (state.pointer.x + 1) / 2, 0.1
    )
    ref.current.uniforms.u_mouse.value.y = THREE.MathUtils.lerp(
      ref.current.uniforms.u_mouse.value.y, (state.pointer.y + 1) / 2, 0.1
    )
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={ref} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent />
    </mesh>
  )
}

export function LiquidMetalCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl overflow-hidden group cursor-none">
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <LiquidPlane />
        </Canvas>
      </div>
      <div className="relative z-10 bg-black/80 backdrop-blur-sm border border-white/10 group-hover:border-white/25 transition-colors duration-500">
        {children}
      </div>
    </div>
  )
}
```

**Note:** Dynamic import this with `ssr: false`. On mobile, render a standard `MagicCard` fallback.

### 6.3 — Buttons (All CTAs)

**Upgrade hierarchy:**
- **Primary CTA** (Save to Vault, Upgrade) → `ShimmerButton` — shimmering light traveling the perimeter. Adapt shimmer color to existing foreground.
- **Secondary CTA** (View Deal, Share, Copy Link) → `InteractiveHoverButton` — expands or morphs on hover
- **Tertiary / Ghost** (Filter chips, tab selectors) → `RippleButton` — monochrome ripple on click
- **Premium / Upgrade CTA** → `PulsatingButton` — subtle pulse that draws the eye without being obnoxious
- **All primary CTAs** → Add magnetic pull via Framer Motion: as cursor approaches within 50px, button subtly moves toward cursor

### 6.4 — Text & Headings

- **Page titles** → `TextAnimate` with `type: "rollIn"` or `type: "fadeIn"` — animate in on load
- **Section headings** → `TextReveal` — word-by-word reveal on scroll
- **Stats / Numbers** → `NumberTicker` — counts up from 0 on scroll entry
- **Hero tagline** → `MorphingText` — cycles through phrases: "Your desires, organized." → "Screenshot. Save. Track." → "The AI desire engine."
- **AI-generated text** → `HyperText` — briefly scrambles before resolving, giving the "AI is thinking" effect
- **Emphasis text** (price drops, "AI Pick") → `AnimatedShinyText` — shimmering light glare pans across

### 6.5 — Navigation

- **Mobile bottom nav** → Magic UI `Dock` — macOS-style dock with icon magnification on touch/hover
- **Desktop sidebar active item** → `ShineBorder` — animated shining border on current section
- **Smooth cursor (desktop only)** → `SmoothCursor` — physics-based cursor follower, spring-animated, monochrome, disappears on mobile

### 6.6 — Modals & Sheets

- Entry: scale 0.95→1.0 + blur-to-sharp + opacity 0→1, spring ease (0.3s, high damping)
- Exit: reverse, faster (0.2s)
- Background overlay: sparse, slow, monochrome `Particles` for ambient depth
- The modal/sheet itself: `ShineBorder` — subtle animated border glow

### 6.7 — Loading States

- **AI processing** (screenshot analysis) → `WarpBackground` — time-warping background signals computation
- **Page transitions** → `BlurFade` on incoming content
- **Skeleton screens** → shimmer sweep across skeleton blocks (same principle as `ShimmerButton`)

### 6.8 — Images (Product Photos, Screenshots)

- Wrap product images in `Lens` — magnifying lens on hover for detail inspection. Critical for a wishlist app.
- All images use `BlurFade` to animate in on scroll entry — 50ms stagger in grids
- Landing page hero: `ProgressiveBlur` on edges for vignette depth

### 6.9 — AI Integration Visualization

- `AnimatedBeam` pipeline on "How It Works": Screenshot → AI Vision → Product ID → Price Tracking → Your Vault
- Multiple-inputs variant: multiple screenshots on the left, beams flowing into central AI node, branching to organized categories on the right

### 6.10 — Onboarding Flow

- Each onboarding screen transitions with GSAP ScrollTrigger pin — user scrolls to advance
- Welcome screen: `LightRays` — monochrome light rays from above, dramatic vault-opening effect
- Interest selection chips: `InteractiveHoverButton` with scale-on-hover
- Final "Vault is ready" screen: monochrome `Confetti` (black and grey particles only, strip any color defaults)

---

## PHASE 7: THE LANDING PAGE — FULL THEATRICAL REBUILD

This is where the theatrical budget goes. Follow this directorial sequence exactly.

### 7.1 — Hero Section (`0vh – 100vh`)

Pure black screen. A single 3D glass vault, front and center. Heavy film grain. Title unmasks flawlessly.

```tsx
// Lazy load — Three.js cannot SSR
const VaultHero = dynamic(
  () => import("@/components/landing/VaultHero").then(m => m.VaultHero),
  { ssr: false, loading: () => <HeroSkeleton /> }
)
```

```tsx
// components/landing/VaultHero.tsx
"use client"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { MeshTransmissionMaterial, Float, Environment } from "@react-three/drei"
import { motion } from "motion/react"
import { V_FADE } from "@/lib/physics"

function GlassVault({ scrollProgress }: { scrollProgress: number }) {
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh rotation-y={scrollProgress * Math.PI * 2}>
        <boxGeometry args={[2, 2.5, 1.5]} />
        <MeshTransmissionMaterial
          transmission={1}
          roughness={0.08}
          thickness={0.5}
          chromaticAberration={0.015}
          anisotropy={0.3}
          color="#ffffff"
          backside
        />
      </mesh>
    </Float>
  )
}

export function VaultHero() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.15} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <Environment preset="studio" />
          <GlassVault scrollProgress={0} />
        </Canvas>
      </div>
      <div className="relative z-10 flex flex-col items-center pointer-events-none text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...V_FADE, delay: 0.5 }}
          className="text-7xl md:text-[10rem] font-semibold tracking-tighter text-white mix-blend-difference"
        >
          VAULTED.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...V_FADE, delay: 1.3 }}
          className="mt-6 text-[#666] tracking-[0.3em] uppercase text-xs"
        >
          Scroll to extract
        </motion.p>
      </div>
    </section>
  )
}
```

### 7.2 — Scroll Theatrics (`100vh – 500vh`)

Pinned section. 4 massive typographic statements reveal and depart as the user scrolls. See Phase 4.5 for the full `ScrollTheatrics` component.

### 7.3 — Social Proof Section

- `Marquee` (Magic UI) — infinitely scrolling horizontal testimonials or logo row
- Two rows, opposite directions, different speeds
- Each testimonial card uses `MagicCard` with spotlight effect

### 7.4 — Stats Section

```tsx
<BlurFade inView>
  <div className="grid grid-cols-3 gap-16 relative">
    <NumberTicker value={50000} suffix="+ items saved" />
    <NumberTicker value={2300000} prefix="$" suffix=" in drops caught" />
    <NumberTicker value={4.8} decimals={1} suffix="★ rating" />
    {/* Ambient particle depth */}
    <Particles className="absolute inset-0 opacity-20 pointer-events-none" quantity={30} />
  </div>
</BlurFade>
```

### 7.5 — How It Works (Animated Beams)

`AnimatedBeam` pipeline visualization — multiple screenshot inputs → AI analysis node → organized vault outputs. Each beam triggers on scroll entry.

### 7.6 — Pricing Section

- Two cards side by side
- Premium card: `NeonGradientCard` **adapted to monochrome** — white/grey glow, no color. Strip default colored gradients.
- `NumberTicker` for the price
- Selecting Premium triggers monochrome `Confetti`
- Section header: `AnimatedShinyText` — "Unlock the Full Vault"

### 7.7 — Footer CTA

- `Meteors` background — monochrome meteor shower behind the final CTA
- Large headline with `TextAnimate`
- Final `ShimmerButton`

---

## PHASE 8: THREE.JS RULES

Use sparingly but with maximum impact. 3D is for landing page and premium moments only — never in core product UI.

**Where to use Three.js:**
1. Landing page hero — rotating glass vault (wireframe or `MeshTransmissionMaterial`)
2. Premium upgrade page — 3D diamond/crystal the user can orbit with mouse drag
3. Empty vault state — beautiful floating geometric shape inviting the first item
4. 404 page — interesting 3D scene instead of a dead end

**Single canvas architecture (hard rule):** Render exactly ONE `<Canvas>` per page. Use `@react-three/drei`'s `<View>` component to teleport 3D elements to different HTML containers. Multiple canvases will destroy GPU performance.

**Hard rules:**
- Always `dynamic import` with `ssr: false` — Three.js cannot run server-side
- Always monochrome materials — `MeshStandardMaterial` or `MeshTransmissionMaterial` with white/grey/black only. No colored lights. No colored materials.
- Link camera position or object rotation to GSAP ScrollTrigger scroll progress
- On mobile: disable Three.js entirely. Replace 3D scenes with static hero images or CSS fallbacks.
- Frustum culling + InstancedMesh for any scene with 50+ particles or objects

**Post-processing pipeline (landing page only, desktop only):**

```tsx
import { EffectComposer, Bloom, Noise, Vignette, DepthOfField } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"

<EffectComposer multisampling={4}>
  <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} intensity={1.2} mipmapBlur />
  <Noise opacity={0.03} premultiply blendFunction={BlendFunction.ADD} />
  <Vignette eskil={false} offset={0.08} darkness={1.1} />
  <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={2} />
</EffectComposer>
```

Disable `EffectComposer` on mobile to maintain 60fps.

---

## PHASE 9: MICRO-INTERACTIONS & MOTION DESIGN

These are the 1% details that make the app feel alive.

### 9.1 — Hover States

Every interactive element has a considered hover state:
- **Cards:** 3–5° perspective tilt + shadow deepens + `scale(1.02)`
- **Buttons:** shimmer / ripple / pulse depending on hierarchy (see Phase 6.3)
- **Links:** underline animates in from left to right (not instant)
- **Images:** subtle `scale(1.05)` with `overflow: hidden` on container
- **Nav items:** background highlight slides in from left (not instant)

### 9.2 — Gesture Responses (Mobile)

- Swipe to dismiss/archive cards: spring-physics drag with momentum
- Pull to refresh: the vault icon rotates as you pull down
- Long press: card scales to 0.95, haptic feedback if supported, context menu appears

### 9.3 — Spring Physics Reference

| Use | Damping | Stiffness | Notes |
|-----|---------|-----------|-------|
| Entrance | 25 | 250 | Use `V_SPRING` |
| Hover | 20 | 200 | Use `V_SNAP` (snappier) |
| Exit | — | — | `ease-out`, 0.2s — exits faster |
| Scroll skew | 30 | 100 | `VelocityGrid` |

---

## PHASE 10: PERFORMANCE GUARDRAILS

All upgrades must maintain 60fps. Follow these rules without exception.

1. **Lazy load all 3D** — `next/dynamic` with `ssr: false` for every Three.js component
2. **Intersection Observer** — elements only animate when visible. Use Magic UI's built-in `inView` prop.
3. **`will-change: transform`** — add to animating elements, remove after animation completes
4. **GPU compositing only** — animate `transform` and `opacity` exclusively. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.
5. **Reduce motion** — `prefers-reduced-motion` must disable all scroll animations, 3D scenes, and particle effects. Show static versions.
6. **Mobile budget** — No Three.js. No `EffectComposer`. Reduce particle counts by 90%. Keep Lenis + Framer Motion layout transitions.
7. **Bundle splitting** — GSAP, Three.js, and unused Magic UI components must not be in a page's bundle if not used on that page.
8. **Profile first** — open Chrome DevTools Performance tab. Record a scroll. If any frame exceeds 16ms, optimize before shipping.

---

## PHASE 11: REFINEMENT WITH 21st.dev MAGIC

After implementing all the above, do a final refinement pass:

```
/ui refine this product card component — add perspective 3D tilt on hover, a border beam animation on featured cards, and a blur-to-sharp entrance animation. Keep the exact same monochrome color scheme, same font, same spacing. Output as a React component with TypeScript.

/ui create a premium pricing card with a subtle animated border glow, number counting animation for the price, and a shimmer CTA button. Monochrome black and white only. No color. Glass-like material feel.

/ui create a scroll-triggered feature showcase section — 4 features in a pinned scroll section where each feature fades in as the previous fades out, Apple-style. Monochrome, clean, premium. Use GSAP ScrollTrigger.

/ui create an animated beam diagram showing: screenshots flowing into an AI analysis node, then branching out to categories. Monochrome, animated beams of light.
```

Review each output. Adapt to match the existing project's exact color variables and font stack. Integrate.

---

## CRITICAL RULES — DO NOT VIOLATE

1. **ZERO new colors.** No gradients with hue. No colored glows. No colored particles. Black, white, and greys from the existing palette only. If a Magic UI component defaults to a color, strip it.
2. **ZERO font changes.** Use existing fonts only.
3. **ZERO layout restructuring.** Page structure, component hierarchy, and responsive behavior stay exactly as-is. You are adding depth and motion, not reorganizing.
4. **Mobile-first always.** Every upgrade must work on a 375px viewport. If a 3D effect can't perform on mobile, provide a graceful static fallback.
5. **No animation on core product screens on mobile by default.** Scroll animations are landing-page-only on mobile. The vault, boards, and product detail screens must remain fast and utilitarian on phones.
6. **Test at 60fps.** Open Chrome DevTools Performance. Record a scroll through the landing page. If any frame exceeds 16ms, optimize it.
7. **Accessibility.** All animations wrapped in a `prefers-reduced-motion` check. Every interactive element remains keyboard-accessible. Screen reader support must not be broken.
8. **Single canvas per page.** Never spawn multiple `<Canvas>` elements. Use Drei's `<View>` to share one canvas across the page.

---

## EXECUTION ORDER

Follow this sequence exactly. Do not skip steps or parallelize phases.

1. Install all dependencies (Phase 1)
2. Set up physics constants — `lib/physics.ts` (Phase 3)
3. Set up Lenis smooth scroll + GSAP registration (Phase 4.1, 4.2)
4. Add `app/template.tsx` for page transitions (Phase 5.1)
5. Add `ScrollProgress` to all pages (Phase 4.4)
6. Add `BlurFade` entrance animations to all sections (Phase 4.3)
7. Upgrade all cards with `MagicCard` + `BorderBeam` (Phase 6.1)
8. Upgrade all buttons by hierarchy (Phase 6.3)
9. Upgrade all text with `TextAnimate` / `TextReveal` / `NumberTicker` (Phase 6.4)
10. Upgrade navigation with `Dock` + `ShineBorder` (Phase 6.5)
11. Upgrade modals / sheets (Phase 6.6)
12. Upgrade loading states (Phase 6.7)
13. Add `Lens` to all product images (Phase 6.8)
14. Implement `VaultCard` shared element transitions (Phase 5.2)
15. Build the landing page 3D hero (Phase 7.1 + Phase 8)
16. Build the landing page scroll theatrics (Phase 7.2)
17. Build remaining landing page sections (Phase 7.3–7.7)
18. Add `VelocityGrid` to vault grid (Phase 4.6)
19. Add micro-interactions and hover states (Phase 9)
20. Performance audit — 60fps test on laptop + real device (Phase 10)
21. Refinement pass with 21st.dev Magic (Phase 11)
22. Final accessibility audit — keyboard nav + reduced motion

---

*The goal: when someone opens VAULTED, they feel like they walked into an Apple Store. Clean. Monochrome. Premium. But alive — everything breathes, everything responds, everything has depth. The kind of app people screenshot to show their friends.*
