"use client";
import { Trash2 } from "lucide-react";

interface WorkoutRowProps {
  index: number;
  exercise: { name: string; sets: number; reps: number; weight: number };
  updateExercise: (index: number, field: string, value: string | number) => void;
  removeExercise: (index: number) => void;
}

export default function WorkoutRow({ index, exercise, updateExercise, removeExercise }: WorkoutRowProps) {
  return (
    <div className="flex gap-4 items-center bg-black/40 p-2 border border-white/5 rounded-sm hover:border-[var(--color-red-dim)] transition-colors">
      <input 
        type="text" 
        value={exercise.name} 
        onChange={(e) => updateExercise(index, "name", e.target.value)}
        placeholder="MOVEMENT NAME" 
        className="flex-1 bg-transparent border-b border-white/10 focus:border-[var(--color-red-glow)] outline-none text-white font-dm-mono uppercase px-2 py-2 text-sm"
      />
      <input 
        type="number" 
        value={exercise.sets || ""} 
        onChange={(e) => updateExercise(index, "sets", parseInt(e.target.value))}
        placeholder="SETS" 
        className="w-16 bg-transparent border-b border-white/10 focus:border-[var(--color-red-glow)] outline-none text-center text-white font-ibm-plex px-2 py-2 text-sm"
      />
      <input 
        type="number" 
        value={exercise.reps || ""} 
        onChange={(e) => updateExercise(index, "reps", parseInt(e.target.value))}
        placeholder="REPS" 
        className="w-16 bg-transparent border-b border-white/10 focus:border-[var(--color-red-glow)] outline-none text-center text-white font-ibm-plex px-2 py-2 text-sm"
      />
      <input 
        type="number" 
        value={exercise.weight || ""} 
        onChange={(e) => updateExercise(index, "weight", parseFloat(e.target.value))}
        placeholder="KG" 
        className="w-20 bg-transparent border-b border-white/10 focus:border-[var(--color-red-glow)] outline-none text-center text-[var(--color-red-glow)] font-ibm-plex px-2 py-2 text-sm"
      />
      <button 
        type="button" 
        onClick={() => removeExercise(index)}
        className="text-gray-600 hover:text-[var(--color-red-glow)] p-2 transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
