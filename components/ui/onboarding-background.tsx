"use client"

export function OnboardingBackground() {
  return (
    <div className="w-full h-full fixed inset-0 -z-10 overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0">
        <div
          className="absolute w-[600px] h-[600px] top-[-10%] left-[-10%] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] bottom-[-5%] right-[-5%] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
            animation: "float 15s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] top-[40%] left-[50%] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)",
            animation: "float 25s ease-in-out infinite",
            animationDelay: "5s",
          }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-32 h-32 bg-white/[0.02] rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "10s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/[0.015] rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "7s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-20 h-20 bg-white/[0.01] rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "13s", animationDelay: "0.5s" }}
        />
      </div>
    </div>
  )
}
