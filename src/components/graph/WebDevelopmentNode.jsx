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

const ACCENT = '#3b82f6'

const HIGHLIGHTS = [
  { icon: '⚛️', title: 'Modern Frontends',  desc: 'React and Next.js applications with clean architecture and animations' },
  { icon: '🔌', title: 'APIs & Backends',   desc: 'RESTful services with Node.js, Spring Boot, and scalable data layers' },
  { icon: '🎨', title: 'UI Implementation', desc: 'Pixel-precise, responsive interfaces with Tailwind CSS and Framer Motion' },
]

const TECH_TAGS = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Framer Motion', 'REST APIs']

export default function WebDevelopmentNode() {
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
        className="w-full h-full bg-linear-to-br from-blue-500 via-cyan-500 to-blue-500 p-0.5"
        style={{ borderRadius: BLOB_KEYFRAMES[0] }}
      >
        <motion.div
          animate={{ borderRadius: BLOB_KEYFRAMES }}
          transition={blobTransition}
          className="w-full h-full flex flex-col justify-center overflow-hidden bg-zinc-950 px-12 py-8 gap-5"
          style={{ borderRadius: BLOB_KEYFRAMES[0] }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-blue-400">Full-Stack · Frontend · Backend</p>
              <h2 className="text-white font-extrabold text-2xl leading-tight">Web Development</h2>
              <p className="text-zinc-400 text-sm mt-1">Building scalable, production-grade web applications</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 shrink-0">
              🌐 Web
            </span>
          </div>

          <div className="w-full h-px bg-zinc-800/60" />

          {/* Highlights */}
          <div className="flex flex-col gap-3">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3"
              >
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-base shrink-0"
                  style={{ background: `${ACCENT}14`, border: `1px solid ${ACCENT}25` }}
                >
                  {h.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{h.title}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {TECH_TAGS.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide px-2 py-1 rounded-full border border-zinc-700/60 text-zinc-300 bg-zinc-800/40"
              >
                <span className="w-1 h-1 rounded-full shrink-0 bg-linear-to-br from-blue-400 to-cyan-500" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
