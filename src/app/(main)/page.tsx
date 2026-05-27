"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ScanLine from "@/components/effects/ScanLine";
import RedButton from "@/components/ui/RedButton";
import PreLoader from "@/components/effects/PreLoader";

gsap.registerPlugin(ScrollTrigger);

function splitLetters(text: string) {
  return text.split("").map((char, i) => (
    <span key={i} className="letter inline-block">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

function MainContent() {
  const [detectiveMode, setDetectiveMode] = useState<number | null>(null);
  const [isWiping, setIsWiping] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const apexY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero typing effect
      gsap.fromTo(
        ".hero-text .letter",
        { opacity: 0, display: "none" },
        {
          opacity: 1,
          display: "inline-block",
          stagger: 0.05,
          duration: 0.1,
          ease: "steps(1)",
          delay: 0.5,
        }
      );

      // Terminal typing effect
      gsap.to(".terminal-text", {
        opacity: 1,
        duration: 0.1,
        delay: 1.5,
        onStart: () => {
          gsap.fromTo(
            ".terminal-text p",
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "steps(10)", stagger: 0.5 }
          );
        }
      });

      // Section 1
      const tl1 = gsap.timeline({
        scrollTrigger: { trigger: ".section-1", pin: true, start: "top top", end: "+=100%", scrub: 1 },
      });
      tl1.from(".section-1 .letter", { opacity: 0, scale: 2, stagger: 0.02, duration: 0.5, ease: "power4.out" });
      tl1.from(".section-1-sub", { opacity: 0, clipPath: "inset(0 100% 0 0)", duration: 0.8 }, "-=0.2");

      // Protocols
      const tl2 = gsap.timeline({
        scrollTrigger: { trigger: ".section-2", start: "top 80%", end: "top 20%", scrub: 1 },
      });
      tl2.from(".section-2-title .letter", { opacity: 0, y: 20, stagger: 0.02, duration: 0.3 });
      tl2.from(".target-profile", { opacity: 0, scale: 0.95, stagger: 0.2, duration: 0.5, ease: "power2.out" }, "-=0.2");

    });

    return () => ctx.revert();
  }, []);

  const handleProfileClick = (index: number) => {
    if (detectiveMode === index) {
      setDetectiveMode(null);
      gsap.to(`.profile-${index}`, { scale: 1, zIndex: 1, filter: "none", duration: 0.3 });
    } else {
      setDetectiveMode(index);
      gsap.to(`.profile-${index}`, { 
        scale: 1.1, 
        zIndex: 50, 
        filter: "brightness(1.5) contrast(1.2)", 
        duration: 0.1, 
        ease: "steps(3)" 
      });
      // Glitch surrounding profiles
      gsap.to(".target-profile:not(.profile-" + index + ")", { opacity: 0.3, filter: "grayscale(100%) blur(2px)", duration: 0.2 });
    }
  };

  const handleInitiate = () => {
    if (isWiping) return;
    setIsWiping(true);
    const wipe = document.createElement("div");
    wipe.className = "fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center";
    document.body.appendChild(wipe);

    const smoke = document.createElement("div");
    smoke.className = "w-10 h-10 bg-[var(--color-red-primary)] rounded-full blur-[50px]";
    wipe.appendChild(smoke);

    gsap.to(smoke, {
      scale: 100,
      opacity: 1,
      duration: 1.2,
      ease: "power4.in",
      onComplete: () => {
        router.push("/onboarding");
        setTimeout(() => document.body.removeChild(wipe), 500);
      }
    });
  };

  return (
    <main className="relative w-full overflow-hidden bg-transparent text-white font-ibm-plex">
      <Navbar />
      <ScanLine />

      {/* HERO - Floating Laptop Presentation */}
      <section ref={heroRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden z-20">
        
        {/* CSS 3D Perspective Container */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '2000px' }}>
          
          {/* The Laptop Chassis / Frame */}
          <motion.div 
            initial={{ rotateY: -30, rotateX: 20, opacity: 0, scale: 0.8 }}
            animate={{ rotateY: -10, rotateX: 5, opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-[90%] max-w-6xl aspect-[16/10] bg-black rounded-xl md:rounded-3xl border-2 border-[#222] shadow-[0_30px_100px_rgba(138,3,3,0.3)] overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Screen Bezel inner shadow */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,1)] z-30 pointer-events-none rounded-3xl" />
            
            {/* Laptop Screen Content - Matches Reference Image */}
            <div className="relative w-full h-full bg-black overflow-hidden flex flex-col justify-between p-8 md:p-16">
              
              {/* Background Silhouette specific to laptop screen */}
              <div className="absolute inset-0 z-0 bg-[url('/batman-cinematic.png')] bg-cover bg-center opacity-80 mix-blend-screen" />
              {/* Red overlay for the screen */}
              <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[var(--color-red-primary)]/40 to-transparent mix-blend-overlay pointer-events-none" />

              {/* Top content (under the navbar which is now global, but we can have local content here if needed. Since Navbar is fixed global, it might float outside the laptop. The user reference image shows the navbar INSIDE the laptop. If the user wants the whole site to be inside the laptop, that's one thing, but typically a landing page has a laptop mockup as the hero, and the actual site navbar is outside. Wait, the prompt says "Redesign my current website into an ultra-cinematic... Main Subject: A floating, angled mockup... Navigation: Rounded glassmorphism navbar, centered at the top." We made the navbar global. Let's keep the navbar global and put the hero content in the laptop.) */}
              
              <div className="relative z-20 mt-16 md:mt-24 max-w-lg">
                <h1 className="font-inter font-bold text-5xl md:text-7xl leading-tight mb-6">
                  Architect <br/> Your Evolution
                </h1>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex -space-x-3">
                    {/* Placeholder avatars */}
                    <div className="w-8 h-8 rounded-full bg-gray-500 border border-black" />
                    <div className="w-8 h-8 rounded-full bg-gray-600 border border-black" />
                    <div className="w-8 h-8 rounded-full bg-gray-700 border border-black" />
                  </div>
                  <span className="font-inter text-sm text-[var(--color-text-secondary)]">
                    5.2M+ transformations worldwide
                  </span>
                </div>

                <button className="btn-pill-primary" onClick={handleInitiate}>
                  INITIALIZE PROTOCOL
                </button>
              </div>

              {/* Massive Distressed Title at Bottom */}
              <div className="relative z-20 w-full mt-auto">
                <h2 className="font-black-ops text-[14vw] leading-none text-[var(--color-text-secondary)] text-center tracking-tighter opacity-90 drop-shadow-[0_10px_20px_rgba(138,3,3,0.5)]">
                  EVOLUTION
                </h2>
              </div>
            </div>
            
            {/* Screen reflection glare */}
            <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-gradient-to-bl from-white/10 to-transparent transform -rotate-45 translate-x-1/4 -translate-y-1/2 pointer-events-none z-40 mix-blend-overlay" />
          </motion.div>
          
          {/* Laptop Base / Keyboard deck (simulated edge) */}
          <motion.div 
            initial={{ rotateY: -30, rotateX: 20, opacity: 0 }}
            animate={{ rotateY: -10, rotateX: 5, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[100%] max-w-7xl h-12 bg-[#111] rounded-b-3xl border-t border-[#333] shadow-2xl z-10"
            style={{ transform: 'translateX(-50%) translateZ(20px) rotateX(80deg)' }}
          >
            {/* Edge detail */}
            <div className="w-32 h-2 mx-auto mt-2 bg-[#222] rounded-full" />
          </motion.div>

        </div>
      </section>

      {/* YOUR TRANSFORMATION */}
      <section className="section-1 relative h-screen w-full flex items-center justify-center overflow-hidden z-20">
        <div className="section-1-content flex flex-col items-center text-center px-8 z-10 glass-panel p-16 max-w-4xl mx-auto">
          <h2 className="font-inter font-bold text-4xl md:text-6xl text-white mb-8 tracking-tight">
            {splitLetters("ARCHITECT EVOLUTION")}
          </h2>
          <p className="section-1-sub font-inter text-[var(--color-text-secondary)] text-sm md:text-lg max-w-2xl font-light">
            Every rep reshapes you. Every set rebuilds you. <br/>
            This is the architecture of your dominance.
          </p>
        </div>
      </section>

      {/* TARGET PROFILES (Protocols) */}
      <section className="section-2 relative min-h-screen w-full flex flex-col items-center justify-center px-8 md:px-16 py-32 overflow-hidden z-20">
        
        <h2 className="section-2-title font-inter font-bold text-4xl md:text-6xl text-white mb-20 text-center tracking-tight">
          {splitLetters("TARGET PROFILES")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl relative z-20">
          {[
            { id: "TRN-01", title: "TRAINING", desc: "Progressive overload, compound movements. Intensity engineered for maximum adaptation." },
            { id: "NTR-02", title: "NUTRITION", desc: "Precision fuel timing, macro mastery. Metabolic optimization for your phenotype." },
            { id: "RCV-03", title: "RECOVERY", desc: "Sleep architecture, nervous system regulation. Adaptive rest protocols." },
          ].map((card, i) => (
            <div
              key={i}
              className={`target-profile profile-${i} glass-panel p-8 flex flex-col items-start group transition-all duration-500 hover:bg-white/10 relative`}
              onClick={() => handleProfileClick(i)}
            >
              {/* Lock-on Reticles */}
              <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-white/30 group-hover:border-[var(--color-red-primary)] transition-colors" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-white/30 group-hover:border-[var(--color-red-primary)] transition-colors" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-white/30 group-hover:border-[var(--color-red-primary)] transition-colors" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-white/30 group-hover:border-[var(--color-red-primary)] transition-colors" />

              <div className="flex justify-between w-full mb-8 pb-4 border-b border-white/10">
                <span className="text-[var(--color-text-secondary)] font-dm-mono text-xs tracking-widest">SUBJECT: {card.id}</span>
                <span className="text-[var(--color-red-primary)] font-dm-mono text-[10px] animate-pulse">STATUS: ACTIVE</span>
              </div>
              
              <h3 className="font-inter font-bold text-3xl mb-4 tracking-tight group-hover:text-white text-gray-200 transition-colors">
                {card.title}
              </h3>
              
              <p className="font-inter text-[var(--color-text-secondary)] text-sm leading-relaxed font-light">
                {card.desc}
              </p>

              {/* Wireframe overlay on click (Detective Mode) */}
              {detectiveMode === i && (
                <div className="absolute inset-0 border border-[var(--color-red-glow)] bg-[rgba(255,0,0,0.05)] rounded-xl mix-blend-screen pointer-events-none z-50">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--color-red-glow)] opacity-50" />
                  <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[var(--color-red-glow)] opacity-50" />
                  <div className="absolute top-2 right-2 text-[8px] font-dm-mono text-[var(--color-red-glow)] animate-glitch">SCAN COMPLETE</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* INITIATE */}
      <section className="section-3 relative h-[60vh] w-full flex flex-col items-center justify-center overflow-hidden z-20">
        <div className="relative z-10 flex flex-col items-center text-center px-8">
          <h2 className="font-inter font-bold text-5xl md:text-7xl text-white mb-12 tracking-tight">
            Take the Leap
          </h2>
          
          <div className="section-3-cta relative group">
            {/* Bat swarm particles placeholder (could be implemented with real particles in Three.js, using CSS here for a mock) */}
            <div className="absolute inset-0 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-20 transition-all duration-700 bg-[radial-gradient(circle,var(--color-red-primary)_0%,transparent_70%)] blur-xl pointer-events-none" />
            
            <button className="btn-pill-primary text-lg px-12 py-4" onClick={handleInitiate}>
              GET STARTED
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Landing() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!booted && <PreLoader onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && <MainContent />}
    </>
  );
}
