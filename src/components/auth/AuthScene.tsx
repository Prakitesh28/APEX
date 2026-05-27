"use client"

import { useState, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import LoadingScreen from "./LoadingScreen"
import AuthCard from "./AuthCard"
import ThreeCanvas from "@/components/fx/ThreeCanvas"
import GrainOverlay from "@/components/fx/GrainOverlay"
import RedBloom from "@/components/fx/RedBloom"
import CursorGlow from "@/components/fx/CursorGlow"
import { useRouter } from "next/navigation"

interface Props {
  mode: "login" | "register"
}

export default function AuthScene({ mode }: Props) {
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [authSuccess, setAuthSuccess] = useState(false)
  const [userName, setUserName] = useState("")
  const prefersReduced = useReducedMotion()
  const router = useRouter()

  const handleAuth = useCallback(async (data: { email: string; password: string; username?: string; confirmPassword?: string; mode: "login" | "register" }) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setUserName(data.username || data.email.split("@")[0])
    setAuthSuccess(true)
    setTimeout(() => {
      router.push("/onboarding")
    }, 4000)
  }, [router])

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999 }}>
      {authSuccess ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#050505",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 64,
              letterSpacing: "0.12em",
              color: "#f5f5f5",
              textShadow: "0 0 40px #ff1e1e",
            }}
          >
            WELCOME, {userName.toUpperCase()}
          </h1>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.25em",
              color: "rgba(255,30,30,0.7)",
            }}
          >
            THE SYSTEM REMEMBERS YOU.
          </p>
        </div>
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#050505",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `
                  linear-gradient(to bottom, rgba(5,5,5,0.9) 0%, transparent 30%),
                  linear-gradient(to top, rgba(5,5,5,0.95) 0%, transparent 40%),
                  linear-gradient(to right, rgba(5,5,5,0.7) 0%, transparent 30%),
                  linear-gradient(to left, rgba(5,5,5,0.7) 0%, transparent 30%),
                  radial-gradient(ellipse at center, transparent 20%, rgba(5,5,5,0.5) 100%)
                `,
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
            <div 
              style={{ 
                position: "absolute", 
                inset: 0, 
                opacity: 0.6,
                mixBlendMode: "screen",
                pointerEvents: "none",
                zIndex: 0
              }}
            >
              <img 
                src="/batman-bg.png" 
                alt="" 
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(2px) contrast(1.2)" }} 
              />
            </div>
            <div className="red-bloom" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
              <RedBloom />
            </div>
            <ThreeCanvas />
            <GrainOverlay />
            {!prefersReduced && <CursorGlow />}
          </div>

          <AnimatePresence mode="wait">
            {!loadingComplete ? (
              <LoadingScreen key="loading" onComplete={() => setLoadingComplete(true)} />
            ) : (
              <div
                key="auth"
                style={{
                  position: "relative",
                  minHeight: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 16,
                }}
              >
                <AuthCard defaultTab={mode} onAuth={handleAuth} />
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}
