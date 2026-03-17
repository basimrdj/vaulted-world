import type { Metadata, Viewport } from "next"
import { Urbanist, Bodoni_Moda, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "VAULTED — Your Desires, Organized",
  description:
    "The AI-powered desire engine that turns screenshots, photos, and links into an intelligent living wishlist. Track prices, find deals, organize beautifully.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VAULTED",
  },
  openGraph: {
    title: "VAULTED — Your Desires, Organized",
    description:
      "Your screenshots have dreams. We organize them. AI-powered wishlists, price tracking, and smart boards.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body
        className={`${urbanist.variable} ${bodoniModa.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-urbanist), sans-serif" }}
      >
        {children}
      </body>
    </html>
  )
}
