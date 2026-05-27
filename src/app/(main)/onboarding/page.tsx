"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApexStore } from "@/store/useApexStore";
import { calcAll } from "@/lib/calc";
import { generateRecommendations } from "@/lib/rules";

const steps = ["IDENTITY", "PHYSICAL PARAMETERS", "PRIMARY OBJECTIVE"];

export default function Onboarding() {
  const router = useRouter();
  const { setUser, setProfile, setAnalysis } = useApexStore();

  const [step, setStep] = useState(0);
  const [wipePhase, setWipePhase] = useState<"idle" | "wipe-in" | "wipe-out">("idle");
  const [pendingStep, setPendingStep] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState<number | "">("");

  const [height, setHeight] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [activity, setActivity] = useState("");

  const [goal, setGoal] = useState("");

  const [flashVisible, setFlashVisible] = useState(false);

  useEffect(() => {
    if (wipePhase === "wipe-in") {
      const t = setTimeout(() => {
        if (pendingStep !== null) {
          setStep(pendingStep);
          setWipePhase("wipe-out");
        }
      }, 500);
      return () => clearTimeout(t);
    }
    if (wipePhase === "wipe-out") {
      const t = setTimeout(() => {
        setWipePhase("idle");
        setPendingStep(null);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [wipePhase, pendingStep]);

  const handleNext = () => {
    if (step === 0) {
      if (!name || !gender || !age) return;
      setPendingStep(1);
      setWipePhase("wipe-in");
    } else if (step === 1) {
      if (!height || !weight || !activity) return;
      setPendingStep(2);
      setWipePhase("wipe-in");
    } else if (step === 2) {
      if (!goal) return;

      const userObj = {
        id: crypto.randomUUID(),
        name,
        gender,
        age: Number(age),
      };

      const profileObj = {
        heightCm: Number(height),
        weightKg: Number(weight),
        activityLevel: activity,
        goal,
      };

      const analysisObj = calcAll(
        profileObj.weightKg,
        profileObj.heightCm,
        userObj.age,
        userObj.gender,
        profileObj.activityLevel,
        profileObj.goal
      );
      const rules = generateRecommendations(
        profileObj.goal,
        analysisObj.bmi,
        profileObj.activityLevel,
        profileObj.weightKg,
        analysisObj.macros.protein
      );

      setUser(userObj);
      setProfile(profileObj);
      setAnalysis({ ...analysisObj, recommendations: rules });

      setFlashVisible(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    }
  };

  const activityOptions = [
    { id: "SEDENTARY", desc: "MINIMAL DAILY MOVEMENT" },
    { id: "LIGHT", desc: "1\u20132 DAYS PER WEEK" },
    { id: "MODERATE", desc: "3\u20134 DAYS PER WEEK" },
    { id: "ACTIVE", desc: "5\u20136 DAYS PER WEEK" },
    { id: "ELITE", desc: "DAILY INTENSE TRAINING" },
  ];

  const goalOptions = [
    { id: "FAT_LOSS", label: "FAT LOSS", desc: "Eliminate excess. Reveal the weapon beneath." },
    { id: "MUSCLE_GAIN", label: "MUSCLE GAIN", desc: "Build mass. Become immovable." },
    { id: "RECOMP", label: "RECOMPOSITION", desc: "Simultaneous transformation protocol." },
    { id: "AESTHETICS", label: "AESTHETICS", desc: "Shape the silhouette. Perfect the form." },
    { id: "STRENGTH", label: "STRENGTH", desc: "Raw power. Maximum output." },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 relative bg-black overflow-hidden">

      <div className="absolute top-0 left-0 h-1 z-50 transition-all duration-700 ease-out" style={{ width: `${((step + 1) / steps.length) * 100}%`, boxShadow: "0 0 20px var(--color-red-glow), 0 0 60px var(--color-red-glow), 0 0 100px var(--color-red-glow)" }}>
        <div className="absolute inset-0 bg-[var(--color-red-glow)]" />
        <div className="absolute inset-0 bg-[var(--color-red-glow)] opacity-40 animate-pulse" />
      </div>

      <div className="absolute top-8 right-8 z-50 flex items-center gap-4">
        <div className="relative font-dm-mono text-[var(--color-text-secondary)] tracking-[0.3em] flex items-center">
          <span className="text-xs/4 text-[var(--color-red-glow)]/40">[</span>
          <span className="mx-1 text-sm">0{step + 1} / 0{steps.length}</span>
          <span className="text-xs/4 text-[var(--color-red-glow)]/40">]</span>
          <div className="absolute -inset-3 bg-gradient-to-r from-transparent via-[var(--color-red-glow)]/5 to-transparent animate-pulse pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.3) 1px, rgba(255,255,255,0.3) 2px)" }} />
        </div>
        <span className="font-dm-mono text-[10px] tracking-[0.25em] text-[var(--color-red-glow)]/50">{steps[step]}</span>
      </div>

      <AnimatePresence mode="wait">
        {wipePhase !== "idle" && (
          <motion.div
            key={wipePhase}
            className="fixed inset-0 z-[100] pointer-events-none"
            style={{
              background: "linear-gradient(270deg, rgba(220,38,38,0.98) 0%, rgba(127,29,29,0.95) 40%, rgba(220,38,38,0.98) 100%)",
              willChange: "clip-path",
            }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{
              clipPath: wipePhase === "wipe-in" ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
            }}
            exit={{ clipPath: "inset(0 100% 0 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>

      {flashVisible && (
        <motion.div
          className="fixed inset-0 z-[9999]"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(220,38,38,0.7) 40%, rgba(0,0,0,0.9) 100%)",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={() => setFlashVisible(false)}
        />
      )}

      <div className="w-full max-w-2xl relative z-10">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full"
        >
          <motion.div
            className="glass-panel rounded-2xl p-10 md:p-14"
            animate={{ y: [-5, 5] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            {step === 0 && (
              <div className="space-y-10">
                <div>
                  <label className="block font-barlow uppercase tracking-widest text-xs text-[var(--color-text-secondary)] mb-2">OPERATIVE NAME</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-white/20 focus:border-[var(--color-red-glow)] outline-none py-4 font-dm-mono text-3xl text-white transition-all duration-300 focus:shadow-[0_0_20px_rgba(220,38,38,0.3)] placeholder:text-[var(--color-text-muted)]"
                    placeholder="ENTER DESIGNATION"
                  />
                </div>
                <div>
                  <label className="block font-barlow uppercase tracking-widest text-xs text-[var(--color-text-secondary)] mb-4">BIOLOGICAL SEX</label>
                  <div className="flex gap-4">
                    {["MALE", "FEMALE", "OTHER"].map((g) => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={`flex-1 py-4 px-6 font-dm-mono text-sm tracking-widest rounded-full transition-all duration-300 ${
                          gender === g
                            ? "bg-[var(--color-red-glow)]/10 border-2 border-[var(--color-red-glow)] text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                            : "bg-transparent border-2 border-white/10 text-gray-500 hover:border-white/30"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-barlow uppercase tracking-widest text-xs text-[var(--color-text-secondary)] mb-2">OPERATIVE AGE</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                    className="w-full bg-transparent border-b-2 border-white/20 focus:border-[var(--color-red-glow)] outline-none py-4 font-dm-mono text-5xl text-white transition-all duration-300 focus:shadow-[0_0_20px_rgba(220,38,38,0.3)] placeholder:text-[var(--color-text-muted)]"
                    placeholder="00"
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-10">
                <div className="flex gap-8">
                  <div className="flex-1">
                    <label className="block font-barlow uppercase tracking-widest text-xs text-[var(--color-text-secondary)] mb-2">HEIGHT (CM)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(parseFloat(e.target.value))}
                      className="w-full bg-transparent border-b-2 border-white/20 focus:border-[var(--color-red-glow)] outline-none py-4 font-dm-mono text-4xl text-white transition-all duration-300 focus:shadow-[0_0_20px_rgba(220,38,38,0.3)] placeholder:text-[var(--color-text-muted)]"
                      placeholder="000"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block font-barlow uppercase tracking-widest text-xs text-[var(--color-text-secondary)] mb-2">WEIGHT (KG)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(parseFloat(e.target.value))}
                      className="w-full bg-transparent border-b-2 border-white/20 focus:border-[var(--color-red-glow)] outline-none py-4 font-dm-mono text-4xl text-white transition-all duration-300 focus:shadow-[0_0_20px_rgba(220,38,38,0.3)] placeholder:text-[var(--color-text-muted)]"
                      placeholder="00.0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-barlow uppercase tracking-widest text-xs text-[var(--color-text-secondary)] mb-4">ACTIVITY LEVEL</label>
                  <div className="flex flex-col gap-3">
                    {activityOptions.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setActivity(a.id)}
                        className={`w-full py-5 px-6 flex items-center justify-between transition-all duration-300 rounded-xl ${
                          activity === a.id
                            ? "glass-panel border border-[var(--color-red-glow)] red-glow-box text-white"
                            : "glass-panel border-white/5 text-gray-500 hover:border-white/20"
                        }`}
                      >
                        <span className="font-bebas text-2xl tracking-widest">{a.id}</span>
                        <span className="font-dm-mono text-[10px] tracking-[0.2em] text-[var(--color-text-muted)]">{a.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <label className="block font-barlow uppercase tracking-widest text-xs text-[var(--color-text-secondary)] mb-4">PRIMARY OBJECTIVE</label>
                {goalOptions.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`w-full text-left p-6 transition-all duration-300 rounded-xl group ${
                      goal === g.id
                        ? "glass-panel border border-[var(--color-red-glow)] red-glow-box"
                        : "glass-panel border-white/5 hover:border-[var(--color-red-glow)]/30 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)]"
                    }`}
                  >
                    <h3
                      className={`font-bebas text-3xl tracking-widest mb-2 transition-colors duration-300 ${
                        goal === g.id
                          ? "text-[var(--color-red-glow)] red-glow-text"
                          : "text-white group-hover:text-[var(--color-red-glow)]/70"
                      }`}
                    >
                      {g.label}
                    </h3>
                    <p className="font-dm-mono text-sm text-[var(--color-text-secondary)]">{g.desc}</p>
                  </button>
                ))}
              </div>
            )}

            <div className="mt-12 flex justify-end">
              <button
                onClick={handleNext}
                className="font-barlow tracking-widest uppercase text-sm text-white hover:text-[var(--color-red-glow)] transition-colors flex items-center gap-2 group"
              >
                {step === 2 ? "INITIATE APEX PROTOCOL" : "CONFIRM AND PROCEED"}{" "}
                <span className="text-xl inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
