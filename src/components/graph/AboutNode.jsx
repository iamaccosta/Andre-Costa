'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { aboutData, aboutText, aboutHighlights, downloadIcon, fadeUp, stagger } from '@/assets'

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
  const [intro, stack, closing] = aboutText.split('\n\n');

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.3 }}
      className="w-[clamp(500px,54vw,760px)] h-[clamp(360px,40vw,560px)]"
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
          className="w-full h-full flex flex-row overflow-hidden bg-[#050508]"
          style={{ borderRadius: BLOB_KEYFRAMES[0] }}
        >
          {/* Photo — left panel, fills full height */}
          <div className="relative h-full w-[38%] shrink-0 overflow-hidden">
            <Image
              src="/me/image-2.JPG"
              alt="About André Costa"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-y-0 right-0 w-10 bg-linear-to-r from-transparent to-[#050508]" />
          </div>

          {/* Content — right panel */}
          <div className="flex flex-col justify-center gap-3 flex-1 px-5 py-5 min-w-0">
            {/* Header */}
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-amber-500">About Me</p>
              <h2 className="text-white font-extrabold text-2xl leading-tight">André C. Costa</h2>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-300 bg-zinc-800/80 border border-zinc-700/60 rounded-full px-2.5 py-0.5">
                📍 Porto, Portugal
              </span>
              
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-zinc-800/60 shrink-0" />

            {/* Bio */}
            <motion.p
              variants={fadeUp}
              className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium"
            >
              {intro}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              {[stack, closing].map((para, i) => (
                  <p key={i} className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {para}
                  </p>
              ))}
            </motion.div>

            {/* Expertise tags */}
            <div className="flex flex-wrap gap-1.5">
              {aboutHighlights.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide px-2 py-1 rounded-full border border-zinc-700/60 text-zinc-300 bg-zinc-800/40"
                >
                  <span className="w-1 h-1 rounded-full shrink-0 bg-gradient-to-br from-amber-400 to-red-500" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats + Download CV */}
            <div className="pt-2 border-t border-zinc-800/60 mt-auto">
              
              <a
                href="/cv.pdf"
                download
                onClick={(e) => e.stopPropagation()}
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-white rounded-lg transition-all duration-200 hover:opacity-90 shrink-0"
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
