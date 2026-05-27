"use client";

import { motion } from "framer-motion";

export default function Community() {
  return (
    <section id="community" className="relative w-full py-32 bg-black overflow-hidden z-10 border-t border-white/5">
      {/* Massive background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden flex justify-center pointer-events-none opacity-[0.03] z-0">
        <h1 className="font-bebas text-[15rem] md:text-[25rem] text-transparent [-webkit-text-stroke:2px_white] whitespace-nowrap">
          THE LEAGUE
        </h1>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[var(--color-crimson-glow)] font-sans tracking-[0.2em] uppercase text-sm font-bold mb-4"
        >
          Worldwide Alliance
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-bebas text-6xl md:text-8xl text-white leading-none mb-16"
        >
          NOT FOR THE WEAK
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
          {[
            { stat: "150K+", label: "Active Operatives" },
            { stat: "2.4M", label: "Workouts Logged" },
            { stat: "100%", label: "Discipline Required" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (i * 0.2) }}
              className="bg-glass p-12 rounded-sm border border-white/5 hover:border-[var(--color-blood-red)]/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-blood-red)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 shadow-[0_0_10px_var(--color-crimson-glow)]"></div>
              <h4 className="font-bebas text-6xl text-white mb-2 group-hover:text-glow transition-all">{item.stat}</h4>
              <p className="font-sans text-sm text-gray-400 uppercase tracking-widest">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
