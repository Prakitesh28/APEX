"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import { gsap } from "gsap"

interface LightningContextType {
  isLightningActive: boolean
  triggerLightning: () => void
}

const LightningContext = createContext<LightningContextType>({
  isLightningActive: false,
  triggerLightning: () => {},
})

export function useLightning() {
  return useContext(LightningContext)
}

export function LightningProvider({ children }: { children: React.ReactNode }) {
  const [isLightningActive, setIsLightningActive] = useState(false)

  const triggerLightning = useCallback(() => {
    setIsLightningActive(true)

    // 1. Flash body background
    const originalBg = document.body.style.backgroundColor || "#050505"
    gsap.to(document.body, {
      backgroundColor: "#1a1a1a",
      duration: 0.04,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        gsap.set(document.body, { backgroundColor: originalBg })
      }
    })

    // 2. Reveal all hidden batman silhouettes
    const silhouettes = document.querySelectorAll(".batman-reveal")
    if (silhouettes.length > 0) {
      gsap.to(silhouettes, {
        opacity: 1,
        duration: 0.04,
        yoyo: true,
        repeat: 1,
      })
    }

    // 3. Shake main content
    const mainContent = document.querySelector("main") || document.body
    gsap.to(mainContent, {
      y: 2,
      duration: 0.05,
      yoyo: true,
      repeat: 3,
      ease: "none",
      onComplete: () => gsap.set(mainContent, { y: 0 })
    })

    // Turn off active state after flash (used by CanvasRain)
    setTimeout(() => {
      setIsLightningActive(false)
    }, 100)
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const scheduleNextStrike = () => {
      const delay = Math.random() * (20000 - 8000) + 8000 // 8 to 20 seconds
      timeoutId = setTimeout(() => {
        triggerLightning()
        scheduleNextStrike()
      }, delay)
    }

    scheduleNextStrike()

    return () => clearTimeout(timeoutId)
  }, [triggerLightning])

  return (
    <LightningContext.Provider value={{ isLightningActive, triggerLightning }}>
      {children}
    </LightningContext.Provider>
  )
}
