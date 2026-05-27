"use client";

import { useEffect, useState } from "react";

export default function ParticleField() {
  const [particles, setParticles] = useState<{ id: number; left: string; delay: string; duration: string; size: string }[]>([]);

  useEffect(() => {
    // Generate 20 random particles only on client to avoid hydration mismatch
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${8 + Math.random() * 7}s`,
      size: `${Math.random() * 2 + 1}px`
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 bg-[var(--color-red-primary)] rounded-full opacity-0"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animation: `particleFloat ${p.duration} infinite ease-in-out ${p.delay}`,
            boxShadow: "0 0 10px var(--color-red-glow)",
          }}
        />
      ))}
    </div>
  );
}
