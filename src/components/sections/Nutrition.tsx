"use client";

import { motion } from "framer-motion";

export default function Nutrition() {
  return (
    <section className="relative w-full py-32 bg-[#050505] overflow-hidden z-10 border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          {/* Right side graphic */}
          <div className="flex-1 w-full relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/3] w-full bg-[var(--color-blood-red)]/5 rounded-sm border border-[var(--color-blood-red)]/20 relative p-8 flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 p-4">
                <div className="w-16 h-16 rounded-full border-2 border-[var(--color-crimson-glow)] border-t-transparent animate-spin flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-white/20 border-b-transparent animate-[spin_3s_linear_infinite_reverse]"></div>
                </div>
              </div>
              
              <div>
                <h4 className="font-sans text-[var(--color-crimson-glow)] uppercase tracking-[0.2em] text-xs font-bold mb-2">Macro Analysis</h4>
                <div className="space-y-4 mt-8">
                  {[
                    { label: "PROTEIN", val: "220G", pct: "85%" },
                    { label: "CARBS", val: "350G", pct: "60%" },
                    { label: "FATS", val: "80G", pct: "40%" },
                  ].map((macro, i) => (
                    <div key={i} className="w-full">
                      <div className="flex justify-between text-xs font-sans text-white uppercase tracking-wider mb-1">
                        <span>{macro.label}</span>
                        <span>{macro.val}</span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: macro.pct }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                          className="h-full bg-[var(--color-crimson-glow)] shadow-[0_0_10px_var(--color-crimson-glow)]"
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="font-bebas text-3xl text-white tracking-wider">FUEL FOR VENGEANCE</p>
              </div>
            </motion.div>
          </div>

          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[var(--color-crimson-glow)] font-sans tracking-[0.2em] uppercase text-sm font-bold mb-4 border-l-2 border-[var(--color-blood-red)] pl-4"
            >
              Precision Nutrition
            </motion.h2>
            
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-bebas text-6xl md:text-7xl text-white leading-none mb-6"
            >
              SYSTEMIZED FUELING
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 font-sans text-lg mb-8 max-w-lg"
            >
              You cannot out-train a weak diet. Our nutrition system calculates your exact macro and micro needs down to the gram, ensuring optimal recovery and raw power output.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-sm font-sans font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all">
                Calculate Macros
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
