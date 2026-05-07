'use client'
import { motion } from 'framer-motion'

const BLOB_KEYFRAMES = [
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '30% 60% 70% 40% / 50% 60% 30% 60%',
  '50% 60% 30% 70% / 40% 30% 60% 70%',
  '30% 40% 60% 50% / 60% 70% 30% 40%',
  '60% 40% 30% 70% / 60% 30% 70% 40%',
]
const blobTransition = { duration: 20, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }

const BRANCHES = [
  {
    icon: '🌐',
    label: 'Web Development',
    subtitle: 'React · Next.js · Node.js · Tailwind CSS · Framer Motion',
    accent: '#3b82f6',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.20)',
  },
  {
    icon: '📱',
    label: 'Mobile Development',
    subtitle: 'Kotlin · Flutter · Android SDK',
    accent: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.20)',
  },
]

export default function DevelopmentHubNode() {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.3 }}
      className="w-[clamp(500px,54vw,760px)] h-[clamp(360px,40vw,560px)]"
    >
      <motion.div
        animate={{ borderRadius: BLOB_KEYFRAMES }}
        transition={blobTransition}
        className="w-full h-full bg-linear-to-br from-amber-500 via-red-500 to-amber-500 p-0.5"
        style={{ borderRadius: BLOB_KEYFRAMES[0] }}
      >
        <motion.div
          animate={{ borderRadius: BLOB_KEYFRAMES }}
          transition={blobTransition}
          className="w-full h-full flex flex-col items-center justify-center overflow-hidden bg-zinc-950 px-12 py-10 gap-8"
          style={{ borderRadius: BLOB_KEYFRAMES[0] }}
        >
          {/* Header */}
          <div className="text-center">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-amber-500">Explore Branches</p>
            <h2 className="text-white font-extrabold text-3xl leading-tight mt-1">Development</h2>
            <p className="text-zinc-400 text-sm mt-1.5">Navigate to a branch via the ghost nodes</p>
          </div>

          {/* Branch tiles */}
          <div className="flex gap-5 w-full">
            {BRANCHES.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex flex-col items-center gap-3 p-5 rounded-2xl border"
                style={{ background: b.bg, borderColor: b.border }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl text-2xl"
                  style={{ background: `${b.accent}15`, border: `1px solid ${b.accent}30` }}
                >
                  {b.icon}
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-white">{b.label}</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{b.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
