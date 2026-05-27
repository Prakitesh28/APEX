"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorRimLight() {
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rawX = useMotionValue(-1000);
  const rawY = useMotionValue(-1000);
  const x = useSpring(rawX, { stiffness: 120, damping: 18, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 120, damping: 18, mass: 0.5 });
  const opacity = useMotionValue(0);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      rawX.set(e.clientX - 300);
      rawY.set(e.clientY - 300);
      opacity.set(0.6);

      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      fadeTimer.current = setTimeout(() => {
        opacity.set(0);
      }, 400);
    };

    window.addEventListener("mousemove", handleMouse);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, [rawX, rawY, opacity]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none mix-blend-screen z-[9999]"
      style={{
        x,
        y,
        opacity,
        width: 600,
        height: 600,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(255,40,40,0.35) 0%, rgba(255,20,20,0.12) 30%, rgba(255,0,0,0.03) 55%, transparent 70%)",
        willChange: "transform, opacity",
      }}
    />
  );
}
