

# VAULTED — Cinematic 3D Landing Page

## Audit Result
The current page is a blank placeholder. There is no vault, no 3D scene, no scroll system, no hero composition. We're building from zero, which is actually ideal — no legacy decisions to work around.

## Technical Architecture Decision
**React Three Fiber** owns the hero. Not Spline. Reasons:
- We need scroll-linked camera choreography (GSAP ScrollTrigger integration)
- We need custom physical materials (transmission glass, brushed metal with clearcoat)
- We need postprocessing control (bloom, vignette, film grain)
- We need tight DOM↔WebGL integration for text occluding behind the vault
- Spline's runtime is too heavy and opaque for this level of control

## The Build

### 1. Foundation — R3F Scene + Vault Object
- Full-viewport fixed Canvas with `#050505` background
- Procedural vault geometry (box body + glass door panel) — no GLB dependency
- **Brushed titanium** body: `MeshPhysicalMaterial` with metalness 1, roughness 0.2, clearcoat 1
- **Translucent glass door**: `MeshPhysicalMaterial` with transmission 0.9, thickness 0.5, IOR 1.5
- Internal blue-white **data core** glow (emissive sphere, toneMapped false)
- Environment map (`city` preset) for razor-sharp reflections on metal edges
- Cinematic lighting: key spotlight + cool blue rim light + contact shadows

### 2. Postprocessing — Atmosphere
- Bloom (restrained, luminance threshold 1, intensity 0.5) for the core glow
- Film grain (opacity 0.05) for cinematic texture
- Vignette for frame focus on the vault
- No particle systems, no fog abuse

### 3. Scroll System — Lenis + GSAP ScrollTrigger
- Lenis for buttery smooth scroll
- Page is 400vh+ tall with pinned scroll sections
- **Scroll Sequence:**
  1. **Hero (0-100vh):** Vault closed, monolithic, centered. Title "VAULTED" large, subtitle, CTA. Subtle pointer-aware parallax on vault.
  2. **The Reveal (100-200vh):** Camera pushes in. Door begins mechanical rotation (heavy, damped). Internal glow intensifies.
  3. **The Interior (200-300vh):** We're close to the vault interior. "Security" feature text appears. Data core pulses.
  4. **The Scale (300-400vh):** Camera pulls back. Supporting content fades in. Final CTA.

### 4. Hero DOM Composition
- "VAULTED" in ultra-wide tracked white type, composited to feel *behind* the vault glass
- Subtitle: "The AI desire engine." in muted gray
- Pill CTA: "Open Your Vault" — dark pill with subtle hover glow
- Trust avatars + "JOIN 50,000+ SMART SHOPPERS" below CTA
- All DOM is `pointer-events-none` except interactive elements, layered over the fixed canvas

### 5. Motion Physics
- Vault pointer response: spring-damped with high mass (feels heavy, resists, settles)
- Scroll-linked door rotation: GSAP with `power2.inOut`, feels mechanical
- Camera: smooth interpolation, never snappy
- Text entrances: staggered fade-up with weight

### 6. Mobile Fallback
- Reduced postprocessing (no bloom, no grain)
- Static vault angle (no pointer tracking)
- Simplified scroll (fewer pinned states)
- Canvas DPR capped at 1 on mobile

### 7. Performance Guardrails
- Single canvas, single scene
- `dpr={[1, 2]}`, antialias off, stencil off
- Lazy-load canvas below fold content
- `requestAnimationFrame`-aware scroll binding
- No unnecessary re-renders (memo'd components)

## Tech Stack
- `@react-three/fiber` ^8.18 + `three` ^0.160
- `@react-three/drei` ^9.122 + `@react-three/postprocessing`
- `gsap` + `@gsap/react` + ScrollTrigger
- `lenis` for smooth scroll
- Tailwind for DOM styling

