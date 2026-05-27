"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Subtle parallax effect on the background
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;
      
      gsap.to(".hero-bg-glow", {
        x: xPos,
        y: yPos,
        duration: 1.5,
        ease: "power2.out"
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradients & Effects */}
      <div className="absolute inset-0 bg-black z-0 flex items-center justify-center">
        {/* Animated red fog/glow */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="hero-bg-glow absolute w-[60vw] h-[60vw] md:w-[800px] md:h-[800px] bg-[var(--color-blood-red)] rounded-full blur-[150px] mix-blend-screen pointer-events-none"
        ></motion.div>
        
        {/* Secondary glow for depth */}
        <div className="hero-bg-glow absolute w-[300px] h-[300px] bg-[var(--color-crimson-glow)] rounded-full blur-[100px] opacity-20 pointer-events-none delay-75"></div>
      </div>
      
      {/* Foreground Content */}
      <div className="container mx-auto px-6 relative z-20 flex flex-col lg:flex-row items-center justify-between h-full">
        
        <div className="flex-1 flex flex-col justify-center items-start lg:pr-10 mt-10 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-gray-400 font-sans tracking-[0.3em] text-sm md:text-base uppercase mb-4 border-l-2 border-[var(--color-crimson-glow)] pl-4">
              Forged In Discipline
            </h2>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-bebas text-7xl md:text-8xl lg:text-[10rem] leading-[0.85] text-glow-heavy mb-8"
          >
            BECOME<br />THE VERSION<br />THEY FEAR
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button className="bg-[var(--color-blood-red)] text-white px-8 py-4 rounded-sm font-sans font-bold uppercase tracking-widest text-sm hover:bg-[var(--color-crimson-glow)] transition-all shadow-[0_0_20px_rgba(255,30,30,0.5)] hover:shadow-[0_0_40px_rgba(255,30,30,0.8)]">
              Start Training
            </button>
            <button className="bg-glass text-white px-8 py-4 rounded-sm font-sans font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
              Join The League
            </button>
          </motion.div>
        </div>

        {/* Right side supporting text / empty space for silhouette */}
        <div className="flex-1 hidden lg:flex flex-col items-end justify-center text-right">
            {/* We could place the 3D model or silhouette here later */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="font-sans text-gray-400 max-w-sm text-lg leading-relaxed border-r-2 border-white/20 pr-6"
            >
              "Pain builds legends. You either become stronger or stay weak."
            </motion.p>
        </div>
      </div>

      {/* Massive bottom text */}
      <div className="absolute bottom-[-8%] left-1/2 -translate-x-1/2 w-full overflow-hidden flex justify-center pointer-events-none opacity-[0.15] z-10">
        <h1 className="font-bebas text-[12rem] md:text-[20rem] lg:text-[28rem] text-transparent [-webkit-text-stroke:2px_var(--color-blood-red)] whitespace-nowrap select-none leading-none">
          THE ASCENSION
        </h1>
      </div>
    </section>
  );
}
