"use client";

export default function ScanLine() {
  return (
    <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--color-red-glow)] shadow-[0_0_15px_rgba(220,38,38,1)] z-50 pointer-events-none" style={{ animation: "scanDown 2s ease-in-out" }}></div>
  );
}
