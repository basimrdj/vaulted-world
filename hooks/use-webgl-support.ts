"use client"

import { useSyncExternalStore } from "react"

let cachedWebGLSupport: boolean | null = null

function detectWebGLSupport() {
  if (cachedWebGLSupport !== null) {
    return cachedWebGLSupport
  }

  if (typeof window === "undefined") return false

  try {
    const canvas = document.createElement("canvas")
    const gl =
      canvas.getContext("webgl2", { alpha: true }) ||
      canvas.getContext("webgl", { alpha: true }) ||
      canvas.getContext("experimental-webgl", { alpha: true })

    if (!gl) {
      cachedWebGLSupport = false
      return false
    }

    const attrs =
      "getContextAttributes" in gl ? gl.getContextAttributes() : null
    const supported = attrs !== null

    // Release the probe context so repeated checks do not exhaust context limits.
    if ("getExtension" in gl) {
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }

    cachedWebGLSupport = supported
    return supported
  } catch {
    cachedWebGLSupport = false
    return false
  }
}

export function useWebGLSupport() {
  return useSyncExternalStore(
    () => () => {},
    detectWebGLSupport,
    () => false
  )
}
