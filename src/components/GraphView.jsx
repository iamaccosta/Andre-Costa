'use client'
import { useEffect } from 'react'
import HeroNode from './graph/HeroNode'
import GhostNode from './graph/GhostNode'
import LightningCanvas from './graph/LightningCanvas'
import ViewSwitcher from './graph/ViewSwitcher'

// All positions as percentages (0–100) of viewport
const NODES = {
  hero:       { x: 50, y: 50 },
  about:      { x: 27, y: 15 },
  experience: { x: 73, y: 15 },
  projects:   { x: 88, y: 54 },
  services:   { x: 73, y: 85 },
  contact:    { x: 27, y: 85 },
}

const GHOSTS = [
  { key: 'about',      label: 'About',      phase: 0 },
  { key: 'experience', label: 'Experience', phase: 1 },
  { key: 'projects',   label: 'Projects',   phase: 2 },
  { key: 'services',   label: 'Services',   phase: 3 },
  { key: 'contact',    label: 'Contact',    phase: 4 },
]

export default function GraphView({ onSwitchView }) {
  // Force dark class on <html> while graph view is active
  useEffect(() => {
    const html = document.documentElement
    const had  = html.classList.contains('dark')
    html.classList.add('dark')
    return () => { if (!had) html.classList.remove('dark') }
  }, [])

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: '#050508', zIndex: 60, touchAction: 'none' }}
    >
      {/* Ambient glow + dot grid */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full blur-3xl"
          style={{ background: 'rgba(245,158,11,0.07)' }}
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
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {/* Hero node — center */}
        <div
          className="absolute"
          style={{
            left: `${NODES.hero.x}%`,
            top:  `${NODES.hero.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <HeroNode />
        </div>

        {/* Ghost nodes */}
        {GHOSTS.map((g) => (
          <div
            key={g.key}
            className="absolute"
            style={{
              left: `${NODES[g.key].x}%`,
              top:  `${NODES[g.key].y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <GhostNode label={g.label} phaseOffset={g.phase} />
          </div>
        ))}
      </div>

      {/* ViewSwitcher — top-center */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
        <ViewSwitcher viewMode="graph" onSwitch={onSwitchView} />
      </div>
    </div>
  )
}
