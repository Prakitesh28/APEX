"use client";

import { motion } from "framer-motion";

export default function Pricing() {
  return (
    <section id="pricing" className="relative w-full py-32 bg-[#020202] overflow-hidden z-10 border-t border-[var(--color-blood-red)]/20">
      {/* Fog effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[var(--color-blood-red)] blur-[200px] opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bebas text-6xl md:text-8xl text-white leading-none mb-4 text-glow"
          >
            THE INITIATION
          </motion.h3>
          <p className="font-sans text-gray-400 tracking-widest uppercase text-sm font-bold">Choose your level of commitment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-black border border-white/10 p-10 rounded-sm flex flex-col justify-between"
          >
            <div>
              <h4 className="font-bebas text-4xl text-white mb-2">OPERATIVE</h4>
              <p className="font-sans text-gray-400 text-sm mb-8 h-10">Full access to standard training protocols.</p>
              <div className="font-bebas text-6xl text-white mb-8">$29<span className="text-2xl text-gray-500">/MO</span></div>
              <ul className="space-y-4 mb-10">
                {["Access to 4 Core Programs", "Basic Macro Calculator", "Community Access", "Progress Tracking"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 font-sans text-sm text-gray-300">
                    <span className="text-[var(--color-crimson-glow)]">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full bg-transparent border border-white/20 text-white py-4 font-sans font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all">
              Begin Training
            </button>
          </motion.div>

          {/* Premium */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black border border-[var(--color-crimson-glow)] p-10 rounded-sm relative shadow-[0_0_30px_rgba(255,30,30,0.15)] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-[var(--color-blood-red)] text-white text-xs font-bold uppercase tracking-widest py-1 px-8 transform translate-x-[25%] translate-y-[50%] rotate-45 shadow-[0_0_10px_var(--color-crimson-glow)]">
              RECOMMENDED
            </div>
            
            <div>
              <h4 className="font-bebas text-4xl text-[var(--color-crimson-glow)] text-glow mb-2">APEX PREDATOR</h4>
              <p className="font-sans text-gray-400 text-sm mb-8 h-10">The ultimate tier. AI tracking, custom nutrition, and the Batman Challenge.</p>
              <div className="font-bebas text-6xl text-white mb-8">$89<span className="text-2xl text-gray-500">/MO</span></div>
              <ul className="space-y-4 mb-10">
                {["All Programs + Batman Challenge", "AI Form & Fatigue Tracking", "Custom Systemized Nutrition", "Priority Support", "Exclusive Gear Access"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 font-sans text-sm text-white font-medium">
                    <span className="text-[var(--color-crimson-glow)] text-glow">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full bg-[var(--color-blood-red)] text-white py-4 font-sans font-bold uppercase tracking-widest text-sm hover:bg-[var(--color-crimson-glow)] transition-all shadow-[0_0_15px_rgba(255,30,30,0.4)]">
              Ascend Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
