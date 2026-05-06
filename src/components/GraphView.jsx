'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import HeroNode from './graph/HeroNode'
import GhostNode from './graph/GhostNode'
import AboutNode from './graph/AboutNode'
import LightningCanvas from './graph/LightningCanvas'
import ViewSwitcher from './graph/ViewSwitcher'
import OrbTransition from './graph/OrbTransition'
import GraphNavbar from './graph/GraphNavbar'
import { useOrbNavigation } from './graph/useOrbNavigation'

// Each layout defines the center node, surrounding ghost positions, and edges.
// The center is always rendered at (50vw, 50vh). When switching layouts the
// graph transform is instantly zeroed — the node was already centered by the
// orb, so no visual jump occurs.
const LAYOUTS = {
  hero: {
    CenterComp: HeroNode,
    nodes: {
      hero:       { x: 50, y: 50 },
      about:      { x: 80, y: 20 },
      experience: { x: 95, y: 90 },
    },
    ghosts: [
      { key: 'about',      label: 'About',      phase: 0, x: '80vw',  y: '20vh' },
      { key: 'experience', label: 'Experience', phase: 1, x: '95vw',  y: '90vh' },
    ],
    edges: [
      { id: 'center-about',      from: 'hero', to: 'about' },
      { id: 'center-experience', from: 'hero', to: 'experience' },
    ],
  },
  about: {
    CenterComp: AboutNode,
    nodes: {
      about:      { x: 50, y: 50 },
      hero:       { x: 20, y: 80 },
      experience: { x: 65, y: 120 },
    },
    ghosts: [
      { key: 'hero',       label: 'Hero',       phase: 0, x: '20vw', y: '80vh' },
      { key: 'experience', label: 'Experience', phase: 1, x: '65vw', y: '120vh' },
    ],
    edges: [
      { id: 'center-hero',       from: 'about', to: 'hero' },
      { id: 'center-experience', from: 'about', to: 'experience' },
    ],
  },
}

export default function GraphView({ onSwitchView }) {
  const lightningCanvasRef = useRef(null)
  const graphWrapperRef    = useRef(null)
  const completedRef       = useRef(false)
  const [layout, setLayout] = useState('hero')

  const { CenterComp, nodes, ghosts, edges } = LAYOUTS[layout]

  const {
    isOrbActive,
    activeNodeKey,
    frozenPath,
    arrived,
    triggerOrb,
    handleArrived,
    handleComplete,
  } = useOrbNavigation()

  useEffect(() => {
    const html = document.documentElement
    const had  = html.classList.contains('dark')
    html.classList.add('dark')
    return () => { if (!had) html.classList.remove('dark') }
  }, [])

  // When the layout switches the new center is at (50vw, 50vh), which is already
  // screen-center thanks to the orb mechanics — instantly zero the transform so
  // OrbTransition's 0.6 s ease-out doesn't slide the node away from center.
  useEffect(() => {
    if (graphWrapperRef.current) {
      graphWrapperRef.current.style.transition = 'none'
      graphWrapperRef.current.style.transform  = 'translate(0, 0)'
    }
  }, [layout])

  // When the orb arrives, switch layouts immediately without bouncing the ghost open.
  useEffect(() => {
    if (arrived && activeNodeKey && !completedRef.current) {
      onBounceComplete()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrived, activeNodeKey])

  function handleNodeClick(nodeKey) {
    if (isOrbActive) return
    completedRef.current = false
    const edgeId = `center-${nodeKey}`
    const pts = lightningCanvasRef.current?.freeze(edgeId)
    if (!pts || pts.length < 2) return
    triggerOrb(nodeKey, nodeKey, pts)
  }

  function onBounceComplete() {
    if (completedRef.current) return
    completedRef.current = true
    const releasedKey = handleComplete()
    lightningCanvasRef.current?.release(`center-${releasedKey}`)
    if (LAYOUTS[releasedKey]) {
      setLayout(releasedKey)
    } else {
      onSwitchView('scroll')
    }
  }

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

      {/* Graph wrapper — canvas + nodes move together for viewport follow */}
      <div ref={graphWrapperRef} style={{ transition: 'transform 0.6s ease-out' }}>
        <LightningCanvas ref={lightningCanvasRef} nodes={nodes} edges={edges} />

        <div className="absolute inset-0 z-2">
          {/* Center node — always at 50vw / 50vh */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/4">
            <motion.div
              animate={{ scale: isOrbActive ? 0 : 1, opacity: isOrbActive ? 0 : 1 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <CenterComp />
            </motion.div>
          </div>

          {/* Ghost nodes — shrink when targeted, hidden until layout switches */}
          {ghosts.map((g) => {
            const isTarget = g.key === activeNodeKey
            return (
              <div
                key={g.key}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: g.x, top: g.y }}
              >
                <motion.div
                  animate={{ scale: isTarget ? 0 : 1 }}
                  transition={{ duration: 0.35, ease: 'easeIn' }}
                >
                  <GhostNode
                    label={g.label}
                    phaseOffset={g.phase}
                    onClick={() => handleNodeClick(g.key)}
                  />
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Orb travel overlay */}
      <OrbTransition
        active={isOrbActive}
        frozenPath={frozenPath}
        duration={1125}
        onArrived={handleArrived}
        graphWrapperRef={graphWrapperRef}
      />

      {/* ViewSwitcher — top-center */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30">
        <ViewSwitcher viewMode="graph" onSwitch={onSwitchView} />
      </div>

      {/* Navbar — ghost node connections + logo + copyright */}
      <GraphNavbar
        ghosts={ghosts}
        onNodeClick={handleNodeClick}
        disabled={isOrbActive}
      />
    </div>
  )
}
