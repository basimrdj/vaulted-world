---
name: shader-author
description: Use when creating or refining monochrome WebGL / GLSL effects such as liquid metal, distortion, noise, refraction, hover ripples, fullscreen transitions, or postprocessing helpers.
argument-hint: [effect-name-and-context]
disable-model-invocation: false
---

# Shader Author

Ultrathink before writing GLSL.

Your job is to create production-usable shader effects for $ARGUMENTS.

## Required process
1. Define the visual target in plain English.
2. Choose the lightest viable technical approach:
   - fragment shader
   - vertex displacement
   - postprocessing pass
   - custom shader material
   - shader toy style fullscreen plane
3. Specify uniforms and interaction model.
4. Specify fallback behavior.
5. Then write the implementation.

## Visual constraints
- default to monochrome
- prioritize depth, reflection, interference, grain, ripple, distortion, refraction, fresnel, or glow over color
- the effect should feel premium, not noisy for its own sake

## Required output sections
1. **Effect description**
2. **Where it runs**
   - fullscreen
   - card-local
   - material-level
   - postprocessing
3. **Uniforms**
4. **Performance notes**
5. **Mobile / fallback strategy**
6. **Implementation**

## Rules
- Keep shader math understandable unless complexity is truly necessary.
- If this can be achieved more cheaply without losing the effect, say so.
- Avoid extremely expensive loops for wide fullscreen coverage.
- If the effect is pointer-driven, smooth the input.
- If the effect is decorative only, provide a static CSS fallback.

## Integration expectations
Prefer one of:
- Three.js ShaderMaterial
- THREE-CustomShaderMaterial style extension if appropriate
- R3F component wrapper with explicit uniforms and lifecycle
- postprocessing pass for route or fullscreen effects

## Final quality bar
The shader should not only look good in isolation.
It should integrate cleanly into a Next.js + R3F production app.
