'use client'
import { motion } from 'framer-motion'

const ALL_SHAPES = [
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '30% 60% 70% 40% / 50% 60% 30% 60%',
  '50% 60% 30% 70% / 40% 30% 60% 70%',
  '30% 40% 60% 50% / 60% 70% 30% 40%',
]

function buildKeyframes(offset) {
  const n = ALL_SHAPES.length
  const shifted = [...ALL_SHAPES.slice(offset % n), ...ALL_SHAPES.slice(0, offset % n)]
  return [...shifted, shifted[0]]
}

export default function GhostNode({ label, phaseOffset = 0 }) {
  const keyframes = buildKeyframes(phaseOffset)
  const glowDelay = phaseOffset * 0.4

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.65 }}
      transition={{ duration: 0.8, delay: 0.8 + phaseOffset * 0.12 }}
      style={{
        width: 'clamp(110px, 11vw, 160px)',
        height: 'clamp(110px, 11vw, 160px)',
        cursor: 'default',
        pointerEvents: 'none',
        position: 'relative',
      }}
    >
      {/* Electric ambient halo — warm red/amber to match spark color */}
      <motion.div
        animate={{ opacity: [0.25, 0.6, 0.25], scale: [1, 1.2, 1] }}
        transition={{
          duration: 2.8 + phaseOffset * 0.35,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: glowDelay,
        }}
        style={{
          position: 'absolute',
          inset: '-14px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(220,38,38,0.18) 0%, rgba(251,191,36,0.08) 50%, transparent 72%)',
          filter: 'blur(12px)',
          pointerEvents: 'none',
        }}
      />

      {/* Morphing node body */}
      <motion.div
        animate={{ borderRadius: keyframes }}
        transition={{
          duration: 16,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        }}
        className="w-full h-full flex items-center justify-center"
        style={{
          border: '1px solid rgba(245, 158, 11, 0.3)',
          background: 'rgba(5, 5, 8, 0.65)',
          borderRadius: keyframes[0],
          boxShadow: '0 0 18px rgba(220,38,38,0.1), inset 0 0 12px rgba(251,191,36,0.04)',
        }}
      >
        <span className="text-[10px] font-medium text-zinc-500 tracking-wide uppercase select-none">
          {label}
        </span>
      </motion.div>
    </motion.div>
  )
}
