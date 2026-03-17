"use client"

import { motion } from "framer-motion"

const features = [
  {
    icon: "🔍",
    title: "AI Vision",
    description:
      "Screenshot anything from any app. Our AI identifies the product, finds it across 50+ retailers, and saves it to your vault.",
  },
  {
    icon: "📉",
    title: "Price Brain",
    description:
      "Never pay full price again. Track prices across retailers, get drop alerts, and let AI tell you the best time to buy.",
  },
  {
    icon: "🎨",
    title: "Dream Boards",
    description:
      "Turn saves into plans. Create moodboards, plan outfits, design rooms. AI suggests what's missing to complete your vision.",
  },
]

export function Features() {
  return (
    <section className="px-6 py-24">
      <motion.h2
        className="font-display mb-16 text-center text-4xl font-bold text-[#0A0A0A]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        Everything you need.
      </motion.h2>

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="rounded-xl border border-[#E8E8E8] bg-[#F7F7F7] p-8 transition-transform hover:scale-[1.02] hover:shadow-lg"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="mb-4 text-4xl">{feature.icon}</div>
            <h3 className="font-sans text-xl font-semibold text-[#0A0A0A]">
              {feature.title}
            </h3>
            <p className="mt-3 font-sans text-base font-normal leading-relaxed text-[#6B6B6B]">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
