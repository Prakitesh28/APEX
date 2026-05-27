"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  return (
    <section className="relative w-full py-32 bg-[#020202] overflow-hidden z-10 border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[var(--color-crimson-glow)] font-sans tracking-[0.2em] uppercase text-sm font-bold mb-4"
            >
              The Archives
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-bebas text-6xl md:text-8xl text-white leading-none"
            >
              EVIDENCE OF GLORY
            </motion.h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Subject 011", quote: "I was broken. APEX rebuilt me. The AI form tracking caught mistakes I made for years. Now I am a weapon.", stat: "+30lbs Muscle" },
            { name: "Subject 042", quote: "The Batman Challenge broke me down and forged something completely new. There is no going back to normal workouts.", stat: "-15% Body Fat" },
            { name: "Subject 089", quote: "Precision nutrition and calculated progressive overload. It's not a fitness app, it's an operating system for human optimization.", stat: "Elite Conditioning" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="bg-black border border-white/10 p-8 rounded-sm hover:border-[var(--color-blood-red)] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--color-crimson-glow)] opacity-0 group-hover:opacity-10 blur-[40px] transition-opacity duration-500"></div>
              
              <p className="font-sans text-gray-300 italic mb-8 relative z-10">"{item.quote}"</p>
              
              <div className="flex justify-between items-center relative z-10 border-t border-white/10 pt-4">
                <span className="font-bebas text-2xl text-white tracking-widest">{item.name}</span>
                <span className="font-sans text-[var(--color-crimson-glow)] text-xs font-bold uppercase tracking-widest">{item.stat}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
