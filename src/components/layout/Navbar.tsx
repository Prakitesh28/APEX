"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Sparkles, BookOpen, LayoutDashboard, Target, LineChart, Users } from "lucide-react";

const navItems = [
  { name: "Features", href: "/#features", icon: Sparkles },
  { name: "Programs", href: "/#programs", icon: BookOpen },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Looksmax", href: "/looksmax", icon: Target },
  { name: "Progress", href: "/progress", icon: LineChart },
  { name: "Community", href: "/#community", icon: Users },
];

function MagneticWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.25);
      y.set((e.clientY - centerY) * 0.25);
    },
    [x, y],
  );

  const handlePointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <motion.div
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-red-glow)] to-transparent pointer-events-none"
        />

        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 bg-[var(--color-red-dim)] rounded-sm flex items-center justify-center transform rotate-45 shadow-[0_0_15px_rgba(139,0,0,0.8)] group-hover:shadow-[0_0_25px_rgba(220,38,38,0.8)] transition-shadow duration-300">
                <div className="w-4 h-4 bg-black rounded-sm transform -rotate-45" />
              </div>
              <span className="font-bebas text-3xl tracking-widest text-glow">APEX</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 font-sans font-medium text-sm text-gray-300">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <MagneticWrapper key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 hover:text-white transition-colors duration-200 uppercase tracking-wider"
                  >
                    <Icon size={14} className="opacity-70" />
                    {item.name}
                  </Link>
                </MagneticWrapper>
              );
            })}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Link
                href="/onboarding"
                className="bg-[var(--color-red-primary)] text-black font-bold px-6 py-2.5 rounded-sm uppercase tracking-widest text-sm inline-block
                  shadow-[0_0_20px_rgba(220,38,38,0.4),0_0_40px_rgba(220,38,38,0.1)]
                  hover:shadow-[0_0_30px_rgba(220,38,38,0.7),0_0_60px_rgba(220,38,38,0.3)]
                  hover:bg-[var(--color-red-glow)]
                  transition-all duration-300"
              >
                START TRAINING
              </Link>
            </motion.div>
          </div>

          <button
            className="md:hidden text-white z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="absolute top-0 right-0 h-full w-72 bg-black/95 backdrop-blur-xl border-l border-white/5 p-8 flex flex-col gap-6"
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-[var(--color-red-dim)] rounded-sm flex items-center justify-center transform rotate-45 shadow-[0_0_15px_rgba(139,0,0,0.8)]">
                  <div className="w-4 h-4 bg-black rounded-sm transform -rotate-45" />
                </div>
                <span className="font-bebas text-3xl tracking-widest text-glow">APEX</span>
              </div>

              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-xl font-bebas tracking-wider text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon size={18} className="text-[var(--color-red-dim)]" />
                    {item.name}
                  </Link>
                );
              })}

              <div className="mt-auto pt-6 border-t border-white/5">
                <Link
                href="/onboarding"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full bg-[var(--color-red-primary)] hover:bg-[var(--color-red-glow)] text-black font-bold px-6 py-3 rounded-sm uppercase tracking-widest text-center
                    shadow-[0_0_20px_rgba(220,38,38,0.4)]
                    transition-all duration-300"
                >
                  START TRAINING
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
