'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projectsData, projectStatusConfig, projectSourceConfig } from '@/assets'

const BLOB_KEYFRAMES = [
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '30% 60% 70% 40% / 50% 60% 30% 60%',
  '50% 60% 30% 70% / 40% 30% 60% 70%',
  '30% 40% 60% 50% / 60% 70% 30% 40%',
  '60% 40% 30% 70% / 60% 30% 70% 40%',
]
const blobTransition = { duration: 20, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }

const ACCENT = '#8b5cf6'

const slideVariants = {
  enter:  (dir) => ({ x: dir > 0 ?  56 : -56, opacity: 0 }),
  center: {        x: 0,                        opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:   (dir) => ({ x: dir > 0 ? -56 :  56, opacity: 0, transition: { duration: 0.25, ease: [0.55, 0, 1, 0.45] } }),
}

const projects = projectsData.filter(p => p.domain === 'Mobile')

export default function MobileDevProjectsNode() {
  const [index,     setIndex]     = useState(0)
  const [direction, setDirection] = useState(1)

  const project   = projects[index]
  const statusCfg = projectStatusConfig[project.status]
  const sourceCfg = projectSourceConfig[project.source]

  function go(dir) {
    const next = index + dir
    if (next < 0 || next >= projects.length) return
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
      <motion.div
        animate={{ borderRadius: BLOB_KEYFRAMES }}
        transition={blobTransition}
        className="w-full h-full bg-linear-to-br from-violet-500 via-purple-500 to-violet-500 p-0.5"
        style={{ borderRadius: BLOB_KEYFRAMES[0] }}
      >
        <motion.div
          animate={{ borderRadius: BLOB_KEYFRAMES }}
          transition={blobTransition}
          className="w-full h-full flex flex-col items-center justify-center overflow-hidden bg-zinc-950"
          style={{ borderRadius: BLOB_KEYFRAMES[0] }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-10 pt-5 pb-2 w-full shrink-0">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-violet-400">Mobile Projects</p>
            <div className="flex-1 h-px bg-zinc-800/60" />
            <span className="text-[10px] text-zinc-500">{index + 1} / {projects.length}</span>
          </div>

          {/* Slide area */}
          <div className="h-65 flex overflow-hidden w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full flex flex-col px-10 py-2 gap-2"
              >
                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                    style={{ background: statusCfg.bg, color: statusCfg.color, borderColor: `${statusCfg.color}30` }}
                  >
                    {statusCfg.label}
                  </span>
                  <span
                    className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800/60 border border-zinc-700/40"
                    style={{ color: sourceCfg.color }}
                  >
                    {sourceCfg.label}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <div className="w-10 h-0.5 mb-1.5 rounded-full" style={{ background: `linear-gradient(to right, ${ACCENT}, transparent)` }} />
                  <h3 className="text-sm font-bold text-white leading-snug">{project.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{project.summary}</p>
                </div>

                {/* Highlights */}
                <div className="relative flex flex-col">
                  <div className="absolute left-2.25 inset-y-0 w-px" style={{ background: `linear-gradient(to bottom, ${ACCENT}55, ${ACCENT}08)` }} />
                  {project.highlights.map((item, j) => (
                    <motion.div
                      key={`${index}-${j}`}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.18 + j * 0.09, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="relative flex items-start gap-3 pb-2 last:pb-0"
                    >
                      <div
                        className="relative z-10 flex items-center justify-center w-4.5 h-4.5 rounded-full shrink-0 text-xs font-bold mt-0.5"
                        style={{
                          background: `${ACCENT}14`,
                          border: `1.5px solid ${ACCENT}`,
                          color: ACCENT,
                          boxShadow: `0 0 0 3px ${ACCENT}12, 0 0 10px ${ACCENT}38`,
                        }}
                      >
                        {j + 1}
                      </div>
                      <p className="text-xs text-zinc-300 leading-snug">{item}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-zinc-800/60 border border-zinc-700/40 text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-8 py-3.5 shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); go(-1) }}
              disabled={index === 0}
              className="w-9 h-9 flex items-center justify-center text-4xl transition-colors disabled:opacity-20 -translate-y-1 cursor-pointer"
              style={{ color: index > 0 ? ACCENT : undefined }}
            >‹</button>

            <div className="flex items-center gap-1.5">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); jumpTo(i) }}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i === index ? 18 : 6, height: 6, background: i === index ? ACCENT : '#3f3f46' }}
                />
              ))}
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); go(1) }}
              disabled={index === projects.length - 1}
              className="w-9 h-9 flex items-center justify-center text-4xl transition-colors disabled:opacity-20 -translate-y-1 cursor-pointer"
              style={{ color: index < projects.length - 1 ? ACCENT : undefined }}
            >›</button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
