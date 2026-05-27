"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Dumbbell, LineChart, Target, User } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "DASHBOARD", href: "/dashboard", icon: LayoutDashboard },
    { name: "WORKOUTS", href: "/workout", icon: Dumbbell },
    { name: "PROGRESS", href: "/progress", icon: LineChart },
    { name: "LOOKSMAX", href: "/looksmax", icon: Target },
    { name: "PROFILE", href: "/profile", icon: User },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-[#050505]/80 backdrop-blur-md border-r border-white/5 flex flex-col z-40">
      <div className="p-8 pb-12 flex items-center gap-3">
        <div className="w-8 h-8 bg-[var(--color-red-dim)] rounded-sm transform rotate-45 flex items-center justify-center border border-[var(--color-red-glow)]">
          <div className="w-3 h-3 bg-black rounded-sm transform -rotate-45"></div>
        </div>
        <span className="font-bebas text-3xl tracking-widest text-glow-heavy text-white">APEX</span>
      </div>

      <nav className="flex-1 flex flex-col gap-2 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href}>
              <div className={`flex items-center gap-4 px-4 py-4 rounded-sm transition-all duration-300 ${isActive ? "bg-white/5 border-l-2 border-[var(--color-red-glow)]" : "hover:bg-white/5 hover:border-l-2 hover:border-[var(--color-red-dim)]"}`}>
                <Icon size={20} className={isActive ? "text-[var(--color-red-glow)]" : "text-gray-600"} />
                <span className={`font-barlow text-sm tracking-widest uppercase ${isActive ? "text-white" : "text-gray-500"}`}>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-red-glow)] to-transparent opacity-50"></div>
        <div className="font-dm-mono text-[10px] text-[var(--color-text-muted)] tracking-widest text-center">
          SYSTEM ACTIVE // V1.0.0
        </div>
      </div>
    </div>
  );
}
