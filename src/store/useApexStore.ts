import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Recommendation } from "@/lib/rules";

export interface Workout {
  id: string;
  name: string;
  type: string;
  notes: string;
  date: string;
  exercises: {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight: number;
  }[];
}

interface ApexStore {
  user: {
    id: string;
    name: string;
    gender: string;
    age: number;
  } | null;
  profile: {
    heightCm: number;
    weightKg: number;
    activityLevel: string;
    goal: string;
  } | null;
  analysis: {
    bmr: number;
    tdee: number;
    bmi: number;
    bmiCategory: string;
    targetCalories: number;
    macros: {
      protein: number;
      carbs: number;
      fat: number;
    };
    recommendations: Recommendation[];
  } | null;
  workouts: Workout[];
  streak: number;
  setUser: (user: ApexStore["user"]) => void;
  setProfile: (profile: ApexStore["profile"]) => void;
  setAnalysis: (analysis: ApexStore["analysis"]) => void;
  addWorkout: (workout: Workout) => void;
  setStreak: (n: number) => void;
  clearAll: () => void;
}

export const useApexStore = create<ApexStore>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      analysis: null,
      workouts: [],
      streak: 0,
      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      setAnalysis: (analysis) => set({ analysis }),
      addWorkout: (workout) => set((state) => ({ workouts: [...state.workouts, workout] })),
      setStreak: (streak) => set({ streak }),
      clearAll: () => set({ user: null, profile: null, analysis: null, workouts: [], streak: 0 }),
    }),
    {
      name: "apex-v1",
    }
  )
);
