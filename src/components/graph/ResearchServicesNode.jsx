'use client'
import { motion } from 'framer-motion'
import { researchServicesData } from '@/assets'

const BLOB_KEYFRAMES = [
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '30% 60% 70% 40% / 50% 60% 30% 60%',
  '50% 60% 30% 70% / 40% 30% 60% 70%',
  '30% 40% 60% 50% / 60% 70% 30% 40%',
  '60% 40% 30% 70% / 60% 30% 70% 40%',
]
const blobTransition = { duration: 20, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }

const ACCENT = '#6366f1'

export default function ResearchServicesNode() {
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
        className="w-full h-full bg-linear-to-br from-indigo-500 via-purple-500 to-indigo-500 p-0.5"
        style={{ borderRadius: BLOB_KEYFRAMES[0] }}
      >
        <motion.div
          animate={{ borderRadius: BLOB_KEYFRAMES }}
          transition={blobTransition}
          className="w-full h-full flex flex-col justify-center overflow-hidden bg-zinc-950 px-12 py-8 gap-6"
          style={{ borderRadius: BLOB_KEYFRAMES[0] }}
        >
          {/* Header */}
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-indigo-400">What I Offer</p>
            <h2 className="text-white font-extrabold text-2xl leading-tight">Research Services</h2>
          </div>

          {/* Service cards */}
          <div className="flex flex-col gap-4">
            {researchServicesData.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/40"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-xl shrink-0"
                  style={{ background: `${ACCENT}14`, border: `1px solid ${ACCENT}25` }}
                >
                  {service.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-white">{service.title}</h3>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">{service.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {service.tech.map((t) => (
                      <span key={t} className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-zinc-800/60 border border-zinc-700/40 text-zinc-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
