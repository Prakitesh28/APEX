"use client"

import { useMagnet } from "@/hooks/useMagnet"

interface Props {
  children: React.ReactNode
  className?: string
}

export default function MagneticWrapper({ children, className = "" }: Props) {
  const { elRef, innerRef, handleMouseMove, handleMouseLeave } = useMagnet()

  return (
    <div
      ref={elRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-hoverable
    >
      <div ref={innerRef}>{children}</div>
    </div>
  )
}
