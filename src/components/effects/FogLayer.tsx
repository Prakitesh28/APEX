"use client";

export default function FogLayer() {
  return (
    <div className="absolute inset-0 w-full h-full mix-blend-screen overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[var(--color-red-dim)] blur-[150px] rounded-full animate-fog opacity-20"></div>
      <div className="absolute top-[20%] right-[-10%] w-[100%] h-[120%] bg-[var(--color-red-dim)] blur-[150px] rounded-full animate-fog opacity-15" style={{ animationDelay: "-10s" }}></div>
    </div>
  );
}
