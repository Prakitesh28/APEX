"use client"

export default function LoadingBar({ progress }: { progress: number }) {
  return (
    <div className="relative" style={{ width: "min(400px, 80vw)" }}>
      <div
        className="loading-bar-track"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,30,30,0.2)",
          borderRadius: 2,
          height: 2,
          width: "100%",
          position: "relative",
          overflow: "visible",
        }}
      >
        <div
          className="loading-bar-fill"
          style={{
            background: "linear-gradient(90deg, #5a0000, #ff1e1e)",
            boxShadow: "0 0 20px #ff1e1e, 0 0 40px rgba(255,30,30,0.27)",
            height: "100%",
            width: `${Math.min(progress, 100)}%`,
            transition: "width 0.1s linear",
            borderRadius: 2,
          }}
        />
        <div
          className="loading-bar-glow-head"
          style={{
            position: "absolute",
            right: 0,
            top: -4,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#ff1e1e",
            boxShadow: "0 0 12px #ff1e1e, 0 0 24px #ff1e1e",
            filter: "blur(1px)",
            marginRight: -4,
          }}
        />
        <div
          className="loading-bar-scanline"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 40,
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            animation: "scanline 1.2s linear infinite",
          }}
        />
      </div>
      <style>{`
        @keyframes scanline {
          0% { left: 0; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  )
}
