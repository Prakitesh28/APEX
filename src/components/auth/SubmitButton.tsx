"use client"

import { ButtonHTMLAttributes } from "react"
import MagneticWrapper from "@/components/motion/MagneticWrapper"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  success?: boolean
}

export default function SubmitButton({ children, loading, className = "", ...props }: Props) {
  return (
    <MagneticWrapper className="w-full">
      <button
        className={`apex-submit w-full ${className}`}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
            AUTHENTICATING
          </span>
        ) : (
          children
        )}
      </button>
      <style jsx>{`
        .apex-submit {
          background: linear-gradient(135deg, #3a0000, #5a0000);
          border: 1px solid rgba(255,30,30,0.3);
          border-radius: 2px;
          color: #f5f5f5;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 0.2em;
          padding: 18px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s;
        }
        .apex-submit::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,30,30,0.15), transparent);
          transition: left 0.5s ease;
        }
        .apex-submit:hover::before {
          left: 100%;
        }
        .apex-submit:hover {
          border-color: rgba(255,30,30,0.7);
          box-shadow: 0 0 30px rgba(255,30,30,0.3), 0 0 60px rgba(255,30,30,0.1);
          transform: translateY(-1px) scale(1.005);
        }
        .apex-submit:active {
          transform: translateY(0) scale(0.998);
          box-shadow: 0 0 10px rgba(255,30,30,0.2);
        }
        .apex-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </MagneticWrapper>
  )
}
