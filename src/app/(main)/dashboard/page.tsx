"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useApexStore } from "@/store/useApexStore";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import StatCard from "@/components/ui/StatCard";
import MacroBar from "@/components/ui/MacroBar";
import RecommendationCard from "@/components/ui/RecommendationCard";
import GlassCard from "@/components/ui/GlassCard";
import gsap from "gsap";
import { Flame } from "lucide-react";

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function generateWeeklyVolume(goal?: string) {
  return DAYS.map((day, i) => {
    const base = goal === "strength" ? 8 : goal === "muscle_gain" ? 12 : 10;
    const variation = Math.round(Math.sin(i * 1.2) * 3 + base);
    return { day, volume: Math.max(4, variation) };
  });
}

function getWorkoutSuggestion(goal?: string) {
  switch (goal) {
    case "muscle_gain": return { name: "PUSH DAY", emoji: "\uD83C\uDFCB", desc: "Chest / Shoulders / Triceps" };
    case "strength": return { name: "STRENGTH A", emoji: "\u26A1", desc: "Squat / Bench / Row" };
    case "fat_loss": return { name: "HIIT BURN", emoji: "\uD83D\uDD25", desc: "Circuit + 20min LISS" };
    case "recomp": return { name: "FULL BODY", emoji: "\u2696\uFE0F", desc: "Moderate weights + HIIT" };
    default: return { name: "PUSH DAY", emoji: "\uD83C\uDFCB", desc: "Chest / Shoulders / Triceps" };
  }
}

function MacroRingChart({ protein, carbs, fat }: { protein: number; carbs: number; fat: number }) {
  const total = protein + carbs + fat;
  const pct = (v: number) => (v / total) * 100;
  const R = 54;
  const CX = 80, CY = 80;

  const segments = [
    { label: "PROTEIN", pct: pct(protein), color: "#dc2626" },
    { label: "CARBS",   pct: pct(carbs),   color: "#ea580c" },
    { label: "FATS",    pct: pct(fat),      color: "#facc15" },
  ];

  let cumulative = 0;
  const arcs = segments.map((s) => {
    const start = cumulative;
    cumulative += s.pct;
    const end = cumulative;
    return {
      ...s,
      startAngle: (start / 100) * 360,
      endAngle: (end / 100) * 360,
    };
  });

  return (
    <div className="flex flex-col items-center">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <g transform="rotate(-90 80 80)">
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
          {arcs.map((seg) => (
            <motion.path
              key={seg.label}
              d={describeArc(CX, CY, R, seg.startAngle, seg.endAngle)}
              fill="none"
              stroke={seg.color}
              strokeWidth="10"
              strokeLinecap="butt"
              className="drop-shadow-[0_0_6px_rgba(220,38,38,0.3)]"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          ))}
        </g>
      </svg>
      <div className="flex gap-4 mt-3 font-dm-mono text-[11px]">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-gray-400">{s.label}</span>
            <span className="text-white">{Math.round(s.pct)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VolumeBar({ day, volume, delay }: { day: string; volume: number; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: "0%" },
        { width: `${volume * 8}%`, duration: 1, ease: "power2.out", delay }
      );
    }
  }, [volume, delay]);

  return (
    <div className="flex items-center gap-3">
      <span className="font-dm-mono text-[11px] text-[var(--color-text-secondary)] w-8 text-right">{day}</span>
      <div className="flex-1 h-3 bg-black rounded-sm border border-white/5 overflow-hidden relative">
        <div
          ref={barRef}
          className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[var(--color-red-dim)] to-[var(--color-red-glow)]"
          style={{ width: 0 }}
        />
      </div>
      <span className="font-dm-mono text-xs text-white w-6 text-right">{volume}</span>
    </div>
  );
}

function CountUp({ value, decimals = 0, className = "" }: { value: number; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current,
        { innerHTML: 0 },
        {
          innerHTML: value,
          duration: 1.2,
          ease: "power2.out",
          snap: { innerHTML: Math.pow(10, -decimals) },
          onUpdate: function () {
            if (ref.current) {
              ref.current.innerHTML = Number(this.targets()[0].innerHTML).toFixed(decimals);
            }
          },
        }
      );
    }
  }, [value, decimals]);

  return <span ref={ref} className={className}>0</span>;
}

export default function Dashboard() {
  const { analysis, workouts, profile, streak } = useApexStore();

  if (!analysis) return null;

  const thisWeekWorkouts = workouts.filter(w => {
    const wDate = new Date(w.date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - wDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  }).length;

  const macrosTotal = analysis.macros.protein + analysis.macros.carbs + analysis.macros.fat;
  const goal = profile?.goal;
  const weeklyVolume = generateWeeklyVolume(goal);
  const nextWorkout = getWorkoutSuggestion(goal);

  const priorityGlow = {
    critical: "shadow-[0_0_10px_rgba(220,38,38,0.5)]",
    high: "shadow-[0_0_10px_rgba(234,88,12,0.5)]",
    medium: "shadow-[0_0_0px_rgba(255,255,255,0.5)]",
    low: "",
  };

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col relative z-10">
        <TopBar title="APEX COMMAND" />

        <main className="p-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <StatCard
                title="BMI"
                value={analysis.bmi}
                decimals={1}
                badge={{
                  text: analysis.bmiCategory,
                  color: analysis.bmiCategory === "Normal" ? "green" : analysis.bmiCategory === "Overweight" ? "yellow" : "red"
                }}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <StatCard
                title="DAILY ENERGY EXPENDITURE"
                value={analysis.tdee}
                suffix="KCAL"
                badge={{ text: `TARGET: ${analysis.targetCalories} KCAL`, color: "red" }}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <GlassCard className="p-6 hover:red-glow-box group">
                <h3 className="font-dm-mono text-sm text-[var(--color-text-secondary)] uppercase mb-2 group-hover:text-white transition-colors">STREAK</h3>
                <div className="flex items-end gap-2">
                  <div className="flex gap-1 items-end">
                    <CountUp value={streak} className="font-ibm-plex text-5xl text-[var(--color-text-primary)]" />
                    <span className="font-ibm-plex text-2xl text-[var(--color-text-muted)] mb-1">DAYS</span>
                  </div>
                  {streak >= 7 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.5 }}
                      className="mb-1"
                    >
                      <Flame size={28} className="text-orange-500 drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]" />
                    </motion.div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <StatCard
                title="WEEKLY SESSIONS"
                value={thisWeekWorkouts}
                suffix="/ 6"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2"
            >
              <GlassCard className="p-8">
                <h3 className="font-bebas text-3xl text-white tracking-widest mb-8">NUTRITIONAL PARAMETERS</h3>
                <div className="space-y-6">
                  <MacroBar label="PROTEIN" grams={analysis.macros.protein} percentage={Math.round((analysis.macros.protein / macrosTotal) * 100)} delay={0.6} />
                  <MacroBar label="CARBOHYDRATES" grams={analysis.macros.carbs} percentage={Math.round((analysis.macros.carbs / macrosTotal) * 100)} delay={0.8} />
                  <MacroBar label="FATS" grams={analysis.macros.fat} percentage={Math.round((analysis.macros.fat / macrosTotal) * 100)} delay={1.0} />
                </div>
                <div className="mt-8 pt-8 border-t border-white/5">
                  <h4 className="font-bebas text-xl text-white/60 tracking-wider mb-4 text-center">MACRO SPLIT</h4>
                  <MacroRingChart
                    protein={analysis.macros.protein}
                    carbs={analysis.macros.carbs}
                    fat={analysis.macros.fat}
                  />
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col h-full"
            >
              <h3 className="font-bebas text-3xl text-white tracking-widest mb-4">ACTIVE PROTOCOLS</h3>
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[500px]">
                {analysis.recommendations.map((rec, i) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.08 }}
                    className={`rounded-sm transition-shadow ${priorityGlow[rec.priority]}`}
                  >
                    <RecommendationCard rec={rec} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="lg:col-span-2"
            >
              <GlassCard className="p-6">
                <h3 className="font-bebas text-3xl text-white tracking-widest mb-6">WEEKLY VOLUME</h3>
                <div className="space-y-3">
                  {weeklyVolume.map((d, i) => (
                    <VolumeBar key={d.day} day={d.day} volume={d.volume} delay={0.1 * i} />
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <GlassCard className="p-6 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 rounded-sm border border-[var(--color-red-glow)]"
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ pointerEvents: "none" }}
                />
                <div className="relative z-10">
                  <h4 className="font-dm-mono text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">NEXT SESSION</h4>
                  <div className="text-4xl mb-2">{nextWorkout.emoji}</div>
                  <h3 className="font-bebas text-4xl text-white tracking-wider">{nextWorkout.name}</h3>
                  <p className="font-dm-mono text-sm text-gray-400 mt-2">{nextWorkout.desc}</p>
                  <motion.div
                    className="mt-4 font-barlow text-[10px] uppercase tracking-[0.2em] text-[var(--color-red-glow)] border border-[var(--color-red-dim)] px-3 py-1.5 inline-block rounded-sm"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    READY FOR ACTIVATION
                  </motion.div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
