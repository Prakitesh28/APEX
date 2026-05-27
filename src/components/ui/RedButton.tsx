"use client";
import { useState, useEffect } from "react";

export default function RedButton({ children, onClick, className = "", type = "button" }: { children: React.ReactNode, onClick?: () => void, className?: string, type?: "button" | "submit" | "reset" }) {
  const [dataReadout, setDataReadout] = useState("0000");

  useEffect(() => {
    const interval = setInterval(() => {
      setDataReadout(Math.floor(1000 + Math.random() * 9000).toString());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <button
      type={type}
      onClick={onClick}
      className={`group relative bg-[var(--bg-void)] text-[var(--color-red-primary)] font-ibm-plex font-bold text-sm uppercase px-10 py-5 rounded-none border border-[var(--color-red-dim)] hover:border-[var(--color-red-primary)] transition-none overflow-hidden ${className}`}
    >
      {/* Background Glitch on Hover */}
      <div className="absolute inset-0 bg-[var(--color-red-primary)] opacity-0 group-hover:opacity-10 group-hover:animate-glitch transition-none" />

      {/* Sonar Ring Expansion on Hover */}
      <div className="absolute inset-0 m-auto w-0 h-0 rounded-full border border-[var(--color-red-primary)] opacity-0 group-hover:w-[200%] group-hover:h-[500%] group-hover:opacity-20 transition-all duration-700 ease-out" />

      {/* Crosshair Corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-transparent group-hover:border-[var(--color-red-primary)] transition-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-transparent group-hover:border-[var(--color-red-primary)] transition-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-transparent group-hover:border-[var(--color-red-primary)] transition-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-transparent group-hover:border-[var(--color-red-primary)] transition-none" />

      <div className="relative z-10 flex items-center justify-between gap-6">
        <span className="group-hover:animate-glitch">{children}</span>
        <span className="font-dm-mono text-xs text-[var(--color-red-dim)] group-hover:text-[var(--color-red-primary)]">
          [{dataReadout}]
        </span>
      </div>
    </button>
  );
}
