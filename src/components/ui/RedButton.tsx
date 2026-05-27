"use client";
import { motion } from "framer-motion";

export default function RedButton({ children, onClick, className = "", type = "button" }: { children: React.ReactNode, onClick?: () => void, className?: string, type?: "button" | "submit" | "reset" }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-[var(--color-red-primary)] text-black font-bebas text-2xl uppercase px-8 py-4 rounded-sm hover:bg-[var(--color-red-glow)] transition-colors red-glow-box hover:shadow-[0_0_60px_rgba(220,38,38,0.8)] border border-[var(--color-red-glow)] ${className}`}
    >
      {children}
    </motion.button>
  );
}
