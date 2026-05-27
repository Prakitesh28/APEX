"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import LooksmaxCard from "@/components/ui/LooksmaxCard";

const TIPS = [
  { id: 1, category: "Face", difficulty: "MEDIUM", timeframe: "12 WEEKS", title: "MEWING", icon: "🤫", description: "Maintain proper tongue posture against the roof of the mouth. Ensure nasal breathing at all times. This gradually remodels the maxilla and improves facial forward growth." },
  { id: 2, category: "Face", difficulty: "EASY", timeframe: "8 WEEKS", title: "JAW EXERCISES", icon: "🦷", description: "Utilize mastic gum or tough foods to hypertrophy the masseter muscles, widening the lower third of the face." },
  { id: 3, category: "Face", difficulty: "HARD", timeframe: "16 WEEKS", title: "FACIAL FAT REDUCTION", icon: "💀", description: "Maintain a strict caloric deficit to lower overall body fat percentage. This is the only legitimate way to reveal underlying bone structure and hollow cheeks." },
  { id: 4, category: "Face", difficulty: "EASY", timeframe: "4 WEEKS", title: "SKINCARE ROUTINE", icon: "🧴", description: "Morning: Cleanser, Moisturizer, SPF 50+. Night: Cleanser, Retinol, Moisturizer. Consistency eliminates blemishes and evens skin tone." },
  { id: 5, category: "Face", difficulty: "EASY", timeframe: "IMMEDIATE", title: "EYEBROW GROOMING", icon: "✂️", description: "Pluck the middle (unibrow). Trim excessive length. Maintain a sharp, masculine, or clean shape suited to your brow ridge." },
  { id: 6, category: "Body", difficulty: "MEDIUM", timeframe: "8 WEEKS", title: "POSTURE CORRECTION", icon: "🧍", description: "Perform 60s deadhangs daily. Incorporate face pulls for rounded shoulders. Practice chin tucks to fix forward neck posture." },
  { id: 7, category: "Body", difficulty: "HARD", timeframe: "24 WEEKS", title: "IDEAL BODY FAT %", icon: "⚖️", description: "Train and eat systematically to hit the 10-12% body fat range (for males) or 18-20% (for females). This maximizes aesthetic appeal and vascularity." },
  { id: 8, category: "Body", difficulty: "MEDIUM", timeframe: "12 WEEKS", title: "SYMMETRY TRAINING", icon: "📐", description: "Identify muscular imbalances. Prioritize unilateral movements (dumbbells over barbells). Start all unilateral sets with your weaker side." },
  { id: 13, category: "Body", difficulty: "HARD", timeframe: "16 WEEKS", title: "CHEST DEFINITION", icon: "🏋️", description: "Focus on progressive overload with incline and flat presses. Prioritize upper chest development for a full, aesthetic pec shape." },
  { id: 14, category: "Body", difficulty: "ELITE", timeframe: "20 WEEKS", title: "V-TAPER", icon: "🔻", description: "Build lateral deltoid and lat width through heavy rows, pull-ups, and lateral raises while keeping waist tight through diet and core work." },
  { id: 9, category: "Hair", difficulty: "EASY", timeframe: "12 WEEKS", title: "HAIR HEALTH", icon: "🌿", description: "Minimize shampooing to 2x a week. Use a ketoconazole shampoo if dandruff is present. Consider scalp massages and rosemary oil for density." },
  { id: 10, category: "Hair", difficulty: "EASY", timeframe: "IMMEDIATE", title: "SHAPE OPTIMIZATION", icon: "💈", description: "Consult a high-end barber to map your face shape. Oblong faces need width on sides; round faces need volume on top." },
  { id: 15, category: "Hair", difficulty: "MEDIUM", timeframe: "8 WEEKS", title: "SCALP HEALTH", icon: "🧖", description: "Exfoliate scalp weekly with a salicylic acid treatment. Use micro-needling 1x per week to stimulate blood flow and follicle activity." },
  { id: 16, category: "Hair", difficulty: "EASY", timeframe: "2 WEEKS", title: "STYLE PRODUCTS", icon: "🧴", description: "Use a matte clay or paste for texture. Avoid gels that flake. Apply product to towel-dried hair for even distribution and hold." },
  { id: 11, category: "Style", difficulty: "MEDIUM", timeframe: "2 WEEKS", title: "STYLE UPGRADE", icon: "🧥", description: "Audit your wardrobe. Eliminate poorly fitting clothes. Stick to a monochromatic or dark, earthy color palette. Fit > Brand always." },
  { id: 12, category: "Style", difficulty: "EASY", timeframe: "IMMEDIATE", title: "SIGNATURE SCENT", icon: "💨", description: "Invest in an Eau de Parfum (EDP) suited to your body chemistry. Apply to pulse points (neck, wrists). Never overspray." },
  { id: 17, category: "Style", difficulty: "MEDIUM", timeframe: "1 WEEK", title: "COLOR SEASON", icon: "🎨", description: "Determine your seasonal color palette (warm/cool, deep/light). Wear colors that harmonize with your skin undertone and contrast level." },
  { id: 18, category: "Style", difficulty: "EASY", timeframe: "IMMEDIATE", title: "ACCESSORIES", icon: "⌚", description: "A quality watch, minimalist chain, or leather bracelet elevates any outfit. Less is more — one statement piece at a time." },
];

const CATEGORIES = ["Face", "Body", "Hair", "Style"];

const STAGGER_BASE: Record<string, number> = {
  Face: 0.1,
  Body: 0.15,
  Hair: 0.2,
  Style: 0.25,
};

export default function Looksmax() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filtered = activeCategory === "ALL" ? TIPS : TIPS.filter(t => t.category === activeCategory);

  const categorized = useMemo(() => {
    const map: Record<string, typeof TIPS> = {};
    for (const cat of CATEGORIES) {
      map[cat] = filtered.filter(t => t.category === cat);
    }
    return map;
  }, [filtered]);

  return (
    <div className="flex min-h-screen bg-black relative">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col relative z-10">
        <TopBar title="PHYSICAL OPTIMIZATION PROTOCOLS" />
        
        <main className="p-8 pb-20 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="font-dm-mono tracking-[0.4em] text-[var(--color-red-dim)] text-sm mb-12 uppercase text-center">
              SYSTEMATIC ENHANCEMENT. NO SHORTCUTS.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CATEGORIES.map((cat, colIdx) => (
                <div key={cat}>
                  <button
                    onClick={() => setActiveCategory(activeCategory === cat ? "ALL" : cat)}
                    className="w-full text-left mb-6"
                  >
                    <h3 className={`font-barlow text-xl uppercase tracking-[0.3em] transition-colors relative inline-block ${activeCategory === cat || activeCategory === "ALL" ? "text-white" : "text-gray-600 hover:text-gray-300"}`}>
                      {cat}
                      {activeCategory === cat && (
                        <motion.div layoutId="activeColumn" className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--color-red-glow)] shadow-[0_0_10px_var(--color-red-glow)]" />
                      )}
                      {activeCategory === "ALL" && (
                        <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--color-red-glow)] shadow-[0_0_10px_var(--color-red-glow)]" />
                      )}
                    </h3>
                  </button>
                  <div className="space-y-6">
                    {categorized[cat].map((tip, i) => (
                      <motion.div
                        key={tip.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ delay: STAGGER_BASE[cat] * i, duration: 0.35, ease: "easeOut" }}
                      >
                        <LooksmaxCard
                          category={tip.category}
                          difficulty={tip.difficulty as "EASY" | "MEDIUM" | "HARD" | "ELITE"}
                          title={tip.title}
                          timeframe={tip.timeframe}
                          description={tip.description}
                          icon={tip.icon}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
