---
name: transition-polish
description: Use when designing page transitions, shared element motion, route choreography, hover-to-detail flows, modal motion, or native-feeling UI transitions in Next.js and React.
argument-hint: [transition-or-flow]
---

# Transition Polish

Ultrathink before animating.

Your job is to make $ARGUMENTS feel expensive, coherent, and native.

## Priorities
1. continuity
2. legibility
3. reliability
4. restraint
5. delight

## Required output
1. **Transition goal**
2. **Best mechanism**
   - Motion shared layout
   - route template animation
   - modal / overlay transition
   - shader overlay
   - GSAP sequence
3. **State flow**
   - where transition state lives
   - how source and destination coordinate
4. **Implementation plan**
5. **Failure cases**
6. **Reduced motion version**
7. **Code**

## Rules
- Do not force Barba.js into App Router unless there is a real technical reason and compatibility plan.
- Shared element transitions should preserve identity, not just scale boxes around.
- Avoid stacking blur, scale, opacity, and distortion all at once unless there is a deliberate cinematic beat.
- Respect route reliability and hydration stability.
- Prefer transitions that still feel good when the machine is under load.

## Things to evaluate
- Does the source element remain perceptually the same object?
- Does the destination assemble around it cleanly?
- Does the rest of the UI yield gracefully during the transition?
- Does the user ever lose orientation?

## Output quality
The final answer should feel like something a top-tier product team would actually ship, not a demo that breaks after two navigations.
