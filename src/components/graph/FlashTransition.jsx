'use client'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

function boltPath(angle, len) {
  const r  = (angle * Math.PI) / 180
  const dx = Math.cos(r), dy = Math.sin(r)
  const nx = -dy,         ny = dx
  let d = 'M 0 0'
  for (let i = 1; i <= 5; i++) {
    const t  = i / 5
    const px = dx * len * t
    const py = dy * len * t
    const j  = i < 5 ? Math.sin(angle * i * 0.13 + i * 2.7) * len * 0.07 : 0
    d += ` L ${(px + nx * j).toFixed(1)} ${(py + ny * j).toFixed(1)}`
  }
  return d
}

export default function FlashTransition({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 650)
    return () => clearTimeout(t)
  }, [onComplete])

  const angles = Array.from({ length: 10 }, (_, i) => i * 36 + 9)

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9)_0%,rgba(245,158,11,0.5)_40%,transparent_72%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0] }}
        transition={{ duration: 0.42, times: [0, 0.25, 1] }}
      />
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="-500 -500 1000 1000"
      >
        <defs>
          <filter id="flashGlow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {angles.map((angle, i) => (
          <motion.path
            key={i}
            d={boltPath(angle, 680)}
            stroke={i % 2 === 0 ? '#f59e0b' : '#ffffff'}
            strokeWidth={i % 3 === 0 ? 2.5 : 1.5}
            fill="none"
            filter="url(#flashGlow)"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: 0 }}
            transition={{ duration: 0.52, delay: i * 0.025, ease: 'easeOut' }}
          />
        ))}
      </svg>
    </div>
  )
}
