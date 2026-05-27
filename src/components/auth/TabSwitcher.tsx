"use client"

import { motion } from "framer-motion"

interface Props {
  activeTab: "login" | "register"
  onTabChange: (tab: "login" | "register") => void
}

export default function TabSwitcher({ activeTab, onTabChange }: Props) {
  const tabs = [
    { id: "login" as const, label: "LOGIN" },
    { id: "register" as const, label: "REGISTER" },
  ]

  return (
    <div className="flex mb-8 border-b border-white/10 relative">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative px-6 py-3 text-sm tracking-[0.2em] transition-colors duration-300 ${
            activeTab === tab.id
              ? "text-[#f5f5f5]"
              : "text-white/40 hover:text-white/60"
          }`}
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff1e1e]"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
