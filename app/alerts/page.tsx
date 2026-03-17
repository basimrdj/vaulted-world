"use client"

import { VaultBackground } from "@/components/ui/vault-background"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Sidebar } from "@/components/navigation/sidebar"
import { useMediaQuery } from "@/hooks/use-media-query"
import { MOCK_ALERTS } from "@/lib/mock-data"
import type { Alert } from "@/stores/vault-store"
import { BlurFade } from "@/components/ui/blur-fade"
import { TextAnimate } from "@/components/ui/text-animate"

function getAlertIcon(type: Alert["type"]) {
  switch (type) {
    case "price_drop":
      return { icon: "↓", bg: "bg-[#F0F0F0]", text: "text-[#0A0A0A]" }
    case "low_stock":
      return { icon: "!", bg: "bg-[#F7F7F7]", text: "text-[#4A4A4A]" }
    case "suggestion":
      return { icon: "✦", bg: "bg-[#F0F0F0]", text: "text-[#6B6B6B]" }
    case "weekly_summary":
      return { icon: "◎", bg: "bg-[#FAFAFA]", text: "text-[#6B6B6B]" }
    default:
      return { icon: "•", bg: "bg-[#F0F0F0]", text: "text-[#6B6B6B]" }
  }
}

function groupAlertsByDate(alerts: Alert[]) {
  const today = new Date().toISOString().split("T")[0]
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  const todayAlerts: Alert[] = []
  const weekAlerts: Alert[] = []

  alerts.forEach((alert) => {
    const alertDate = new Date(alert.createdAt)
    const alertDateStr = alert.createdAt.split("T")[0]
    if (alertDateStr === today) {
      todayAlerts.push(alert)
    } else if (alertDate >= oneWeekAgo) {
      weekAlerts.push(alert)
    }
  })

  return { todayAlerts, weekAlerts }
}

export default function AlertsPage() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const shouldAnimate = isDesktop && !prefersReducedMotion
  const { todayAlerts, weekAlerts } = groupAlertsByDate(MOCK_ALERTS)

  return (
    <>
      <VaultBackground />
      {isDesktop && <Sidebar />}

      <main
        className={`min-h-screen pb-24 lg:pb-0 ${isDesktop ? "pl-[240px]" : ""}`}
      >
        <div className="max-w-2xl mx-auto px-5 py-8 lg:py-10">
          <BlurFade delay={0.1} inView disabled={!shouldAnimate}>
            <h1 className="font-display font-bold text-[28px] tracking-tight text-[#0A0A0A]">
              {shouldAnimate ? (
                <TextAnimate animation="blurIn" by="word">Alerts</TextAnimate>
              ) : (
                "Alerts"
              )}
            </h1>
          </BlurFade>

          <div className="mt-8 space-y-8">
            {todayAlerts.length > 0 && (
              <BlurFade delay={0.15} inView disabled={!shouldAnimate}>
                <section>
                <h2 className="text-[12px] font-semibold uppercase tracking-wider text-[#9A9A9A] mb-3 px-1">
                  Today
                </h2>
                <div className="space-y-3">
                  {todayAlerts.map((alert) => {
                    const alertStyle = getAlertIcon(alert.type)
                    return (
                      <article
                        key={alert.id}
                        className={`group/alert p-4 bg-white rounded-2xl relative transition-all duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:-translate-y-px cursor-pointer border ${!alert.read ? "border-[#E0E0E0] shadow-[0_1px_3px_rgba(0,0,0,0.04)]" : "border-[#E8E8E8]/60"}`}
                      >
                        {!alert.read && (
                          <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#0A0A0A]" />
                        )}
                        <div className="flex gap-3.5">
                          <div className={`w-10 h-10 rounded-xl ${alertStyle.bg} flex items-center justify-center shrink-0 text-sm font-semibold ${alertStyle.text}`}>
                            {alertStyle.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-[13px] text-[#0A0A0A] ${!alert.read ? "font-semibold" : "font-medium"}`}>
                              {alert.title}
                            </h3>
                            <p className="text-[13px] text-[#6B6B6B] mt-0.5 leading-relaxed">
                              {alert.description}
                            </p>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
                </section>
              </BlurFade>
            )}

            {weekAlerts.length > 0 && (
              <BlurFade delay={0.2} inView disabled={!shouldAnimate}>
                <section>
                <h2 className="text-[12px] font-semibold uppercase tracking-wider text-[#9A9A9A] mb-3 px-1">
                  This Week
                </h2>
                <div className="space-y-3">
                  {weekAlerts.map((alert) => {
                    const alertStyle = getAlertIcon(alert.type)
                    return (
                      <article
                        key={alert.id}
                        className={`group/alert p-4 bg-white rounded-2xl relative transition-all duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:-translate-y-px cursor-pointer border ${!alert.read ? "border-[#E0E0E0] shadow-[0_1px_3px_rgba(0,0,0,0.04)]" : "border-[#E8E8E8]/60"}`}
                      >
                        {!alert.read && (
                          <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#0A0A0A]" />
                        )}
                        <div className="flex gap-3.5">
                          <div className={`w-10 h-10 rounded-xl ${alertStyle.bg} flex items-center justify-center shrink-0 text-sm font-semibold ${alertStyle.text}`}>
                            {alertStyle.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-[13px] text-[#0A0A0A] ${!alert.read ? "font-semibold" : "font-medium"}`}>
                              {alert.title}
                            </h3>
                            <p className="text-[13px] text-[#6B6B6B] mt-0.5 leading-relaxed">
                              {alert.description}
                            </p>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
                </section>
              </BlurFade>
            )}

            {todayAlerts.length === 0 && weekAlerts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#F7F7F7] flex items-center justify-center mb-4">
                  <span className="text-2xl text-[#D0D0D0]">◎</span>
                </div>
                <p className="text-sm text-[#9A9A9A]">No alerts yet</p>
                <p className="text-xs text-[#B0B0B0] mt-1">We&apos;ll notify you when prices drop</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {!isDesktop && <BottomNav />}
    </>
  )
}
