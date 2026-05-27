"use client";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useApexStore } from "@/store/useApexStore";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/ui/StatCard";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function Progress() {
  const { workouts } = useApexStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { thisWeek, bestStreak, favType, volumeData, weeklyData } = useMemo(() => {
    const now = new Date();
    let weekCount = 0;
    const typeCount: Record<string, number> = {};
    
    const wData = [
      { name: "Week -3", sessions: 0 },
      { name: "Week -2", sessions: 0 },
      { name: "Week -1", sessions: 0 },
      { name: "This Week", sessions: 0 },
    ];

    const vData: any[] = [];

    workouts.forEach(w => {
      const wDate = new Date(w.date);
      const diffTime = Math.abs(now.getTime() - wDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 7) weekCount++;
      
      typeCount[w.type] = (typeCount[w.type] || 0) + 1;

      if (diffDays <= 7) wData[3].sessions++;
      else if (diffDays <= 14) wData[2].sessions++;
      else if (diffDays <= 21) wData[1].sessions++;
      else if (diffDays <= 28) wData[0].sessions++;

      const volume = w.exercises.reduce((acc, ex) => acc + (ex.sets * ex.reps * ex.weight), 0);
      if (volume > 0) {
        vData.push({
          date: wDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          volume: volume
        });
      }
    });

    let favorite = "NONE";
    let maxCount = 0;
    Object.entries(typeCount).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        favorite = type;
      }
    });

    return {
      thisWeek: weekCount,
      bestStreak: useApexStore.getState().streak,
      favType: favorite,
      weeklyData: wData,
      volumeData: vData.slice(-10)
    };
  }, [workouts]);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col relative z-10">
        <TopBar title="PERFORMANCE METRICS" />
        
        <main className="p-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <StatCard title="TOTAL SESSIONS" value={workouts.length} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <StatCard title="THIS WEEK" value={thisWeek} suffix="/ 6" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <StatCard title="BEST STREAK" value={bestStreak} suffix="DAYS" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <GlassCard className="p-6 h-full flex flex-col justify-center">
                <h3 className="font-dm-mono text-sm text-[var(--color-text-secondary)] uppercase mb-2">FAV WORKOUT</h3>
                <div className="font-bebas text-4xl text-[var(--color-red-glow)] red-glow-text">{favType}</div>
              </GlassCard>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <GlassCard className="p-6 h-96">
                <h3 className="font-bebas text-2xl tracking-widest mb-6">TOTAL WORKOUT VOLUME (KG)</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={volumeData}>
                    <XAxis dataKey="date" stroke="#525252" tick={{ fill: '#a3a3a3', fontSize: 12, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#525252" tick={{ fill: '#a3a3a3', fontSize: 12, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(220,38,38,0.4)', borderRadius: '2px', fontFamily: 'monospace' }}
                      itemStyle={{ color: '#ef4444' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="volume" 
                      stroke="var(--color-red-primary)" 
                      strokeWidth={2}
                      dot={{ r: 4, fill: "var(--color-red-glow)", strokeWidth: 0 }}
                      activeDot={{ r: 6, fill: "white" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <GlassCard className="p-6 h-96">
                <h3 className="font-bebas text-2xl tracking-widest mb-6">SESSIONS PER WEEK</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="name" stroke="#525252" tick={{ fill: '#a3a3a3', fontSize: 12, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#525252" tick={{ fill: '#a3a3a3', fontSize: 12, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(220,38,38,0.4)', borderRadius: '2px', fontFamily: 'monospace' }}
                      itemStyle={{ color: '#ef4444' }}
                    />
                    <Bar dataKey="sessions" fill="var(--color-red-dim)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <h3 className="font-bebas text-2xl tracking-widest mb-4">WORKOUT HISTORY</h3>
            <div className="space-y-2">
              {workouts.slice().reverse().map((w, i) => (
                <div key={w.id} className={`p-4 flex items-center justify-between transition-colors ${i % 2 === 0 ? 'bg-white/5' : 'bg-transparent'} hover:bg-white/10`}>
                  <div className="font-dm-mono text-sm text-[var(--color-text-secondary)] w-32">
                    {new Date(w.date).toLocaleDateString()}
                  </div>
                  <div className="flex-1 font-barlow uppercase tracking-widest text-white text-lg">
                    {w.name}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-dm-mono text-xs text-gray-500">{w.exercises.length} MOVEMENTS</span>
                    <span className="font-barlow text-xs tracking-widest uppercase border border-[var(--color-red-dim)] text-[var(--color-red-glow)] px-2 py-1 rounded-sm">
                      {w.type}
                    </span>
                  </div>
                </div>
              ))}
              {workouts.length === 0 && (
                <div className="text-center p-8 text-gray-500 font-dm-mono text-sm uppercase">NO INTEL LOGGED YET.</div>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
