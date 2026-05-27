"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface Props {
  onMidpoint?: () => void
}

export default function PageTransition({ onMidpoint }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) {
      onMidpoint?.()
      return
    }

    const overlay = overlayRef.current
    if (!overlay) return

    const tl = gsap.timeline({
      onComplete: () => {
        onMidpoint?.()
      },
    })

    tl.set(overlay, { display: "block" })

    tl.fromTo(
      overlay,
      { clipPath: "circle(0% at 50% 50%)" },
      { clipPath: "circle(150% at 50% 50%)", duration: 0.4, ease: "cinematic" },
      0.2
    )

    tl.to(overlay, { opacity: 0, duration: 0.4, ease: "cinematic" }, 0.6)

    tl.set(overlay, { display: "none" }, 1.0)

  }, [prefersReduced, onMidpoint])

  if (prefersReduced) return null

  return (
    <div
      ref={overlayRef}
      className="z-transition"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#050505",
        display: "none",
        pointerEvents: "none",
      }}
    />
  )
}
