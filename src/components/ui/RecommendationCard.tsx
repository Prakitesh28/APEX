"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Recommendation } from "@/lib/rules";
import { ChevronDown } from "lucide-react";

export default function RecommendationCard({ rec }: { rec: Recommendation }) {
  const [expanded, setExpanded] = useState(false);

  const priorityColors = {
    critical: "bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]",
    high: "bg-orange-500",
    medium: "bg-yellow-500",
    low: "bg-green-500"
  };

  return (
    <motion.div 
      layout
      onClick={() => setExpanded(!expanded)}
      className="glass-panel p-4 rounded-sm border border-white/5 cursor-pointer hover:border-white/20 transition-colors mb-3 group"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-black rounded-sm border border-white/10 flex items-center justify-center text-xl group-hover:border-[var(--color-red-dim)] transition-colors">
          {rec.icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${priorityColors[rec.priority]}`}></div>
            <span className="font-barlow text-[11px] uppercase tracking-widest text-[var(--color-text-secondary)]">{rec.category}</span>
          </div>
          <h4 className="font-bebas text-2xl text-[var(--color-text-primary)] tracking-wide">{rec.title}</h4>
        </div>

        <motion.div animate={{ rotate: expanded ? 180 : 0 }} className="text-gray-500">
          <ChevronDown size={20} />
        </motion.div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-white/5">
              <p className="font-dm-mono text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {rec.description}
              </p>
              <div className="mt-4 font-barlow text-xs text-[var(--color-red-glow)] uppercase tracking-widest">
                TIMEFRAME: {rec.timeframe}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
