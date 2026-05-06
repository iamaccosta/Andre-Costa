'use client'
import { motion } from 'framer-motion'

const BLOB_KF = [
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '30% 60% 70% 40% / 50% 60% 30% 60%',
  '50% 60% 30% 70% / 40% 30% 60% 70%',
  '30% 40% 60% 50% / 60% 70% 30% 40%',
  '60% 40% 30% 70% / 60% 30% 70% 40%',
]

function buildKeyframes(offset) {
  const n = BLOB_KF.length - 1
  const shifted = [...BLOB_KF.slice(offset % n), ...BLOB_KF.slice(0, offset % n)]
  return [...shifted, shifted[0]]
}

function NavGhostButton({ label, phaseOffset = 0, onClick, disabled }) {
  const keyframes = buildKeyframes(phaseOffset)

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.07 }}
      whileTap={disabled ? {} : { scale: 0.94 }}
      onClick={disabled ? undefined : onClick}
      className="group relative cursor-pointer disabled:cursor-default"
      disabled={disabled}
    >
      <motion.div
        animate={{ opacity: [0.18, 0.45, 0.18], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: phaseOffset * 0.4 }}
        className="absolute -inset-2 rounded-full pointer-events-none blur-[10px] bg-[radial-gradient(ellipse,rgba(251,191,36,0.18)_0%,transparent_70%)]"
      />
      <motion.div
        animate={{ borderRadius: keyframes }}
        transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        className="relative flex items-center justify-center px-5 py-2 border border-amber-500/35 group-hover:border-amber-500/70 bg-[#050508] transition-colors duration-200 [box-shadow:0_0_16px_rgba(220,38,38,0.1)]"
        style={{ borderRadius: keyframes[0] }}
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-zinc-400 group-hover:text-zinc-100 transition-colors duration-200 select-none">
          {label}
        </span>
      </motion.div>
    </motion.button>
  )
}

export default function GraphNavbar({ ghosts, onNodeClick, disabled }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-5 px-5 py-3 border border-amber-500/20 bg-black/60 backdrop-blur-sm rounded-2xl"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 pr-5 border-r border-zinc-800/80">
        <div className="w-7 h-7 rounded-full border border-amber-500/50 flex items-center justify-center bg-amber-500/5">
          <span className="text-[11px] font-black text-amber-500 leading-none tracking-tighter">AC</span>
        </div>
      </div>

      {/* Ghost node buttons */}
      <div className="flex items-center gap-3">
        {ghosts.map((g) => (
          <NavGhostButton
            key={g.key}
            label={g.label}
            phaseOffset={g.phase}
            onClick={() => onNodeClick(g.key)}
            disabled={disabled}
          />
        ))}
      </div>

      {/* Copyright */}
      <div className="pl-5 border-l-2 border-zinc-600">
        <span className="text-xs text-zinc-500 font-medium whitespace-nowrap">© 2026 André C. Costa</span>
      </div>
    </motion.div>
  )
}
