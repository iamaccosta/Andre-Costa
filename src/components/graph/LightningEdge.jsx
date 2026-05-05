'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Fixed segment count so paths can visually "jump" cleanly
const SEGS = 13

function makeBolt(x1, y1, x2, y2, jitter) {
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.hypot(dx, dy)
  if (len < 0.01) return `M ${x1} ${y1} L ${x2} ${y2}`
  const nx = -dy / len, ny = dx / len

  let d = `M ${x1.toFixed(2)} ${y1.toFixed(2)}`
  let sign = 1
  for (let i = 1; i < SEGS; i++) {
    const t = i / SEGS
    // Mostly alternating — keeps paths tidy; occasional same-side adds subtle organic drift
    sign = Math.random() > 0.3 ? -sign : sign
    const mag = (0.3 + Math.random() * 0.7) * len * jitter
    d += ` L ${(x1 + dx * t + nx * sign * mag).toFixed(2)} ${(y1 + dy * t + ny * sign * mag).toFixed(2)}`
  }
  return d + ` L ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

function generateStrands(x1, y1, x2, y2) {
  return {
    atmos:  makeBolt(x1, y1, x2, y2, 0.014),  // nearly straight — wide glow spine
    arc1:   makeBolt(x1, y1, x2, y2, 0.034),  // main strand
    arc2:   makeBolt(x1, y1, x2, y2, 0.040),  // second strand
    stray1: makeBolt(x1, y1, x2, y2, 0.052),  // thin stray filament
    stray2: makeBolt(x1, y1, x2, y2, 0.046),
    stray3: makeBolt(x1, y1, x2, y2, 0.055),
  }
}

export default function LightningEdge({ x1, y1, x2, y2, seed = 0 }) {
  const [s, setS] = useState(() => generateStrands(x1, y1, x2, y2))

  // Regenerate strands — interval longer than the CSS transition so morph completes before next jump
  useEffect(() => {
    const ms = 280 + (seed % 5) * 40
    const id = setInterval(() => setS(generateStrands(x1, y1, x2, y2)), ms)
    return () => clearInterval(id)
  }, [x1, y1, x2, y2, seed])

  const dur = 1.5 + (seed % 4) * 0.3   // different pulse speed per edge
  const del = seed * 0.28               // staggered pulse phase

  return (
    // Whole edge pulses: opacity dims to ~half then back to full
    <motion.g
      animate={{ opacity: [0.45, 1.0, 0.45] }}
      transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: del }}
    >
      {/* ── Layer 1: deep red atmospheric corona ─────────────────── */}
      <path d={s.atmos}  stroke="#7f1d1d" strokeWidth="7.0" fill="none" opacity="0.5"  filter="url(#edgeGlow)" style={{ transition: 'd 0.22s ease-in-out' }} />
      <path d={s.arc1}   stroke="#b91c1c" strokeWidth="4.5" fill="none" opacity="0.45" filter="url(#edgeGlow)" style={{ transition: 'd 0.22s ease-in-out' }} />

      {/* ── Layer 2: orange/amber mid transition ─────────────────── */}
      <path d={s.arc1}   stroke="#ea580c" strokeWidth="1.8" fill="none" opacity="0.75" filter="url(#edgeGlow)" style={{ transition: 'd 0.22s ease-in-out' }} />
      <path d={s.arc2}   stroke="#f97316" strokeWidth="1.2" fill="none" opacity="0.65" filter="url(#edgeGlow)" style={{ transition: 'd 0.22s ease-in-out' }} />

      {/* ── Layer 3: gold/white hot core ─────────────────────────── */}
      <path d={s.arc1}   stroke="#fbbf24" strokeWidth="0.45" fill="none" opacity="1.0" style={{ transition: 'd 0.22s ease-in-out' }} />
      <path d={s.arc2}   stroke="#fde68a" strokeWidth="0.30" fill="none" opacity="0.9" style={{ transition: 'd 0.22s ease-in-out' }} />

      {/* ── Layer 4: thin stray filaments ────────────────────────── */}
      <path d={s.stray1} stroke="#f87171" strokeWidth="0.20" fill="none" opacity="0.55" style={{ transition: 'd 0.22s ease-in-out' }} />
      <path d={s.stray2} stroke="#fcd34d" strokeWidth="0.16" fill="none" opacity="0.50" style={{ transition: 'd 0.22s ease-in-out' }} />
      <path d={s.stray3} stroke="#fed7aa" strokeWidth="0.14" fill="none" opacity="0.40" style={{ transition: 'd 0.22s ease-in-out' }} />
    </motion.g>
  )
}
