'use client';

import { useRef, useState, useEffect } from 'react';

interface CounterProps {
  value: number
  suffix?: string
  duration?: number
}

export function Counter({ value, suffix = '', duration = 1.2 }: CounterProps) {
  const [display, setDisplay] = useState(0)
  const startTime = useRef<number | null>(null)
  const frameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    startTime.current = null
    const step = (now: number) => {
      if (startTime.current === null) startTime.current = now
      const elapsed = (now - startTime.current) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) frameRef.current = requestAnimationFrame(step)
    }
    frameRef.current = requestAnimationFrame(step)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [value, duration])

  return <>{display}{suffix}</>
}
