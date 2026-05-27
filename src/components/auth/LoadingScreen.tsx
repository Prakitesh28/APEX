"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { registerGsapEases } from "@/lib/gsapConfig"
import LoadingBar from "./LoadingBar"
import QuoteCycler from "./QuoteCycler"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface Props {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0)
  const [showSystemReady, setShowSystemReady] = useState(false)
  const screenRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLHeadingElement>(null)
  const barContainerRef = useRef<HTMLDivElement>(null)
  const quoteContainerRef = useRef<HTMLDivElement>(null)
  const readyRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const exit = useCallback(() => {
    if (prefersReduced) {
      onComplete()
      return
    }
    const tl = gsap.timeline({
      onComplete,
    })

    tl.to(screenRef.current, { opacity: 0, duration: 0.4, ease: "cinematic" })
  }, [onComplete, prefersReduced])

  useEffect(() => {
    registerGsapEases()
    if (prefersReduced) {
      const t = setTimeout(() => onComplete(), 500)
      return () => clearTimeout(t)
    }

    const screen = screenRef.current
    const logo = logoRef.current
    const barContainer = barContainerRef.current
    const quoteContainer = quoteContainerRef.current
    if (!screen || !logo || !barContainer || !quoteContainer) return

    const letters = logo.querySelectorAll(".logo-letter")

    const tl = gsap.timeline()

    tl.to(screen, { backgroundColor: "#050505", duration: 0 })

    tl.fromTo(
      letters,
      { opacity: 0, y: 30, filter: "blur(12px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.08, ease: "cinematic" },
      1.8
    )

    tl.fromTo(
      barContainer,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "cinematic" },
      2.8
    )

    tl.fromTo(
      quoteContainer,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "cinematic" },
      3.2
    )

    const barDuration = 3
    const barStart = 3.4

    const barInterval = setInterval(() => {
      setProgress(() => {
        const elapsed = performance.now() - barStartTime
        return Math.min((elapsed / (barDuration * 1000)) * 100, 100)
      })
    }, 50)

    const barStartTime = performance.now() + barStart * 1000
    setTimeout(() => {
      const pInterval = setInterval(() => {
        setProgress(() => {
          const elapsed = performance.now() - barStartTime
          return Math.min((elapsed / (barDuration * 1000)) * 100, 100)
        })
      }, 50)

      setTimeout(() => {
        clearInterval(pInterval)
        setProgress(100)

        setTimeout(() => {
          setShowSystemReady(true)
          if (readyRef.current) {
            gsap.fromTo(
              readyRef.current,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 0.3, ease: "cinematic" }
            )
          }

          setTimeout(() => {
            exit()
          }, 1000)
        }, 400)
      }, barDuration * 1000)
    }, barStart * 1000)

    return () => {
      clearInterval(barInterval)
    }
  }, [prefersReduced, onComplete, exit])

  return (
    <div
      ref={screenRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        backgroundColor: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
      }}
    >
      <h1
        ref={logoRef}
        className="logo-text"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 72,
          letterSpacing: "0.15em",
          color: "#f5f5f5",
          textShadow: "0 0 40px #ff1e1e, 0 0 80px rgba(255,30,30,0.53)",
        }}
      >
        {"APEX".split("").map((letter, i) => (
          <span key={i} className="logo-letter" style={{ display: "inline-block" }}>
            {letter}
          </span>
        ))}
      </h1>

      <div ref={barContainerRef}>
        <LoadingBar progress={progress} />
      </div>

      <div ref={quoteContainerRef}>
        <QuoteCycler />
      </div>

      {showSystemReady && (
        <div
          ref={readyRef}
          aria-live="polite"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.25em",
            color: "#ff1e1e",
            textShadow: "0 0 20px #ff1e1e",
          }}
        >
          SYSTEM READY
        </div>
      )}
    </div>
  )
}
