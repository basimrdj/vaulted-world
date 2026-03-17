"use client"

export function VaultBackground() {
  return (
    <div className="w-full h-full fixed inset-0 -z-10 overflow-hidden">
      <div className="w-full h-full absolute inset-0 bg-white" />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-gray-100/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "10s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "7s", animationDelay: "3s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-40 h-40 bg-gray-50/20 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "12s", animationDelay: "1.5s" }}
        />
      </div>
    </div>
  )
}
