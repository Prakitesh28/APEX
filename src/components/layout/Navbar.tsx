"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "FEATURES", href: "/#features" },
  { name: "PROGRAMS", href: "/#programs" },
  { name: "DASHBOARD", href: "/dashboard" },
  { name: "LOOKSMAX", href: "/looksmax" },
  { name: "PROGRESS", href: "/progress" },
];

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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className={`transition-all duration-500 w-full max-w-4xl flex justify-between items-center px-6 py-3 ${scrolled ? "glass-pill" : "bg-transparent"}`}>
          
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-6 h-6 bg-[var(--color-red-dim)] rounded-sm flex items-center justify-center transform rotate-45 border border-[var(--color-red-primary)] transition-transform group-hover:rotate-90 duration-500">
                <div className="w-3 h-3 bg-black rounded-sm transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>
              <span className="font-bebas text-2xl tracking-widest text-[var(--color-red-primary)] hidden md:block">
                APEX
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Glass Pill Container) */}
          <div className="hidden lg:flex items-center gap-2 glass-pill px-6 py-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-1 text-sm font-inter text-gray-300 hover:text-white transition-colors relative group"
              >
                {item.name}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-red-primary)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </Link>
            ))}
          </div>

          {/* Get Started Button */}
          <div className="hidden lg:block">
            <Link href="/onboarding" className="btn-pill-primary text-xs">
              INITIALIZE PROTOCOL
            </Link>
          </div>

          <button
            className="lg:hidden text-white z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="absolute top-0 right-0 h-full w-72 glass-panel border-r-0 border-t-0 border-b-0 rounded-l-2xl rounded-r-none p-8 flex flex-col gap-6"
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-[var(--color-red-dim)] flex items-center justify-center transform rotate-45 border border-[var(--color-red-primary)]">
                  <div className="w-4 h-4 bg-black transform -rotate-45" />
                </div>
                <span className="font-bebas text-3xl tracking-widest text-[var(--color-red-primary)]">APEX</span>
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-inter font-medium text-gray-300 hover:text-white transition-colors border-b border-white/10 pb-4"
                >
                  {item.name}
                </Link>
              ))}

              <div className="mt-auto pt-6">
                <Link
                  href="/onboarding"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-pill-primary w-full text-center block"
                >
                  INITIALIZE PROTOCOL
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
