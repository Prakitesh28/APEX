"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import GlassCard from "./GlassCard";

interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  badge?: { text: string; color: "red" | "yellow" | "green" };
  decimals?: number;
}

export default function StatCard({ title, value, suffix = "", badge, decimals = 0 }: StatCardProps) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (numRef.current) {
      gsap.fromTo(numRef.current, 
        { innerHTML: 0 },
        { 
          innerHTML: value, 
          duration: 1.2, 
          ease: "power2.out",
          snap: { innerHTML: Math.pow(10, -decimals) },
          onUpdate: function() {
            if (numRef.current) {
              const val = Number(this.targets()[0].innerHTML).toFixed(decimals);
              numRef.current.innerHTML = val;
            }
          }
        }
      );
    }
  }, [value, decimals]);

  const badgeColors = {
    red: "text-[var(--color-red-glow)] border-[var(--color-red-dim)] bg-red-950/30",
    yellow: "text-yellow-500 border-yellow-900 bg-yellow-950/30",
    green: "text-green-500 border-green-900 bg-green-950/30"
  };

  return (
    <GlassCard className="p-6 hover:red-glow-box group">
      <h3 className="font-dm-mono text-sm text-[var(--color-text-secondary)] uppercase mb-2 group-hover:text-white transition-colors">{title}</h3>
      <div className="flex items-end gap-2">
        <span ref={numRef} className="font-ibm-plex text-5xl text-[var(--color-text-primary)]">0</span>
        <span className="font-ibm-plex text-2xl text-[var(--color-text-muted)] mb-1">{suffix}</span>
      </div>
      {badge && (
        <div className={`mt-4 inline-block font-barlow text-[11px] uppercase tracking-[0.15em] border px-2 py-1 rounded-sm ${badgeColors[badge.color]}`}>
          {badge.text}
        </div>
      )}
    </GlassCard>
  );
}
