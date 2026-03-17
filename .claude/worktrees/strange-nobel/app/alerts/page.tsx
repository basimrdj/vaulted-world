"use client"

import { VaultBackground } from "@/components/ui/vault-background"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Sidebar } from "@/components/navigation/sidebar"
import { useMediaQuery } from "@/hooks/use-media-query"
import { MOCK_ALERTS } from "@/lib/mock-data"
import type { Alert } from "@/stores/vault-store"

function getAlertIcon(type: Alert["type"]) {
  switch (type) {
    case "price_drop":
      return "↓"
    case "low_stock":
      return "!"
    case "suggestion":
      return "✨"
    case "weekly_summary":
      return "📊"
    default:
      return "•"
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
  const { todayAlerts, weekAlerts } = groupAlertsByDate(MOCK_ALERTS)

  return (
    <>
      <VaultBackground />
      {isDesktop && <Sidebar />}

      <main
        className={`min-h-screen pb-20 lg:pb-0 ${isDesktop ? "pl-[220px]" : ""}`}
      >
        <div className="max-w-2xl mx-auto px-4 py-6 lg:py-8">
          <h1 className="font-display font-bold text-2xl text-[#0A0A0A]">
            Alerts
          </h1>

          <div className="mt-6 space-y-6">
            {todayAlerts.length > 0 && (
              <section>
                <h2 className="text-sm font-medium text-[#9A9A9A] mb-3">
                  Today
                </h2>
                <div className="space-y-3">
                  {todayAlerts.map((alert) => (
                    <article
                      key={alert.id}
                      className="p-4 bg-white border border-[#E8E8E8] rounded-xl relative"
                    >
                      {!alert.read && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#0A0A0A]" />
                      )}
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F0F0F0] flex items-center justify-center shrink-0 text-sm">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-[#0A0A0A]">
                            {alert.title}
                          </h3>
                          <p className="text-sm text-[#6B6B6B] mt-0.5">
                            {alert.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {weekAlerts.length > 0 && (
              <section>
                <h2 className="text-sm font-medium text-[#9A9A9A] mb-3">
                  This Week
                </h2>
                <div className="space-y-3">
                  {weekAlerts.map((alert) => (
                    <article
                      key={alert.id}
                      className="p-4 bg-white border border-[#E8E8E8] rounded-xl relative"
                    >
                      {!alert.read && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#0A0A0A]" />
                      )}
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F0F0F0] flex items-center justify-center shrink-0 text-sm">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-[#0A0A0A]">
                            {alert.title}
                          </h3>
                          <p className="text-sm text-[#6B6B6B] mt-0.5">
                            {alert.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {todayAlerts.length === 0 && weekAlerts.length === 0 && (
              <p className="text-sm text-[#9A9A9A] text-center py-12">
                No alerts yet
              </p>
            )}
          </div>
        </div>
      </main>

      {!isDesktop && <BottomNav />}
    </>
  )
}
