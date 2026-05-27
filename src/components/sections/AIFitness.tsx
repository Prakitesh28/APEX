"use client";

import { motion } from "framer-motion";

export default function AIFitness() {
  return (
    <section className="relative w-full py-32 bg-black overflow-hidden z-10 border-t border-white/5">
      {/* Background HUD Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] border border-white rounded-full mix-blend-overlay border-dashed animate-[spin_60s_linear_infinite]"></div>
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] border border-white rounded-full mix-blend-overlay animate-[spin_40s_linear_infinite_reverse]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 w-full relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-square max-w-md mx-auto bg-glass rounded-sm border border-white/10 relative flex items-center justify-center overflow-hidden group"
            >
              {/* Scanning line animation */}
              <motion.div 
                animate={{ y: ["-100%", "500%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-1 bg-[var(--color-crimson-glow)] shadow-[0_0_15px_var(--color-crimson-glow)] opacity-50 z-20"
              />
              
              <div className="text-center relative z-10">
                <p className="font-sans text-xs tracking-[0.3em] text-[var(--color-crimson-glow)] uppercase mb-4 font-bold">Target Locked</p>
                <div className="font-bebas text-7xl text-white text-glow">98.5%</div>
                <p className="font-sans text-sm text-gray-400 uppercase tracking-widest mt-2">Form Accuracy</p>
              </div>

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
            </motion.div>
          </div>

          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[var(--color-crimson-glow)] font-sans tracking-[0.2em] uppercase text-sm font-bold mb-4 border-l-2 border-[var(--color-blood-red)] pl-4"
            >
              Next-Gen Tech
            </motion.h2>
            
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-bebas text-6xl md:text-7xl text-white leading-none mb-6"
            >
              AI FITNESS TRACKING
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 font-sans text-lg mb-10 max-w-lg"
            >
              Your personal Oracle. Our advanced AI analyzes your form in real-time, corrects your posture, and adapts your programming based on fatigue and performance metrics.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-5"
            >
              {[
                "Real-time form correction via camera",
                "Dynamic progressive overload",
                "Fatigue state estimation",
                "Predictive injury prevention"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-glass border border-white/5 px-6 py-4 rounded-sm hover:border-white/20 transition-colors">
                  <div className="w-2 h-2 bg-[var(--color-blood-red)] transform rotate-45 shadow-[0_0_10px_var(--color-crimson-glow)]"></div>
                  <span className="font-sans text-white uppercase tracking-widest text-xs font-bold">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
