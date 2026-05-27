"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import RedButton from "@/components/ui/RedButton";
import Navbar from "@/components/layout/Navbar";
import ScanLine from "@/components/effects/ScanLine";

gsap.registerPlugin(ScrollTrigger);

function splitLetters(text: string) {
  return text.split("").map((char, i) => (
    <span key={i} className="letter inline-block">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const apexY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const apexOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-1",
          pin: true,
          start: "top top",
          end: "+=100%",
          scrub: 1,
        },
      });
      tl1.from(".section-1-content", { opacity: 0, y: 100 });
      tl1.from(
        ".section-1 .letter",
        {
          opacity: 0,
          y: 80,
          rotateX: -90,
          stagger: 0.04,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      );
      tl1.from(
        ".section-1-sub",
        { opacity: 0, y: 40, duration: 0.8 },
        "-=0.2",
      );

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-2",
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });
      tl2.from(".section-2-title .letter", {
        opacity: 0,
        y: 60,
        rotateX: -90,
        stagger: 0.03,
        duration: 0.6,
        ease: "power3.out",
      });
      tl2.from(
        ".protocol-card",
        {
          opacity: 0,
          y: 80,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.2",
      );

      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-3",
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });
      tl3.from(".section-3 .letter", {
        opacity: 0,
        y: 60,
        stagger: 0.05,
        duration: 0.6,
        ease: "power3.out",
      });
      tl3.from(
        ".section-3-cta",
        {
          opacity: 0,
          y: 40,
          scale: 0.9,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.2",
      );
    });

    return () => ctx.revert();
  }, []);

  const heroLines = ["BECOME", "THE VERSION", "THEY FEAR"];
  const quoteWords =
    "Pain builds legends. You either become stronger or stay weak.".split(" ");

  return (
    <main className="relative w-full overflow-hidden bg-black text-white">
      <Navbar />
      <ScanLine />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 z-0 opacity-40 pointer-events-none"
          style={{ mixBlendMode: "screen" }}
        >
          <img 
            src="/batman-bg.png" 
            alt="" 
            className="w-full h-full object-cover"
            style={{ filter: "blur(4px) contrast(1.2)" }} 
          />
        </div>
        <motion.div
          style={{ y: apexY, opacity: apexOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <span className="font-bebas text-[300px] leading-none text-white/5 select-none">
            APEX
          </span>
        </motion.div>

        <div className="relative z-10 w-full h-full flex items-center px-8 md:px-16">
          <div className="w-1/3 flex flex-col justify-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              className="overflow-hidden"
            >
              {heroLines.map((line, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { y: 120, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 1,
                        ease: [0.215, 0.61, 0.355, 1],
                      },
                    },
                  }}
                  className={`font-bebas text-6xl md:text-8xl leading-[1.1] ${
                    i === 2 ? "red-glow-text" : ""
                  }`}
                >
                  {line}
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="w-1/3" />

          <div className="w-1/3 flex flex-col justify-center">
            <motion.div
              ref={quoteRef}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.06, delayChildren: 1.5 },
                },
              }}
              className="font-dm-mono text-gray-400 italic text-sm md:text-base leading-relaxed"
            >
              {quoteWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
                    },
                  }}
                  className="inline-block mr-[0.4em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span className="font-dm-mono text-[var(--color-red-dim)] text-xs tracking-widest">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-[var(--color-red-primary)]"
            style={{
              filter: "drop-shadow(0 0 8px rgba(220,38,38,0.6))",
            }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      </section>

      {/* YOUR TRANSFORMATION */}
      <section className="section-1 relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="section-1-content flex flex-col items-center text-center px-8">
          <h2 className="font-bebas text-6xl md:text-8xl red-glow-text mb-8">
            {splitLetters("YOUR TRANSFORMATION")}
          </h2>
          <p className="section-1-sub font-dm-mono text-gray-400 text-sm md:text-base max-w-xl">
            Every rep reshapes you. Every set rebuilds you.
            <br />
            This is the architecture of your evolution.
          </p>
        </div>
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[var(--color-red-primary)] to-transparent opacity-30" />
      </section>

      {/* THE PROTOCOL */}
      <section className="section-2 relative min-h-screen w-full flex flex-col items-center justify-center px-8 md:px-16 py-32 overflow-hidden">
        <h2 className="section-2-title font-bebas text-5xl md:text-7xl red-glow-text mb-20 text-center">
          {splitLetters("THE PROTOCOL")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {[
            {
              num: "01",
              title: "TRAINING",
              desc: "Progressive overload, compound movements, and intensity principles engineered for maximum adaptation.",
            },
            {
              num: "02",
              title: "NUTRITION",
              desc: "Precision fuel timing, macro mastery, and metabolic optimization for your specific phenotype.",
            },
            {
              num: "03",
              title: "RECOVERY",
              desc: "Sleep architecture, nervous system regulation, and adaptive rest protocols to maximize gains.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="protocol-card glass-panel p-8 flex flex-col items-start"
            >
              <span className="text-[var(--color-red-primary)] font-bebas text-2xl mb-2">
                {card.num}
              </span>
              <h3 className="font-bebas text-3xl md:text-4xl mb-4">
                {card.title}
              </h3>
              <p className="font-dm-mono text-gray-400 text-sm leading-relaxed">
                {card.desc}
              </p>
              <div className="mt-6 w-full h-px bg-gradient-to-r from-[var(--color-red-primary)]/50 to-transparent" />
            </div>
          ))}
        </div>
      </section>

      {/* INITIATE */}
      <section className="section-3 relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[60vw] h-[60vh] bg-[var(--color-red-dim)] blur-[200px] opacity-20 rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-8">
          <h2 className="font-bebas text-6xl md:text-8xl red-glow-text mb-8">
            {splitLetters("INITIATE")}
          </h2>
          <p className="font-dm-mono text-gray-400 text-sm md:text-base mb-12 max-w-md">
            Your protocol awaits. One decision changes everything.
          </p>
          <div className="section-3-cta">
            <Link href="/onboarding">
              <RedButton>BEGIN YOUR ASCENSION</RedButton>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>
    </main>
  );
}
