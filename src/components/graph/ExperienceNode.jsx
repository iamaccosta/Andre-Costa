'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experienceData, experienceIcons } from '@/assets'

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

const theme = {
  education: {
    accent:    '#f59e0b',
    badgeBg:   'rgba(245,158,11,0.10)',
    badgeText: '#d97706',
    label:     'Education',
    icon:      experienceIcons.education,
  },
  work: {
    accent:    '#10b981',
    badgeBg:   'rgba(16,185,129,0.10)',
    badgeText: '#059669',
    label:     'Work',
    icon:      experienceIcons.work,
  },
}

const slideVariants = {
  enter:  (dir) => ({ x: dir > 0 ?  56 : -56, opacity: 0 }),
  center: {        x: 0,                        opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:   (dir) => ({ x: dir > 0 ? -56 :  56, opacity: 0, transition: { duration: 0.25, ease: [0.55, 0, 1, 0.45] } }),
}

export default function ExperienceNode() {
  const [index,      setIndex]      = useState(0)
  const [direction,  setDirection]  = useState(1)

  const entry = experienceData[index]
  const t     = theme[entry.work ? 'work' : 'education']

  function go(dir) {
    const next = index + dir
    if (next < 0 || next >= experienceData.length) return
    setDirection(dir)
    setIndex(next)
  }

  function jumpTo(i) {
    if (i === index) return
    setDirection(i > index ? 1 : -1)
    setIndex(i)
  }

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.3 }}
      className="w-[clamp(500px,54vw,760px)] h-[clamp(360px,40vw,560px)]"
    >
      {/* Blob border */}
      <motion.div
        animate={{ borderRadius: BLOB_KEYFRAMES }}
        transition={blobTransition}
        className="w-full h-full bg-linear-to-br from-amber-500 via-red-500 to-amber-500 p-0.5"
        style={{ borderRadius: BLOB_KEYFRAMES[0] }}
      >
        <motion.div
          animate={{ borderRadius: BLOB_KEYFRAMES }}
          transition={blobTransition}
          className="w-full h-full flex flex-col items-center justify-center overflow-hidden bg-zinc-950"
          style={{ borderRadius: BLOB_KEYFRAMES[0] }}
        >

          {/* ── Slide area ── */}
          <div className="h-65 flex overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full flex flex-col px-20 py-3 gap-2"
              >
                {/* Type badge + year bubble */}
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={{ background: t.badgeBg, color: t.badgeText }}
                  >
                    <span>{t.icon}</span>
                    {t.label}
                  </span>

                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full border-2 text-xs font-bold shrink-0"
                    style={{ borderColor: t.accent, color: t.accent }}
                  >
                    {String(entry.year) === 'Today'
                      ? <span className="text-sm uppercase tracking-widest">Now</span>
                      : entry.year
                    }
                  </div>
                </div>

                {/* Accent line + title */}
                <div>
                  <div
                    className="w-10 h-0.5 mb-2 rounded-full"
                    style={{ background: `linear-gradient(to right, ${t.accent}, transparent)` }}
                  />
                  <h3 className="text-md font-bold text-white leading-snug">
                    {entry.title}
                  </h3>
                </div>

                {/* Institution */}
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {entry.education}
                </p>

                {/* Timeline */}
                <div className="relative flex flex-col">
                  <div
                    className="absolute left-2.25 inset-y-0 w-px"
                    style={{ background: `linear-gradient(to bottom, ${t.accent}55, ${t.accent}08)` }}
                  />
                  {entry.experience.map((item, j) => (
                    <motion.div
                      key={`${index}-${j}`}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.18 + j * 0.09, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="relative flex items-start gap-3 pb-2.5 last:pb-0"
                    >
                      <div
                        className="relative z-10 flex items-center justify-center w-4.5 h-4.5 rounded-full shrink-0 text-xs font-bold mt-0.5"
                        style={{
                          background: `${t.accent}14`,
                          border: `1.5px solid ${t.accent}`,
                          color: t.accent,
                          boxShadow: `0 0 0 3px ${t.accent}12, 0 0 10px ${t.accent}38`,
                        }}
                      >
                        {j + 1}
                      </div>
                      <p className="text-sm text-zinc-100 leading-snug">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Footer: arrows + dots ── */}
          <div className="flex items-center justify-between px-8 py-3.5 shrink-0">

            <button
              onClick={(e) => { e.stopPropagation(); go(-1) }}
              disabled={index === 0}
              className="w-9 h-9 flex items-center justify-center text-4xl transition-colors disabled:opacity-20 -translate-y-1 cursor-pointer"
              style={{ color: index > 0 ? t.accent : undefined }}
            >
              ‹
            </button>

            <div className="flex items-center gap-1.5">
              {experienceData.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); jumpTo(i) }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:      i === index ? 18 : 6,
                    height:     6,
                    background: i === index ? t.accent : '#3f3f46',
                  }}
                />
              ))}
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); go(1) }}
              disabled={index === experienceData.length - 1}
              className="w-9 h-9 flex items-center justify-center text-4xl transition-colors disabled:opacity-20 -translate-y-1 cursor-pointer"
              style={{ color: index < experienceData.length - 1 ? t.accent : undefined }}
            >
              ›
            </button>

          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
