"use client"

import { useRef, useEffect, useCallback } from "react"

export function useLerp(factor: number = 0.06) {
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const factorRef = useRef(factor)

  useEffect(() => {
    factorRef.current = factor
  }, [factor])

  const setTarget = useCallback((x: number, y: number) => {
    targetRef.current = { x, y }
  }, [])

  useEffect(() => {
    const tick = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * factorRef.current
      posRef.current.y += (targetRef.current.y - posRef.current.y) * factorRef.current
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return { posRef, setTarget }
}
