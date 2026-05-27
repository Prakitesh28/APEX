"use client";
import { useApexStore } from "@/store/useApexStore";

export default function TopBar({ title = "APEX COMMAND" }: { title?: string }) {
  const user = useApexStore((state) => state.user);

  return (
    <div className="h-20 w-full flex items-center justify-between px-8 border-b border-white/5 bg-[#050505]/50 backdrop-blur-md sticky top-0 z-30">
      <div className="font-bebas text-3xl text-white tracking-widest uppercase">{title}</div>
      
      <div className="flex items-center gap-8">
        <div className="font-dm-mono text-xs text-gray-500 uppercase tracking-widest">
          WELCOME BACK, <span className="text-white">{user?.name || "OPERATIVE"}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--color-red-glow)] rounded-full shadow-[0_0_10px_var(--color-red-glow)] animate-pulse"></div>
          <span className="font-barlow text-[10px] tracking-widest uppercase text-[var(--color-red-dim)]">SYSTEM ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
