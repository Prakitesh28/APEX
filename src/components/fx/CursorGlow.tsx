"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useMousePosition } from "@/hooks/useMousePosition"

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useMousePosition()
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const lerpFactor = 0.12

    const tick = () => {
      dot.style.transform = `translate(${mouse.clientX}px, ${mouse.clientY}px) translate(-50%, -50%)`
      ringPos.current.x += (mouse.clientX - ringPos.current.x) * lerpFactor
      ringPos.current.y += (mouse.clientY - ringPos.current.y) * lerpFactor
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      requestAnimationFrame(tick)
    }
    const raf = requestAnimationFrame(tick)

    const handleHoverEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button, a, input, [data-hoverable]')) {
        gsap.to(dot, { scale: 0, duration: 0.2, ease: "power2.out" })
        gsap.to(ring, { scale: 2.5, backgroundColor: "rgba(255,30,30,0.08)", borderColor: "#ff1e1e", duration: 0.3, ease: "power2.out" })
      }
    }
    const handleHoverLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button, a, input, [data-hoverable]')) {
        gsap.to(dot, { scale: 1, duration: 0.2, ease: "power2.out" })
        gsap.to(ring, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(255,30,30,0.5)", duration: 0.3, ease: "power2.out" })
      }
    }

    document.addEventListener("mouseover", handleHoverEnter)
    document.addEventListener("mouseout", handleHoverLeave)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("mouseover", handleHoverEnter)
      document.removeEventListener("mouseout", handleHoverLeave)
    }
  }, [mouse])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#ff1e1e",
          pointerEvents: "none",
          zIndex: 30,
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(255,30,30,0.5)",
          pointerEvents: "none",
          zIndex: 30,
          mixBlendMode: "screen",
          transition: "border-color 0.3s",
        }}
      />
    </>
  )
}
