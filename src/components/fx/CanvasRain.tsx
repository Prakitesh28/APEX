"use client"

import { useEffect, useRef } from "react"
import { useLightning } from "./LightningProvider"

interface RainDrop {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  angle: number
}

export default function CanvasRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isLightningActive } = useLightning()
  const isLightningRef = useRef(false)
  const scrollYRef = useRef(0)

  // Keep ref in sync for animation loop
  useEffect(() => {
    isLightningRef.current = isLightningActive
  }, [isLightningActive])

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener("resize", handleResize)

    // Config
    const maxDrops = width < 768 ? 150 : 300
    const drops: RainDrop[] = []

    for (let i = 0; i < maxDrops; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 15 + Math.random() * 25,
        speed: 8 + Math.random() * 10,
        opacity: 0.08 + Math.random() * 0.27,
        angle: 15 + Math.random() * 5, // 15 to 20 degrees
      })
    }

    let animationFrameId: number

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      
      const lightningMultiplier = isLightningRef.current ? 1.5 : 1
      // Add subtle speed increase based on scroll (simulated by just adding a tiny bit if scrolled, though usually scroll speed is delta. Let's just use constant)

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i]
        
        // Update position
        drop.y += drop.speed * lightningMultiplier
        drop.x += (drop.speed * lightningMultiplier) * Math.tan((drop.angle * Math.PI) / 180)

        // Wrap around
        if (drop.y > height) {
          drop.y = -drop.length
          drop.x = Math.random() * width
        }
        if (drop.x > width) {
          drop.x = -drop.length
        }

        // Draw
        ctx.beginPath()
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(
          drop.x + drop.length * Math.tan((drop.angle * Math.PI) / 180),
          drop.y + drop.length
        )
        
        ctx.lineWidth = 1
        if (isLightningRef.current) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(drop.opacity * 3, 0.8)})`
        } else {
          ctx.strokeStyle = `rgba(200, 220, 240, ${drop.opacity})`
        }
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        opacity: 1,
        transition: "opacity 0.3s ease",
      }}
    />
  )
}
