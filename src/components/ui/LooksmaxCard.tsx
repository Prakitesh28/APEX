"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface LooksmaxCardProps {
  category: string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "ELITE";
  title: string;
  timeframe: string;
  description: string;
  icon: string;
}

export default function LooksmaxCard({ category, difficulty, title, timeframe, description, icon }: LooksmaxCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const diffColors: Record<string, string> = {
    EASY: "text-green-500 border-green-900",
    MEDIUM: "text-yellow-500 border-yellow-900",
    HARD: "text-orange-500 border-orange-900",
    ELITE: "text-red-500 border-red-900 bg-red-950/30"
  };

  const eliteGlow = difficulty === "ELITE" ? "shadow-[0_0_8px_rgba(239,68,68,0.3)]" : "";

  return (
    <motion.div
      layout
      className="glass-panel p-6 rounded-sm relative group cursor-pointer hover:red-glow-box transition-all hover:-translate-y-1"
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="font-barlow text-[11px] uppercase tracking-widest text-[var(--color-text-secondary)]">{category}</div>
        <div className={`font-barlow text-[11px] uppercase tracking-widest border px-2 py-1 rounded-sm ${diffColors[difficulty]} ${eliteGlow}`}>
          {difficulty}
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform inline-block">{icon}</div>
        <h3 className="font-barlow text-2xl uppercase tracking-wider text-white mb-2">{title}</h3>
        <p className="font-dm-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">{timeframe}</p>
      </div>

      <AnimatePresence>
        {isHovered && !expanded && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full w-[calc(100%-24px)] bg-black/90 border border-white/10 rounded-sm p-2.5 text-xs font-dm-mono text-gray-300 z-20 pointer-events-none"
          >
            {description.length > 80 ? description.slice(0, 80) + "..." : description}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-white/10 text-sm font-dm-mono text-gray-400">
              {description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!expanded && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-600 group-hover:text-[var(--color-red-glow)] transition-colors">
          <ChevronDown size={16} />
        </div>
      )}
    </motion.div>
  );
}
