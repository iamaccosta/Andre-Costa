'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroNode from './graph/HeroNode'
import GhostNode from './graph/GhostNode'
import LightningCanvas from './graph/LightningCanvas'
import ViewSwitcher from './graph/ViewSwitcher'

// All positions as percentages (0–100) of viewport
const NODES = {
  hero:       { x: 50, y: 50 },
  about:      { x: 80, y: 20 },
  experience: { x: 80, y: 72 },
}

const GHOSTS = [
  { key: 'about',      label: 'About',      phase: 0 },
  { key: 'experience', label: 'Experience', phase: 1 },
]

export default function GraphView({ onSwitchView }) {
  const [activePopup, setActivePopup] = useState(null)

  // Force dark class on <html> while graph view is active
  useEffect(() => {
    const html = document.documentElement
    const had  = html.classList.contains('dark')
    html.classList.add('dark')
    return () => { if (!had) html.classList.remove('dark') }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#050508] z-60 touch-none">
      {/* Ambient glow + dot grid */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full blur-3xl bg-amber-500/[0.07]"
        />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: 'radial-gradient(circle, #78716c 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* Canvas lightning layer — sits behind nodes */}
      <LightningCanvas nodes={NODES} />

      {/* Node layer */}
      <div className="absolute inset-0 z-2">
        {/* Hero node — center */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${NODES.hero.x}%`, top: `${NODES.hero.y}%` }}
        >
          <HeroNode />
        </div>

        {/* Ghost nodes */}
        {GHOSTS.map((g) => (
          <div
            key={g.key}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${NODES[g.key].x}%`, top: `${NODES[g.key].y}%` }}
          >
            <GhostNode
              label={g.label}
              phaseOffset={g.phase}
              onClick={g.key === 'about' ? () => setActivePopup('about') : undefined}
            />
          </div>
        ))}
      </div>

      {/* Test popup */}
      <AnimatePresence>
        {activePopup && (
          <motion.div
            key="popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-20 flex items-center justify-center"
            onClick={() => setActivePopup(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0c0c12] border border-amber-500/30 rounded-2xl px-10 py-7 text-center [box-shadow:0_0_40px_rgba(251,191,36,0.08)]"
            >
              <p className="text-2xl font-bold text-white tracking-tight">About!</p>
              <p className="text-xs text-zinc-500 mt-1">click outside to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ViewSwitcher — top-center */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30">
        <ViewSwitcher viewMode="graph" onSwitch={onSwitchView} />
      </div>
    </div>
  )
}
