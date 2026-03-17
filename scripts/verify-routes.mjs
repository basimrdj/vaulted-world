import fs from "node:fs/promises"
import path from "node:path"
import { chromium } from "playwright"

const BASE_URL = process.env.VERIFY_BASE_URL || "http://localhost:3000"
const OUT_DIR = path.resolve("artifacts", "route-audit")

const ROUTES = [
  "/",
  "/vault",
  "/vault/1",
  "/boards",
  "/alerts",
  "/premium",
  "/profile",
  "/onboarding",
]

const WAIT_MS_BY_ROUTE = {
  "/": 6500,
}

function routeToFilename(route) {
  if (route === "/") return "home"
  return route.replaceAll("/", "_").replace(/^_/, "")
}

async function collectPageMeasurements(page) {
  return page.evaluate(() => {
    const title = document.querySelector("#hero-vaulted-title")
    const morph = document.querySelector("#hero-morphing-text")
    const canvases = Array.from(document.querySelectorAll("canvas"))
    const visibleCanvasCount = canvases.filter((canvas) => {
      const rect = canvas.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0
    }).length

    return {
      bodyClassName: document.body.className,
      textSample: document.body.innerText.slice(0, 240),
      heroTitleText: title?.textContent?.trim() ?? null,
      heroTitleFontSize: title ? getComputedStyle(title).fontSize : null,
      morphingTextFontSize: morph ? getComputedStyle(morph).fontSize : null,
      morphingTextHeight: morph ? getComputedStyle(morph).height : null,
      canvasCount: canvases.length,
      visibleCanvasCount,
      hasSplineIframe: Boolean(document.querySelector('iframe[src*="spline"]')),
      htmlLength: document.documentElement.outerHTML.length,
    }
  })
}

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1512, height: 982 },
  })
  const page = await context.newPage()

  const report = []

  for (const route of ROUTES) {
    const pageErrors = new Set()
    const consoleErrors = new Set()
    const consoleWarnings = new Set()

    const onPageError = (error) => pageErrors.add(String(error))
    const onConsole = (msg) => {
      const type = msg.type()
      const text = msg.text()
      if (type === "error") consoleErrors.add(text)
      if (type === "warning") consoleWarnings.add(text)
    }

    page.on("pageerror", onPageError)
    page.on("console", onConsole)

    const startedAt = Date.now()
    let statusCode = null
    try {
      const response = await page.goto(BASE_URL + route, {
        waitUntil: "domcontentloaded",
        timeout: 30_000,
      })
      statusCode = response?.status() ?? null
      await page.waitForTimeout(WAIT_MS_BY_ROUTE[route] ?? 4_000)
      await page.waitForLoadState("networkidle", { timeout: 8_000 }).catch(
        () => {}
      )
    } catch (error) {
      consoleErrors.add("NAVIGATION_FAILED: " + String(error))
    }

    const screenshotPath = path.join(OUT_DIR, routeToFilename(route) + ".png")
    await page.screenshot({ path: screenshotPath, fullPage: true })

    const measurements = await collectPageMeasurements(page).catch((error) => ({
      measurementError: String(error),
    }))

    report.push({
      route,
      statusCode,
      durationMs: Date.now() - startedAt,
      pageErrors: Array.from(pageErrors).slice(0, 20),
      consoleErrors: Array.from(consoleErrors).slice(0, 20),
      consoleWarnings: Array.from(consoleWarnings).slice(0, 20),
      measurements,
      screenshotPath,
    })

    page.off("pageerror", onPageError)
    page.off("console", onConsole)
  }

  await browser.close()
  const reportPath = path.join(OUT_DIR, "report.json")
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), "utf8")
  console.log(reportPath)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
