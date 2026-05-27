"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApexStore } from "@/store/useApexStore";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import GlassCard from "@/components/ui/GlassCard";
import RedButton from "@/components/ui/RedButton";
import { calcAll } from "@/lib/calc";
import { generateRecommendations } from "@/lib/rules";

export default function Profile() {
  const router = useRouter();
  const { user, profile, setUser, setProfile, setAnalysis, clearAll } = useApexStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showWipeConfirm, setShowWipeConfirm] = useState(false);

  // Edit State
  const [editName, setEditName] = useState(user?.name || "");
  const [editAge, setEditAge] = useState(user?.age || 0);
  const [editHeight, setEditHeight] = useState(profile?.heightCm || 0);
  const [editWeight, setEditWeight] = useState(profile?.weightKg || 0);

  if (!user || !profile) return null;

  const handleSave = () => {
    const userObj = { ...user, name: editName, age: editAge };
    const profileObj = { ...profile, heightCm: editHeight, weightKg: editWeight };
    
    const analysisObj = calcAll(profileObj.weightKg, profileObj.heightCm, userObj.age, userObj.gender, profileObj.activityLevel, profileObj.goal);
    const rules = generateRecommendations(profileObj.goal, analysisObj.bmi, profileObj.activityLevel, profileObj.weightKg, analysisObj.macros.protein);

    setUser(userObj);
    setProfile(profileObj);
    setAnalysis({ ...analysisObj, recommendations: rules });
    
    setIsEditing(false);
  };

  const handleWipeData = () => {
    clearAll();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-black relative">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col relative z-10">
        <TopBar title="OPERATIVE FILE" />
        
        <main className="p-8 pb-20 max-w-5xl mx-auto w-full flex gap-12 items-start">
          
          {/* Silhouette Abstract Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="w-1/3 flex justify-center sticky top-28"
          >
            <div className="w-full aspect-[3/4] border border-[var(--color-red-dim)] rounded-sm flex items-center justify-center red-glow-box bg-white/5 relative overflow-hidden group">
              <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] fill-transparent stroke-[var(--color-red-glow)] stroke-1 group-hover:scale-105 transition-transform duration-500">
                <path d="M50 10 C 60 10 65 20 65 30 C 65 40 55 45 50 50 C 45 45 35 40 35 30 C 35 20 40 10 50 10 Z" />
                <path d="M50 50 L 70 60 L 80 90 L 20 90 L 30 60 Z" />
              </svg>
              <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
              
              <div className="absolute bottom-4 left-4 font-dm-mono text-[10px] text-[var(--color-red-glow)] tracking-widest uppercase">
                ID: {user.id.split('-')[0]}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="w-2/3"
          >
            <GlassCard className="p-8 mb-8">
              <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-4">
                <h3 className="font-bebas text-3xl tracking-widest text-white">CURRENT PARAMETERS</h3>
                <button onClick={() => setIsEditing(true)} className="font-barlow text-sm tracking-widest text-gray-500 hover:text-[var(--color-red-glow)] transition-colors uppercase border border-white/10 px-4 py-2 rounded-sm hover:border-[var(--color-red-glow)]">
                  MODIFY
                </button>
              </div>

              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div>
                  <div className="font-dm-mono text-xs text-[var(--color-text-secondary)] tracking-widest uppercase mb-1">DESIGNATION</div>
                  <div className="font-ibm-plex text-2xl text-white uppercase">{user.name}</div>
                </div>
                <div>
                  <div className="font-dm-mono text-xs text-[var(--color-text-secondary)] tracking-widest uppercase mb-1">BIOLOGICAL SEX</div>
                  <div className="font-ibm-plex text-2xl text-white uppercase">{user.gender}</div>
                </div>
                <div>
                  <div className="font-dm-mono text-xs text-[var(--color-text-secondary)] tracking-widest uppercase mb-1">AGE</div>
                  <div className="font-ibm-plex text-2xl text-white uppercase">{user.age}</div>
                </div>
                <div>
                  <div className="font-dm-mono text-xs text-[var(--color-text-secondary)] tracking-widest uppercase mb-1">HEIGHT (CM)</div>
                  <div className="font-ibm-plex text-2xl text-white uppercase">{profile.heightCm}</div>
                </div>
                <div>
                  <div className="font-dm-mono text-xs text-[var(--color-text-secondary)] tracking-widest uppercase mb-1">WEIGHT (KG)</div>
                  <div className="font-ibm-plex text-2xl text-white uppercase">{profile.weightKg}</div>
                </div>
                <div>
                  <div className="font-dm-mono text-xs text-[var(--color-text-secondary)] tracking-widest uppercase mb-1">ACTIVITY LEVEL</div>
                  <div className="font-ibm-plex text-2xl text-[var(--color-red-glow)] uppercase">{profile.activityLevel}</div>
                </div>
                <div className="col-span-2">
                  <div className="font-dm-mono text-xs text-[var(--color-text-secondary)] tracking-widest uppercase mb-1">PRIMARY OBJECTIVE</div>
                  <div className="font-ibm-plex text-2xl text-white uppercase">{profile.goal.replace('_', ' ')}</div>
                </div>
              </div>
            </GlassCard>

            <div className="mt-20">
              <button 
                onClick={() => setShowWipeConfirm(true)}
                className="font-barlow text-xs tracking-widest uppercase text-red-900 hover:text-[var(--color-red-glow)] transition-colors underline underline-offset-4 decoration-red-900/50 hover:decoration-[var(--color-red-glow)]"
              >
                WIPE ALL DATA
              </button>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <GlassCard className="w-full max-w-xl p-8 border-[var(--color-red-dim)]">
              <h2 className="font-bebas text-3xl tracking-widest text-white mb-8 border-b border-white/10 pb-4">UPDATE PARAMETERS</h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block font-barlow uppercase tracking-widest text-xs text-[var(--color-text-secondary)] mb-2">OPERATIVE NAME</label>
                  <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full bg-transparent border-b border-white/20 focus:border-[var(--color-red-glow)] outline-none py-2 font-dm-mono text-xl text-white uppercase" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block font-barlow uppercase tracking-widest text-xs text-[var(--color-text-secondary)] mb-2">AGE</label>
                    <input type="number" value={editAge} onChange={(e) => setEditAge(parseInt(e.target.value))} className="w-full bg-transparent border-b border-white/20 focus:border-[var(--color-red-glow)] outline-none py-2 font-dm-mono text-xl text-white uppercase" />
                  </div>
                  <div className="flex-1">
                    <label className="block font-barlow uppercase tracking-widest text-xs text-[var(--color-text-secondary)] mb-2">HEIGHT (CM)</label>
                    <input type="number" value={editHeight} onChange={(e) => setEditHeight(parseFloat(e.target.value))} className="w-full bg-transparent border-b border-white/20 focus:border-[var(--color-red-glow)] outline-none py-2 font-dm-mono text-xl text-white uppercase" />
                  </div>
                  <div className="flex-1">
                    <label className="block font-barlow uppercase tracking-widest text-xs text-[var(--color-text-secondary)] mb-2">WEIGHT (KG)</label>
                    <input type="number" value={editWeight} onChange={(e) => setEditWeight(parseFloat(e.target.value))} className="w-full bg-transparent border-b border-white/20 focus:border-[var(--color-red-glow)] outline-none py-2 font-dm-mono text-xl text-white uppercase" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button onClick={() => setIsEditing(false)} className="font-barlow text-sm uppercase tracking-widest text-gray-500 hover:text-white px-6 py-3 border border-transparent">
                  CANCEL
                </button>
                <RedButton onClick={handleSave} className="!text-lg !px-6 !py-3">
                  SAVE UPDATES
                </RedButton>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wipe Confirm Modal */}
      <AnimatePresence>
        {showWipeConfirm && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <GlassCard className="w-full max-w-md p-8 border-[var(--color-red-glow)] shadow-[0_0_50px_rgba(220,38,38,0.3)] text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="font-bebas text-4xl tracking-widest text-[var(--color-red-glow)] mb-4">WARNING</h2>
              <p className="font-dm-mono text-sm text-gray-400 mb-8 leading-relaxed">
                You are about to wipe all operational data. This action is irreversible and will return the system to its initial state.
              </p>
              
              <div className="flex justify-center gap-4">
                <button onClick={() => setShowWipeConfirm(false)} className="font-barlow text-sm uppercase tracking-widest text-white hover:text-gray-300 px-6 py-3 border border-white/10 rounded-sm">
                  ABORT
                </button>
                <button onClick={handleWipeData} className="bg-[var(--color-red-glow)] text-black font-barlow font-bold text-sm uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-white transition-colors">
                  CONFIRM WIPE
                </button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
