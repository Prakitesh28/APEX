"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useApexStore } from "@/store/useApexStore";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import GlassCard from "@/components/ui/GlassCard";
import RedButton from "@/components/ui/RedButton";
import WorkoutRow from "@/components/ui/WorkoutRow";

export default function WorkoutLogger() {
  const { addWorkout, setStreak, streak } = useApexStore();
  
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [exercises, setExercises] = useState([{ id: crypto.randomUUID(), name: "", sets: 0, reps: 0, weight: 0 }]);
  const [showSuccess, setShowSuccess] = useState(false);

  const types = ["PUSH", "PULL", "LEGS", "FULL BODY", "CARDIO"];

  const handleAddExercise = () => {
    setExercises([...exercises, { id: crypto.randomUUID(), name: "", sets: 0, reps: 0, weight: 0 }]);
  };

  const handleUpdateExercise = (index: number, field: string, value: string | number) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!name || !type) return;

    addWorkout({
      id: crypto.randomUUID(),
      name,
      type,
      notes,
      date: new Date().toISOString(),
      exercises
    });
    
    setStreak(streak + 1);
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setName("");
      setType("");
      setNotes("");
      setExercises([{ id: crypto.randomUUID(), name: "", sets: 0, reps: 0, weight: 0 }]);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-black relative">
      {showSuccess && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[var(--color-red-glow)] z-50 mix-blend-screen pointer-events-none"
        />
      )}
      
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col relative z-10">
        <TopBar title="LOG TRAINING SESSION" />
        
        <main className="p-8 pb-20 max-w-5xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <GlassCard className="p-8 mb-8">
              <div className="mb-8 flex flex-wrap gap-4">
                {types.map(t => (
                  <button 
                    key={t}
                    onClick={() => setType(t)}
                    className={`py-3 px-6 font-bebas text-xl tracking-widest transition-all rounded-sm ${type === t ? "bg-[var(--color-red-dim)] border border-[var(--color-red-glow)] text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]" : "bg-black/50 border border-white/10 text-gray-400 hover:border-white/30"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="SESSION DESIGNATION"
                className="w-full bg-transparent border-b border-white/20 focus:border-[var(--color-red-glow)] outline-none py-4 font-dm-mono text-3xl text-white transition-colors mb-12 uppercase"
              />

              <div className="space-y-4 mb-8">
                <div className="flex gap-4 px-2 font-barlow text-xs text-[var(--color-text-secondary)] tracking-widest uppercase">
                  <div className="flex-1">EXERCISE</div>
                  <div className="w-16 text-center">SETS</div>
                  <div className="w-16 text-center">REPS</div>
                  <div className="w-20 text-center">WEIGHT</div>
                  <div className="w-8"></div>
                </div>
                
                {exercises.map((ex, i) => (
                  <WorkoutRow 
                    key={ex.id} 
                    index={i} 
                    exercise={ex} 
                    updateExercise={handleUpdateExercise} 
                    removeExercise={handleRemoveExercise} 
                  />
                ))}
              </div>

              <button 
                onClick={handleAddExercise}
                className="w-full py-4 border border-dashed border-[var(--color-red-dim)] text-[var(--color-red-glow)] font-barlow text-sm uppercase tracking-widest hover:bg-[var(--color-red-glow)] hover:text-black transition-colors mb-12 rounded-sm"
              >
                + ADD MOVEMENT
              </button>

              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="OPERATIONAL NOTES..."
                className="w-full h-32 bg-black/50 border border-white/10 focus:border-[var(--color-red-glow)] outline-none p-4 font-dm-mono text-sm text-gray-300 mb-8 rounded-sm resize-none"
              />

              <RedButton onClick={handleSubmit} className="w-full">
                RECORD SESSION
              </RedButton>
            </GlassCard>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
