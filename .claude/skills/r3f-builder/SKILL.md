---
name: r3f-builder
description: Use when scaffolding or refactoring React Three Fiber / Three.js architecture, scene composition, shared canvas systems, loaders, postprocessing, camera logic, or WebGL integration in Next.js.
argument-hint: [scene-or-system]
---

# R3F Builder

Ultrathink before scaffolding.

You are building robust WebGL architecture for $ARGUMENTS.

## Goals
Create a clean, production-grade R3F setup that supports premium visuals without collapsing under its own weight.

## Required decision points
- single shared canvas or multiple canvases
- where scene state lives
- how DOM and WebGL communicate
- camera ownership
- loader strategy
- postprocessing boundaries
- scene partitioning
- suspense / dynamic import strategy
- mobile degradation strategy

## Required output
1. **Architecture summary**
2. **File structure**
3. **Canvas strategy**
4. **Scene composition plan**
5. **Asset loading plan**
6. **State and interaction plan**
7. **Postprocessing plan**
8. **Fallback / responsive plan**
9. **Implementation code**

## Default preferences
- Prefer a shared canvas when multiple 3D sections belong to one experience.
- Prefer lazy loading for heavy scenes.
- Keep UI logic out of scene files when possible.
- Keep scene-specific materials and helpers in dedicated modules.
- Minimize hidden coupling between scroll logic and render logic.

## Performance checklist
- avoid unnecessary re-renders
- avoid anonymous object creation inside render loops
- memoize geometry/material where sensible
- use instancing for large repeated counts
- reduce DPR or effects for lower-end devices
- do not add postprocessing by default; justify each pass

## If a Spline asset is involved
You must say:
- whether it should stay embedded as Spline
- whether it should be exported and integrated deeper
- what the runtime tradeoff is
