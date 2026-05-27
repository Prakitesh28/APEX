"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="relative w-full h-[80vh] bg-black flex items-center justify-center overflow-hidden border-t border-[var(--color-blood-red)]/30">
      {/* Background Cinematic Effects */}
      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] opacity-10 mix-blend-overlay z-10 pointer-events-none"></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-blood-red)] rounded-full blur-[200px] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-bebas text-7xl md:text-9xl text-white text-glow-heavy leading-none mb-6"
        >
          READY TO ASCEND?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-gray-400 max-w-lg mb-12 text-lg"
        >
          The weak stay where they are. The elite take action. Step into the shadows and forge your legacy.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="bg-[var(--color-blood-red)] text-white px-12 py-5 rounded-sm font-sans font-bold uppercase tracking-widest text-sm hover:bg-[var(--color-crimson-glow)] transition-all shadow-[0_0_30px_rgba(255,30,30,0.5)] hover:shadow-[0_0_60px_rgba(255,30,30,0.8)]">
            BECOME THE WEAPON
          </button>
        </motion.div>
      </div>
    </section>
  );
}
