"use client"

import { useRef, useCallback } from "react"
import { gsap } from "gsap"

export function useMagnet() {
  const elRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = elRef.current
    const inner = innerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) * 0.35
    const y = (e.clientY - centerY) * 0.35

    gsap.to(el, { x, y, duration: 0.5, ease: "power2.out", overwrite: "auto" })
    if (inner) {
      gsap.to(inner, { x: x * 0.5, y: y * 0.5, duration: 0.5, ease: "power2.out", overwrite: "auto" })
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = elRef.current
    const inner = innerRef.current
    if (el) gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,0.3)", overwrite: "auto" })
    if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,0.3)", overwrite: "auto" })
  }, [])

  return { elRef, innerRef, handleMouseMove, handleMouseLeave }
}
