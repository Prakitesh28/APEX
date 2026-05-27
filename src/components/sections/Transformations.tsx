"use client";

import { motion } from "framer-motion";

export default function Transformations() {
  return (
    <section className="relative w-full py-32 bg-black overflow-hidden z-10 border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bebas text-6xl md:text-8xl text-white leading-none mb-4"
          >
            THE FORGE
          </motion.h3>
          <p className="font-sans text-gray-400 tracking-widest uppercase text-sm font-bold">Witness the evolution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Tranformation Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group cursor-pointer"
          >
            <div className="aspect-[16/9] w-full bg-zinc-900 overflow-hidden relative rounded-sm border border-white/10 group-hover:border-[var(--color-crimson-glow)] transition-colors">
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors z-10"></div>
              {/* Fake Before/After Image split */}
              <div className="absolute inset-0 flex">
                 <div className="w-1/2 h-full bg-zinc-800 border-r border-[var(--color-crimson-glow)]/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] opacity-20 mix-blend-overlay"></div>
                 </div>
                 <div className="w-1/2 h-full bg-zinc-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] opacity-10 mix-blend-overlay"></div>
                 </div>
              </div>
              
              <div className="absolute bottom-4 left-4 z-20">
                <p className="font-bebas text-3xl text-white">SUBJECT: ALPHA</p>
                <p className="font-sans text-[var(--color-crimson-glow)] text-xs uppercase tracking-widest font-bold">Duration: 12 Weeks</p>
              </div>
            </div>
          </motion.div>

          {/* Tranformation Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group cursor-pointer"
          >
            <div className="aspect-[16/9] w-full bg-zinc-900 overflow-hidden relative rounded-sm border border-white/10 group-hover:border-[var(--color-crimson-glow)] transition-colors">
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors z-10"></div>
              {/* Fake Before/After Image split */}
              <div className="absolute inset-0 flex">
                 <div className="w-1/2 h-full bg-zinc-800 border-r border-[var(--color-crimson-glow)]/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] opacity-20 mix-blend-overlay"></div>
                 </div>
                 <div className="w-1/2 h-full bg-zinc-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] opacity-10 mix-blend-overlay"></div>
                 </div>
              </div>
              
              <div className="absolute bottom-4 left-4 z-20">
                <p className="font-bebas text-3xl text-white">SUBJECT: OMEGA</p>
                <p className="font-sans text-[var(--color-crimson-glow)] text-xs uppercase tracking-widest font-bold">Duration: 24 Weeks</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
