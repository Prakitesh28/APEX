export default function GlassCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`glass-panel rounded-sm relative overflow-hidden group transition-all duration-300 hover:border-white/10 ${className}`}>
      {children}
    </div>
  );
}
