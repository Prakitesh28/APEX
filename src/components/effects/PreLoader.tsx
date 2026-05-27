"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const QUOTES = [
  "INITIALIZING...",
  "DECRYPTING WAYNETECH SECURE SERVERS...",
  "FEAR IS A TOOL.",
  "THEY THINK I'M HIDING IN THE SHADOWS...",
  "BUT I AM THE SHADOWS.",
  "BECOME THE VERSION THEY FEAR."
];

export default function PreLoader({ onComplete }: { onComplete: () => void }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [decryptedText, setDecryptedText] = useState("");
  const [progress, setProgress] = useState(0);

  // Cryptographic Sequencer Effect
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let iteration = 0;
    const targetText = QUOTES[quoteIndex];
    let interval: NodeJS.Timeout;

    if (quoteIndex < QUOTES.length) {
      interval = setInterval(() => {
        setDecryptedText(
          targetText
            .split("")
            .map((letter, index) => {
              if (index < iteration) return targetText[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= targetText.length) {
          clearInterval(interval);
          setTimeout(() => {
            if (quoteIndex < QUOTES.length - 1) {
              setQuoteIndex((prev) => prev + 1);
            }
          }, 600); // Time to read before next quote
        }

        iteration += 1 / 3;
      }, 30);
    }

    return () => clearInterval(interval);
  }, [quoteIndex]);

  // Loading Progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            // Trigger sonar pulse wipe before calling onComplete
            gsap.to(".sonar-wipe", {
              scale: 100,
              opacity: 1,
              duration: 1.5,
              ease: "power4.in",
              onComplete: onComplete
            });
          }, 800);
          return 100;
        }
        return prev + 1.5;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)] opacity-80" />
      
      {/* Target Crosshairs Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[1px] h-full bg-[var(--color-red-primary)]" />
        <div className="absolute w-full h-[1px] bg-[var(--color-red-primary)]" />
        <div className="absolute w-64 h-64 rounded-full border border-[var(--color-red-primary)]" />
        <div className="absolute w-96 h-96 rounded-full border border-[var(--color-red-primary)] border-dashed" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-4xl px-8">
        
        {/* Decrypting Text */}
        <div className="h-20 flex items-center justify-center text-center">
          <h2 className="font-ibm-plex text-xl md:text-3xl font-bold tracking-widest text-[var(--color-red-primary)] text-glow">
            {decryptedText}
            <span className="animate-[blink_1s_step-end_infinite]">_</span>
          </h2>
        </div>

        {/* The Red Fissure (Progress Bar) */}
        <div className="w-full h-px bg-[var(--border-hard)] relative">
          {/* Slicing Batarang Effect Base */}
          <div 
            className="absolute top-1/2 left-0 h-[2px] bg-[var(--color-red-primary)] shadow-[0_0_20px_rgba(255,0,0,0.8),0_0_40px_rgba(255,0,0,0.4)] transform -translate-y-1/2 transition-all duration-75"
            style={{ width: `${progress}%` }}
          >
             {/* Sparks/Sparking Edge */}
             {progress < 100 && (
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[2px] shadow-[0_0_15px_#fff,0_0_30px_#ff0000] animate-pulse" />
             )}
          </div>
        </div>

        <div className="w-full flex justify-between font-ibm-plex text-[10px] text-gray-500 tracking-widest">
          <span>SYS.BOOT.SEQ</span>
          <span className="text-[var(--color-red-dim)]">V 2.0.4.8</span>
          <span>{Math.floor(progress)}%</span>
        </div>
      </div>

      {/* Sonar Wipe Circle */}
      <div className="sonar-wipe absolute w-10 h-10 bg-[var(--color-red-primary)] rounded-full opacity-0 pointer-events-none mix-blend-screen shadow-[0_0_50px_rgba(255,0,0,1)]" />
      
    </motion.div>
  );
}
