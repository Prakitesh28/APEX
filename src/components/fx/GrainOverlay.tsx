"use client"

export default function GrainOverlay() {
  return (
    <>
      <svg style={{ display: "none" }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="overlay" />
        </filter>
      </svg>
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.04,
          filter: "url(#grain)",
          background: "#ffffff",
          zIndex: 3,
        }}
        aria-hidden="true"
      />
    </>
  )
}
