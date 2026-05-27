"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

export default function RedBloom({ intensity = 1 }: { intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.to(ref.current, {
      opacity: 0.6 * intensity,
      duration: 6,
      ease: "ease-in-out",
      repeat: -1,
      yoyo: true,
    })
  }, [intensity])

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        opacity: 0.6 * intensity,
        background: `
          radial-gradient(ellipse at 15% 80%, rgba(90,0,0,0.4) 0%, transparent 50%),
          radial-gradient(ellipse at 85% 20%, rgba(90,0,0,0.25) 0%, transparent 45%)
        `,
      }}
      aria-hidden="true"
    />
  )
}
