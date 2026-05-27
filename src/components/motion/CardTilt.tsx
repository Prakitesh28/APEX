"use client"

import { useRef, useCallback, useEffect } from "react"
import { gsap } from "gsap"

interface Props {
  children: React.ReactNode
  className?: string
}

export default function CardTilt({ children, className = "" }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateX = (e.clientY - centerY) / rect.height * -8
    const rotateY = (e.clientX - centerX) / rect.width * 8
    gsap.to(el, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 1.2,
      ease: "elastic.out(1,0.4)",
      overwrite: "auto",
    })
  }, [])

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    el.style.transformStyle = "preserve-3d"
  }, [])

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
