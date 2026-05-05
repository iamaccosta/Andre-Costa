'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { aboutText, aboutData, aboutHighlights, downloadIcon } from '@/assets'

const BLOB_KEYFRAMES = [
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '30% 60% 70% 40% / 50% 60% 30% 60%',
  '50% 60% 30% 70% / 40% 30% 60% 70%',
  '30% 40% 60% 50% / 60% 70% 30% 40%',
  '60% 40% 30% 70% / 60% 30% 70% 40%',
]

const blobTransition = {
  duration: 20,
  ease: 'easeInOut',
  repeat: Infinity,
  repeatType: 'loop',
}

export default function AboutNode() {
  const [intro] = aboutText.split('\n\n')

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.3 }}
      className="w-[clamp(380px,42vw,600px)] h-[clamp(300px,32vw,480px)]"
    >
      {/* Gradient border — morphs continuously */}
      <motion.div
        animate={{ borderRadius: BLOB_KEYFRAMES }}
        transition={blobTransition}
        className="w-full h-full bg-linear-to-br from-amber-500 via-red-500 to-amber-500 p-0.5"
        style={{ borderRadius: BLOB_KEYFRAMES[0] }}
      >
        <motion.div
          animate={{ borderRadius: BLOB_KEYFRAMES }}
          transition={blobTransition}
          className="w-full h-full flex flex-col overflow-hidden bg-[#050508]"
          style={{ borderRadius: BLOB_KEYFRAMES[0] }}
        >
          {/* Photo strip + header */}
          <div className="relative h-28 shrink-0 overflow-hidden">
            <Image
              src="/me/image-2.JPG"
              alt="About André Costa"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050508]/60 to-[#050508]" />
            {/* Heading overlay */}
            <div className="absolute bottom-3 left-5 flex items-center gap-3">
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-amber-500">About Me</p>
                <h2 className="text-white font-extrabold text-lg leading-tight">André C. Costa</h2>
              </div>
              {/* Location badge */}
              <span className="ml-2 flex items-center gap-1 text-[10px] font-medium text-zinc-300 bg-zinc-800/80 border border-zinc-700/60 rounded-full px-2.5 py-1">
                📍 Porto, Portugal
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 rounded-full px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                INESC TEC
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-3 flex-1 px-5 py-3 min-h-0 overflow-hidden">
            {/* Bio */}
            <p className="text-[11px] leading-relaxed text-zinc-400 line-clamp-3">{intro}</p>

            {/* Expertise tags */}
            <div className="flex flex-wrap gap-1.5">
              {aboutHighlights.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[9px] font-semibold tracking-wide px-2 py-1 rounded-full border border-zinc-700/60 text-zinc-300 bg-zinc-800/40"
                >
                  <span className="w-1 h-1 rounded-full shrink-0 bg-gradient-to-br from-amber-400 to-red-500" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 mt-auto pt-1 border-t border-zinc-800/60">
              {aboutData.map((stat) => (
                <div key={stat.title} className="flex flex-col items-center gap-0.5">
                  <span className="text-base font-bold text-white leading-none">
                    {stat.amount}<span className="text-amber-500">+</span>
                  </span>
                  <span className="text-[8px] font-medium text-zinc-500 uppercase tracking-wide text-center leading-tight max-w-10">
                    {stat.title}
                  </span>
                </div>
              ))}

              {/* Download CV */}
              <a
                href="/cv.pdf"
                download
                onClick={(e) => e.stopPropagation()}
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-white rounded-lg transition-all duration-200 hover:opacity-90 shrink-0"
                style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' }}
              >
                Download CV
                <span className="text-xs">{downloadIcon}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
