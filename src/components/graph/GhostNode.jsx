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
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ opacity: 1, scale: 1.07, transition: { duration: 0.18, ease: 'easeOut' } }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative cursor-pointer w-[clamp(140px,15vw,210px)] h-[clamp(140px,15vw,210px)]"
    >
      {/* Electric ambient halo */}
      <motion.div
        animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.18, 1] }}
        transition={{
          duration: 2.8 + phaseOffset * 0.35,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: glowDelay,
        }}
        className="absolute -inset-4 rounded-full pointer-events-none blur-[14px] bg-[radial-gradient(ellipse,rgba(220,38,38,0.2)_0%,rgba(251,191,36,0.09)_50%,transparent_72%)]"
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
        className="group w-full h-full flex items-center justify-center border border-amber-500/40 hover:border-amber-600 bg-[#050508] [box-shadow:0_0_22px_rgba(220,38,38,0.12),inset_0_0_14px_rgba(251,191,36,0.05)]"
        style={{ borderRadius: keyframes[0] }}
      >
        <span className="text-[13px] font-medium group-hover:text-zinc-100 text-zinc-400 tracking-wide uppercase select-none transition-all">
          {label}
        </span>
      </motion.div>
    </motion.div>
  )
}
