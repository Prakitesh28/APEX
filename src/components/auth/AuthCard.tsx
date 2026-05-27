"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import CardTilt from "@/components/motion/CardTilt"
import TabSwitcher from "./TabSwitcher"
import InputField from "./InputField"
import SubmitButton from "./SubmitButton"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface AuthCardProps {
  defaultTab?: "login" | "register"
  onAuth: (data: { email: string; password: string; username?: string; confirmPassword?: string; mode: "login" | "register" }) => Promise<void>
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)", scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 },
  },
}

const formVariants = {
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: "easeIn" as const } },
} as const

const childStagger = (i: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.4 + i * 0.1, duration: 0.5, ease: "easeOut" as const },
  },
})

export default function AuthCard({ defaultTab = "login", onAuth }: AuthCardProps) {
  const [tab, setTab] = useState<"login" | "register">(defaultTab)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [username, setUsername] = useState("")
  const prefersReduced = useReducedMotion()

  const shakeCard = useCallback(() => {
    const el = document.querySelector(".auth-card-inner") as HTMLElement
    if (!el) return
    gsap.to(el, {
      keyframes: [
        { x: 0 },
        { x: -8 },
        { x: 8 },
        { x: -6 },
        { x: 6 },
        { x: -4 },
        { x: 4 },
        { x: 0 },
      ],
      duration: 0.5,
      ease: "power2.out",
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (tab === "register" && password !== confirmPassword) {
      setError("PASSWORDS DO NOT MATCH")
      setLoading(false)
      shakeCard()
      return
    }

    try {
      await onAuth({ email, password, username, confirmPassword, mode: tab })
      gsap.to(".apex-submit", {
        background: "linear-gradient(135deg, #5a0000, #ff1e1e)",
        duration: 1,
        ease: "power2.inOut",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "ACCESS DENIED. CHECK CREDENTIALS.")
      shakeCard()
      const redBloom = document.querySelector(".red-bloom") as HTMLElement
      if (redBloom) {
        gsap.to(redBloom, { opacity: "+0.3", duration: 0.6, yoyo: true, repeat: 1 })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (newTab: "login" | "register") => {
    setTab(newTab)
    setError("")
  }

  if (prefersReduced) {
    return (
      <div className="auth-card" style={{
        background: "rgba(13,13,13,0.75)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255,30,30,0.15)",
        borderRadius: 4,
        boxShadow: "0 0 0 1px rgba(255,30,30,0.05), 0 4px 24px rgba(0,0,0,0.6)",
        width: "min(440px, 92vw)",
        padding: "48px 40px",
        position: "relative",
      }}>
        <AuthCardContent
          tab={tab}
          onTabChange={handleTabChange}
          email={email} setEmail={setEmail}
          password={password} setPassword={setPassword}
          confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
          username={username} setUsername={setUsername}
          error={error}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </div>
    )
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: 1200 }}
    >
      <CardTilt>
        <div
          className="auth-card-inner"
          style={{
            background: "rgba(13,13,13,0.75)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,30,30,0.15)",
            borderRadius: 4,
            boxShadow: `
              0 0 0 1px rgba(255,30,30,0.05),
              0 4px 24px rgba(0,0,0,0.6),
              0 0 80px rgba(90,0,0,0.2),
              inset 0 1px 0 rgba(255,255,255,0.04)
            `,
            width: "min(440px, 92vw)",
            padding: "48px 40px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -1,
              left: -1,
              width: 20,
              height: 20,
              borderColor: "#ff1e1e",
              borderStyle: "solid",
              borderWidth: "2px 0 0 2px",
              opacity: 0.6,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -1,
              right: -1,
              width: 20,
              height: 20,
              borderColor: "#ff1e1e",
              borderStyle: "solid",
              borderWidth: "0 2px 2px 0",
              opacity: 0.6,
              pointerEvents: "none",
            }}
          />
          <AuthCardContent
            tab={tab}
            onTabChange={handleTabChange}
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
            username={username} setUsername={setUsername}
            error={error}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </div>
      </CardTilt>
    </motion.div>
  )
}

function AuthCardContent({
  tab, onTabChange,
  email, setEmail,
  password, setPassword,
  confirmPassword, setConfirmPassword,
  username, setUsername,
  error, loading, onSubmit,
}: {
  tab: "login" | "register"
  onTabChange: (t: "login" | "register") => void
  email: string; setEmail: (v: string) => void
  password: string; setPassword: (v: string) => void
  confirmPassword: string; setConfirmPassword: (v: string) => void
  username: string; setUsername: (v: string) => void
  error: string; loading: boolean; onSubmit: (e: React.FormEvent) => void
}) {
  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#ff1e1e",
            boxShadow: "0 0 12px #ff1e1e",
          }}
        />
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 28,
            letterSpacing: "0.12em",
            color: "#f5f5f5",
          }}
        >
          ENTER THE APEX
        </h2>
      </div>
      <p
        className="mb-8"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 13,
          color: "rgba(245,245,245,0.5)",
          letterSpacing: "0.1em",
        }}
      >
        Discipline creates legends.
      </p>

      <TabSwitcher activeTab={tab} onTabChange={onTabChange} />

      <AnimatePresence mode="wait">
        <motion.form
          key={tab}
          variants={formVariants}
          initial="enter"
          animate="center"
          exit="exit"
          onSubmit={onSubmit}
        >
          {tab === "register" && (
            <motion.div variants={childStagger(0)} initial="hidden" animate="visible">
              <InputField
                id="username"
                label="USERNAME"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </motion.div>
          )}
          <motion.div
            variants={childStagger(tab === "register" ? 1 : 0)}
            initial="hidden"
            animate="visible"
          >
            <InputField
              id="email"
              label="EMAIL"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>
          <motion.div
            variants={childStagger(tab === "register" ? 2 : 1)}
            initial="hidden"
            animate="visible"
          >
            <InputField
              id="password"
              label="PASSWORD"
              type="password"
              autoComplete={tab === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>
          {tab === "register" && (
            <motion.div variants={childStagger(3)} initial="hidden" animate="visible">
              <InputField
                id="confirm-password"
                label="CONFIRM PASSWORD"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </motion.div>
          )}

          {tab === "login" && (
            <div className="text-right mb-4">
              <button
                type="button"
                className="text-[10px] tracking-[0.15em] uppercase transition-all duration-300 hover:text-[#ff1e1e] hover:[text-shadow:0_0_12px_rgba(255,30,30,0.6)]"
                style={{
                  color: "rgba(245,245,245,0.35)",
                  fontFamily: "'Anton', sans-serif",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Forgot Password?
              </button>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mb-4 text-[#ff1e1e] text-[11px] tracking-[0.2em] uppercase text-center"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {error}
            </div>
          )}

          <SubmitButton type="submit" loading={loading}>
            {tab === "login" ? "ENTER THE APEX" : "JOIN THE ELITE"}
          </SubmitButton>
        </motion.form>
      </AnimatePresence>

      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-[1px]" style={{ background: "rgba(255,255,255,0.06)" }} />
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          OR CONTINUE WITH
        </span>
        <div className="flex-1 h-[1px]" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      <button
        type="button"
        data-hoverable
        className="w-full flex items-center justify-center gap-3 py-3 transition-all duration-300 hover:border-[rgba(255,30,30,0.4)]"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 2,
          color: "#f5f5f5",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 13,
          letterSpacing: "0.12em",
          cursor: "pointer",
        }}
        onClick={() => {}}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Google
      </button>
    </>
  )
}
