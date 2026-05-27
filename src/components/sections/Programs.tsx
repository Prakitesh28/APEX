"use client";

import { motion } from "framer-motion";

const programs = [
  { title: "STRENGTH", subtitle: "Raw Power", desc: "Build unshakeable foundation.", delay: 0.1 },
  { title: "HYPERTROPHY", subtitle: "Mass Accrual", desc: "Forge muscle density.", delay: 0.2 },
  { title: "FAT LOSS", subtitle: "Shredded Core", desc: "Cut the weakness.", delay: 0.3 },
  { title: "CALISTHENICS", subtitle: "Body Mastery", desc: "Defy gravity.", delay: 0.4 },
];

export default function Programs() {
  return (
    <section id="programs" className="relative w-full py-32 bg-black overflow-hidden z-10 border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-blood-red)] to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-[var(--color-crimson-glow)] font-sans tracking-[0.2em] uppercase text-sm font-bold mb-4"
            >
              The Arsenal
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="font-bebas text-6xl md:text-8xl text-white leading-none"
            >
              ELITE PROGRAMS
            </motion.h3>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-sm font-sans"
          >
            Specialized training protocols designed for maximum adaptation and continuous progression. Pick your path.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: prog.delay, duration: 0.6 }}
              className="group relative bg-glass p-8 rounded-sm hover:border-[var(--color-crimson-glow)] transition-colors overflow-hidden flex flex-col justify-between min-h-[300px]"
            >
              <div className="absolute inset-0 bg-[var(--color-blood-red)] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              <div>
                <p className="text-[var(--color-crimson-glow)] font-sans text-xs tracking-widest font-bold mb-2 uppercase">{prog.subtitle}</p>
                <h4 className="font-bebas text-4xl text-white mb-4 group-hover:text-glow transition-all">{prog.title}</h4>
              </div>
              
              <div>
                <p className="text-gray-400 font-sans text-sm mb-6">{prog.desc}</p>
                <div className="w-10 h-[2px] bg-white/20 group-hover:w-full group-hover:bg-[var(--color-crimson-glow)] transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Batman Challenge Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-blood-red)] opacity-10 blur-[80px] group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"></div>
          
          <div className="z-10 mb-8 md:mb-0">
            <h4 className="font-bebas text-5xl text-glow mb-2">THE BATMAN CHALLENGE</h4>
            <p className="font-sans text-gray-400">90 days. Extreme conditioning. Unbreakable mind.</p>
          </div>
          
          <button className="z-10 bg-white text-black px-8 py-3 font-sans font-bold uppercase tracking-widest text-sm hover:bg-[var(--color-crimson-glow)] hover:text-white transition-colors shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            Accept Challenge
          </button>
        </motion.div>
      </div>
    </section>
  );
}
