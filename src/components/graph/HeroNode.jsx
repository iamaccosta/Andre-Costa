'use client'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { heroRoles, heroIcons, aboutData } from '@/assets'

// Closed loop so the repeat is seamless (last === first)
const BLOB_KEYFRAMES = [
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '30% 60% 70% 40% / 50% 60% 30% 60%',
  '50% 60% 30% 70% / 40% 30% 60% 70%',
  '30% 40% 60% 50% / 60% 70% 30% 40%',
  '60% 40% 30% 70% / 60% 30% 70% 40%',
]

const blobTransition = {
  duration: 18,
  ease: 'easeInOut',
  repeat: Infinity,
  repeatType: 'loop',
}

export default function HeroNode() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const r = setInterval(() => setRoleIndex(i => (i + 1) % heroRoles.length), 2800)
    return () => clearInterval(r)
  }, [])

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.4 }}
      
      className="w-[clamp(520px,56vw,800px)] h-[clamp(400px,44vw,620px)]"
    >
      {/* Gradient border wrapper — morphs continuously */}
      <motion.div
        animate={{ borderRadius: BLOB_KEYFRAMES }}
        transition={blobTransition}
        className="w-full h-full bg-linear-to-br from-amber-500 via-red-500 to-amber-500 p-0.5"
        style={{ borderRadius: BLOB_KEYFRAMES[0] }}
      >
        <motion.div
          animate={{ borderRadius: BLOB_KEYFRAMES }}
          transition={blobTransition}
          className="w-full h-full flex flex-row overflow-hidden bg-zinc-950"
          style={{ borderRadius: BLOB_KEYFRAMES[0] }}
        >
          {/* Photo — left panel, fills full height */}
          <div className="relative h-full w-[45%] shrink-0 overflow-hidden">
            <Image
              src="/me/image-4.JPG"
              alt="André C. Costa"
              fill
              className="object-cover object-top"
            />
            {/* Fade image edge into background */}
            <div className="absolute inset-y-0 right-0 w-10 bg-linear-to-r from-transparent to-zinc-950" />
          </div>

          {/* Content — right panel */}
          <div className="flex flex-col items-center justify-center gap-2.5 flex-1 px-5 py-5 min-w-0">
            {/* Available badge */}
            <span className="inline-flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-800/60 text-emerald-400 text-sm font-semibold px-2.5 py-1 rounded-full tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              Available for New Projects
            </span>

            {/* Name */}
            <h2 className="text-white font-extrabold text-4xl leading-tight tracking-tight text-center">
              André C. Costa
            </h2>

            {/* Animated role */}
            <div className="h-6 overflow-hidden w-full">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0,   opacity: 1 }}
                  exit={{    y: -14, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-base font-semibold tracking-widest uppercase text-amber-500 text-center truncate"
                >
                  {heroRoles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="w-16 h-px bg-amber-500/20 shrink-0" />

            {/* Stats */}
            <div className="flex items-start gap-5">
              {aboutData.slice(0, 3).map((stat) => (
                <div key={stat.title} className="flex flex-col items-center gap-0.5">
                  <span className="text-2xl font-bold text-white leading-none">
                    {stat.amount}<span className="text-amber-500">+</span>
                  </span>
                  <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide text-center leading-tight max-w-14">
                    {stat.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-5 mt-2.5">
              {heroIcons.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-700 text-zinc-500 hover:border-amber-500/50 hover:text-amber-500 transition-all duration-200 text-sm"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
