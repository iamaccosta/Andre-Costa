'use client'
import { motion } from 'framer-motion'
import { servicesData } from '@/assets'

const BLOB_KEYFRAMES = [
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '30% 60% 70% 40% / 50% 60% 30% 60%',
  '50% 60% 30% 70% / 40% 30% 60% 70%',
  '30% 40% 60% 50% / 60% 70% 30% 40%',
  '60% 40% 30% 70% / 60% 30% 70% 40%',
]
const blobTransition = { duration: 20, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }

export default function WebDevServicesNode() {
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
          className="w-full h-full flex flex-col justify-center overflow-hidden bg-zinc-950 px-10 py-7 gap-4"
          style={{ borderRadius: BLOB_KEYFRAMES[0] }}
        >
          {/* Header */}
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-blue-400">What I Offer</p>
            <h2 className="text-white font-extrabold text-2xl leading-tight">Web Services</h2>
          </div>

          {/* 2×2 grid */}
          <div className="grid grid-cols-2 gap-3">
            {servicesData.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-2 p-3.5 rounded-xl border border-zinc-800/60 bg-zinc-900/40"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-sm shrink-0"
                    style={{ background: `${service.accent}14`, border: `1px solid ${service.accent}25`, color: service.accent }}
                  >
                    {service.icon}
                  </div>
                  <p className="text-xs font-bold text-white leading-tight">{service.title}</p>
                </div>
                <p className="text-[10px] text-zinc-400 leading-relaxed">{service.description}</p>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {service.tech.map((t) => (
                    <span key={t} className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-zinc-800/60 border border-zinc-700/40 text-zinc-500">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
