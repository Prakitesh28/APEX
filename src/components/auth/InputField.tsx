"use client"

import { InputHTMLAttributes } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  error?: string
}

export default function InputField({ label, id, error, className = "", ...props }: Props) {
  return (
    <div className="relative mb-6">
      <input
        id={id}
        className={`
          apex-input peer w-full
          ${error ? "border-[#ff1e1e] shadow-[0_0_0_1px_rgba(255,30,30,0.3),0_0_20px_rgba(255,30,30,0.08)]" : ""}
          ${className}
        `}
        placeholder=" "
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      <label htmlFor={id} className="apex-label">
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="text-[#ff1e1e] text-[10px] tracking-[0.15em] uppercase mt-1 font-mono" role="alert">
          {error}
        </p>
      )}
      <style jsx>{`
        .apex-input {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          color: #f5f5f5;
          font-family: 'Anton', sans-serif;
          letter-spacing: 0.08em;
          font-size: 13px;
          padding: 14px 16px;
          transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
          outline: none;
        }
        .apex-input:focus {
          border-color: rgba(255,30,30,0.6);
          background: rgba(255,30,30,0.03);
          box-shadow: 0 0 0 1px rgba(255,30,30,0.2), 0 0 20px rgba(255,30,30,0.08), inset 0 0 12px rgba(255,30,30,0.04);
        }
        .apex-label {
          position: absolute;
          top: 14px;
          left: 16px;
          transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
          color: rgba(245,245,245,0.35);
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-family: 'Anton', sans-serif;
        }
        .apex-input:focus ~ .apex-label,
        .apex-input:not(:placeholder-shown) ~ .apex-label {
          top: -8px;
          font-size: 9px;
          color: rgba(255,30,30,0.8);
          background: #0d0d0d;
          padding: 0 4px;
        }
      `}</style>
    </div>
  )
}
