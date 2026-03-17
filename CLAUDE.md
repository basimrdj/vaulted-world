# CLAUDE.md

## Mission
Build a cinematic, monochrome, WebGL-forward website that can credibly approach the feeling of high-end creative-development studios such as Igloo-level interactive work, while remaining maintainable, performant, and production-safe.

## Working style
- Think like a creative engineer, not a template assembler.
- Prefer one strong architectural decision over five decorative hacks.
- Preserve visual restraint: black, white, greyscale, light, depth, motion, blur, refraction, shadow, and contrast do the work.
- Every major animation must justify itself functionally or emotionally.
- Avoid generic “startup landing page” tropes unless explicitly requested.
- Do not introduce bright colors unless the user explicitly asks.
- Before writing code for a major section, decide whether it belongs in:
  1. DOM + CSS/Tailwind
  2. Motion / GSAP choreography
  3. R3F / Three.js scene graph
  4. Spline-authored asset embedded into the experience
  5. full-screen shader / postprocessing layer

## Default stack
- Framework: Next.js App Router
- UI runtime: React
- Styling: Tailwind + CSS variables
- Motion: Motion for shared layout / UI transitions
- Scroll choreography: GSAP + ScrollTrigger + Lenis
- 3D: Three.js + @react-three/fiber + @react-three/drei
- Postprocessing: @react-three/postprocessing
- 3D authoring: Spline for rapid scene prototyping, then graduate to custom R3F when deeper control is needed
- Testing / visual QA: Playwright
- Component acceleration for DOM-side UI: shadcn MCP when it helps, but do not let it dictate the visual language

## Hard rules
- Prefer a single shared R3F Canvas architecture when feasible.
- Do not spawn multiple heavy canvases without a strong reason.
- Treat mobile as a first-class target with graceful degradation:
  - reduce particles
  - disable expensive postprocessing
  - replace custom shader flourishes with lighter fallbacks when necessary
- Respect reduced motion preferences.
- Lazy load all WebGL-heavy sections.
- Keep the app shippable: no architecture that depends on fragile undocumented hacks.
- If a transition can be handled cleanly with Motion and Next architecture, do not force Barba.js into the stack.
- For route transitions, prioritize reliability and cohesion over novelty.

## Decision rubric
When asked to implement a feature, decide in this order:
1. What is the user's emotional goal?
2. What is the lightest technical way to achieve it convincingly?
3. What is the fallback for mobile / reduced motion / low-power devices?
4. What are the performance risks?
5. What should be reusable versus bespoke?

## Performance budgets
- Default to 60fps targets on modern laptops and recent phones.
- Avoid large uncompressed textures.
- Prefer GLB/GLTF assets that can be compressed.
- Keep shader complexity proportional to screen coverage.
- Large full-screen shaders must justify their cost.
- Profile first if interaction feels “expensive” in the bad way.

## Default delivery pattern
For medium or large requests:
1. brief architecture call
2. file plan
3. implementation
4. fallback / performance pass
5. test / QA pass
6. concise summary of what changed

## Tooling rules
- Use Context7 whenever library/API details could be stale or uncertain.
- Use Playwright to verify animation flows, responsive layout, route transitions, and regressions.
- Use Figma context when designs or frames are available.
- Use shadcn MCP selectively for scaffolding non-WebGL UI, then refine manually.

## Preferred output style
When producing code:
- keep components modular
- separate scene logic from UI logic
- avoid giant monolithic files
- annotate only where the code would otherwise be unclear
- include fallback behavior and perf notes when relevant

## Quality bar
Every major section should answer:
- Why this motion?
- Why this depth?
- Why this layering?
- Why this implementation?
If the answer is “because it looks cool,” push further until there is a stronger reason.
