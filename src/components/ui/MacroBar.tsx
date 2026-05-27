"use client";
import { motion } from "framer-motion";

interface MacroBarProps {
  label: string;
  grams: number;
  percentage: number;
  delay?: number;
}

export default function MacroBar({ label, grams, percentage, delay = 0 }: MacroBarProps) {
  return (
    <div className="w-full mb-4 last:mb-0">
      <div className="flex justify-between font-dm-mono text-xs uppercase mb-2">
        <span className="text-[var(--color-text-secondary)]">{percentage}% <span className="text-[var(--color-text-primary)] ml-2">{label}</span></span>
        <span className="text-[var(--color-text-primary)]">{grams}G</span>
      </div>
      <div className="w-full h-2 bg-black rounded-sm overflow-hidden border border-white/5 relative">
        <motion.div 
          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[var(--color-red-dim)] to-[var(--color-red-glow)]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeInOut", delay }}
        >
          {/* Animated scanline effect inside the bar */}
          <motion.div 
            className="absolute top-0 bottom-0 left-0 w-10 bg-white/30 blur-[2px]"
            animate={{ x: ["-100%", "500%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
