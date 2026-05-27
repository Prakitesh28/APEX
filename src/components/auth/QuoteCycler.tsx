"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { getRandomQuote, type BatmanQuote } from "@/lib/quotes"

function getInitialQuote(): { quote: BatmanQuote; index: number } {
  return getRandomQuote()
}

export default function QuoteCycler() {
  const [{ quote, index }, setQuoteState] = useState(getInitialQuote)
  const textRef = useRef<HTMLDivElement>(null)
  const attrRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const el = textRef.current
      const attr = attrRef.current
      if (!el) return

      gsap.to(el, {
        opacity: 0,
        y: -8,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          const { quote: q, index: i } = getRandomQuote(index)
          setQuoteState({ quote: q, index: i })
          gsap.set(el, { opacity: 0, y: 8 })
          gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
        },
      })
      if (attr) {
        gsap.to(attr, { opacity: 0, duration: 0.3 })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [index])

  useEffect(() => {
    if (attrRef.current) {
      gsap.fromTo(attrRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.4 })
    }
  }, [quote])

  return (
    <div className="text-center" style={{ width: "min(400px, 80vw)" }}>
      <div
        ref={textRef}
        className="text-[#f5f5f5] tracking-[0.08em] leading-relaxed"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 500 }}
      >
        &ldquo;{quote.text}&rdquo;
      </div>
      {quote.attribution && (
        <p
          ref={attrRef}
          className="text-[#ff1e1e]/70 text-[11px] tracking-[0.12em] mt-1"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {quote.attribution}
        </p>
      )}
    </div>
  )
}
