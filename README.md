# Claude Code Igloo-Style Setup Pack

This pack is designed for a **Next.js + React + GSAP + Lenis + React Three Fiber + Spline** workflow aimed at high-end cinematic interactive websites.

## Included
- `.mcp.json`
- `CLAUDE.md`
- `.claude/skills/scene-architect/SKILL.md`
- `.claude/skills/scroll-director/SKILL.md`
- `.claude/skills/shader-author/SKILL.md`
- `.claude/skills/r3f-builder/SKILL.md`
- `.claude/skills/transition-polish/SKILL.md`
- `.claude/skills/perf-auditor/SKILL.md`

## What this pack gives you
- A project-level Claude Code memory file
- A starter MCP config that is safe to use immediately
- Specialized skills for 3D architecture, scroll choreography, shaders, transitions, and performance

## Included MCP servers in `.mcp.json`
These are intentionally the safest “works right now” defaults:
- `playwright` for visual QA and browser testing
- `shadcn` for quick DOM-side component scaffolding

## Strongly recommended add-ons

### 1) Context7
Best for up-to-date library docs.

Recommended auto-setup:
```bash
npx ctx7 setup --claude
```

Or add manually later if you prefer.

### 2) Figma
Preferred install path:
```bash
claude plugin install figma@claude-plugins-official
```

### 3) Optional user-scoped Context7 remote MCP
If you want Context7 available across all projects:
```bash
claude mcp add --scope user --header "CONTEXT7_API_KEY: YOUR_API_KEY" --transport http context7 https://mcp.context7.com/mcp
```

## Suggested stack
- Next.js App Router
- React
- Tailwind CSS
- Motion
- GSAP + ScrollTrigger
- Lenis
- Three.js + @react-three/fiber + @react-three/drei
- @react-three/postprocessing
- Spline
- Playwright

## Suggested first prompts inside Claude Code
- `Use /scene-architect to design the architecture for an Igloo-level monochrome landing page with a single shared WebGL canvas.`
- `Use /scroll-director to design a 4-section scroll narrative with pinned GSAP scenes and mobile fallbacks.`
- `Use /r3f-builder to scaffold the shared canvas, postprocessing, and scene slots for a Next.js App Router project.`
- `Use /shader-author to create a monochrome liquid-metal hover shader for product cards with a mobile fallback.`
- `Use /transition-polish to build route transitions that feel native without introducing fragile routing hacks.`
- `Use /perf-auditor to review the implementation and cut frame drops before polish.`

## Notes
- This pack is intentionally practical rather than maximalist nonsense.
- The skills are written so Claude can think like a creative developer while still protecting performance and maintainability.
