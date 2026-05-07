'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import HeroNode from './graph/HeroNode'
import GhostNode from './graph/GhostNode'
import AboutNode from './graph/AboutNode'
import ExperienceNode from './graph/ExperienceNode'
import ContactNode from './graph/ContactNode'
import ResearchNode from './graph/ResearchNode'
import ResearchProjectsNode from './graph/ResearchProjectsNode'
import ResearchServicesNode from './graph/ResearchServicesNode'
import DevelopmentHubNode from './graph/DevelopmentHubNode'
import WebDevelopmentNode from './graph/WebDevelopmentNode'
import WebDevProjectsNode from './graph/WebDevProjectsNode'
import WebDevServicesNode from './graph/WebDevServicesNode'
import MobileDevelopmentNode from './graph/MobileDevelopmentNode'
import MobileDevProjectsNode from './graph/MobileDevProjectsNode'
import MobileDevServicesNode from './graph/MobileDevServicesNode'
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
      hero:        { x: 50, y: 50 },
      about:       { x: 87, y: 13 },
      experience:  { x: 95, y: 90 },
      contact:     { x: 13, y: 13 },
      research:    { x:  5, y: 55 },
      development: { x: 50, y: 92 },
    },
    ghosts: [
      { key: 'about',       label: 'About',       phase: 0, x: '87vw', y: '13vh' },
      { key: 'experience',  label: 'Experience',  phase: 1, x: '95vw', y: '90vh' },
      { key: 'contact',     label: 'Contact',     phase: 2, x: '13vw', y: '13vh' },
      { key: 'research',    label: 'Research',    phase: 3, x: '5vw',  y: '55vh' },
      { key: 'development', label: 'Development', phase: 4, x: '50vw', y: '92vh' },
    ],
    edges: [
      { id: 'center-about',       from: 'hero', to: 'about' },
      { id: 'center-experience',  from: 'hero', to: 'experience' },
      { id: 'center-contact',     from: 'hero', to: 'contact' },
      { id: 'center-research',    from: 'hero', to: 'research' },
      { id: 'center-development', from: 'hero', to: 'development' },
    ],
  },
  about: {
    CenterComp: AboutNode,
    nodes: {
      about:      { x: 50, y: 50 },
      hero:       { x: 15, y: 85 },
      experience: { x: 65, y: 120 },
    },
    ghosts: [
      { key: 'hero',       label: 'Hero',       phase: 0, x: '15vw', y: '85vh' },
      { key: 'experience', label: 'Experience', phase: 1, x: '65vw', y: '120vh' },
    ],
    edges: [
      { id: 'center-hero',       from: 'about', to: 'hero' },
      { id: 'center-experience', from: 'about', to: 'experience' },
    ],
  },
  experience: {
    CenterComp: ExperienceNode,
    nodes: {
      experience: { x: 50, y: 50 },
      hero:       { x:  5, y: 10 },
      about:      { x: 35, y: -20 },
    },
    ghosts: [
      { key: 'hero',  label: 'Hero',  phase: 0, x: '5vw',  y: '10vh' },
      { key: 'about', label: 'About', phase: 1, x: '35vw', y: '-20vh' },
    ],
    edges: [
      { id: 'center-hero',  from: 'experience', to: 'hero' },
      { id: 'center-about', from: 'experience', to: 'about' },
    ],
  },

  // ── Contact ────────────────────────────────────────────────────────────────
  contact: {
    CenterComp: ContactNode,
    nodes: {
      contact: { x: 50, y: 50 },
      hero:    { x:  8, y: 40 },
    },
    ghosts: [
      { key: 'hero', label: 'Hero', phase: 0, x: '8vw', y: '40vh' },
    ],
    edges: [
      { id: 'center-hero', from: 'contact', to: 'hero' },
    ],
  },

  // ── Research branch ────────────────────────────────────────────────────────
  research: {
    CenterComp: ResearchNode,
    nodes: {
      research:         { x: 50, y: 50 },
      hero:             { x:  8, y: 85 },
      researchProjects: { x: 90, y: 20 },
      researchServices: { x: 90, y: 80 },
    },
    ghosts: [
      { key: 'hero',             label: 'Hero',     phase: 0, x: '8vw',  y: '85vh' },
      { key: 'researchProjects', label: 'Projects', phase: 1, x: '90vw', y: '20vh' },
      { key: 'researchServices', label: 'Services', phase: 2, x: '90vw', y: '80vh' },
    ],
    edges: [
      { id: 'center-hero',             from: 'research', to: 'hero' },
      { id: 'center-researchProjects', from: 'research', to: 'researchProjects' },
      { id: 'center-researchServices', from: 'research', to: 'researchServices' },
    ],
  },
  researchProjects: {
    CenterComp: ResearchProjectsNode,
    nodes: {
      researchProjects: { x: 50, y: 50 },
      research:         { x:  8, y: 50 },
    },
    ghosts: [
      { key: 'research', label: 'Research', phase: 0, x: '8vw', y: '50vh' },
    ],
    edges: [
      { id: 'center-research', from: 'researchProjects', to: 'research' },
    ],
  },
  researchServices: {
    CenterComp: ResearchServicesNode,
    nodes: {
      researchServices: { x: 50, y: 50 },
      research:         { x:  8, y: 50 },
    },
    ghosts: [
      { key: 'research', label: 'Research', phase: 0, x: '8vw', y: '50vh' },
    ],
    edges: [
      { id: 'center-research', from: 'researchServices', to: 'research' },
    ],
  },

  // ── Development hub ────────────────────────────────────────────────────────
  development: {
    CenterComp: DevelopmentHubNode,
    nodes: {
      development:       { x: 50, y: 50 },
      hero:              { x: 50, y:  5 },
      webDevelopment:    { x: 15, y: 80 },
      mobileDevelopment: { x: 85, y: 80 },
    },
    ghosts: [
      { key: 'hero',              label: 'Hero',   phase: 0, x: '50vw', y: '5vh'  },
      { key: 'webDevelopment',    label: 'Web',    phase: 1, x: '15vw', y: '80vh' },
      { key: 'mobileDevelopment', label: 'Mobile', phase: 2, x: '85vw', y: '80vh' },
    ],
    edges: [
      { id: 'center-hero',              from: 'development', to: 'hero' },
      { id: 'center-webDevelopment',    from: 'development', to: 'webDevelopment' },
      { id: 'center-mobileDevelopment', from: 'development', to: 'mobileDevelopment' },
    ],
  },

  // ── Web branch ─────────────────────────────────────────────────────────────
  webDevelopment: {
    CenterComp: WebDevelopmentNode,
    nodes: {
      webDevelopment: { x: 50, y: 50 },
      development:    { x:  8, y: 50 },
      webDevProjects: { x: 90, y: 20 },
      webDevServices: { x: 90, y: 80 },
    },
    ghosts: [
      { key: 'development',    label: 'Hub',      phase: 0, x: '8vw',  y: '50vh' },
      { key: 'webDevProjects', label: 'Projects', phase: 1, x: '90vw', y: '20vh' },
      { key: 'webDevServices', label: 'Services', phase: 2, x: '90vw', y: '80vh' },
    ],
    edges: [
      { id: 'center-development',    from: 'webDevelopment', to: 'development' },
      { id: 'center-webDevProjects', from: 'webDevelopment', to: 'webDevProjects' },
      { id: 'center-webDevServices', from: 'webDevelopment', to: 'webDevServices' },
    ],
  },
  webDevProjects: {
    CenterComp: WebDevProjectsNode,
    nodes: {
      webDevProjects: { x: 50, y: 50 },
      webDevelopment: { x:  8, y: 50 },
    },
    ghosts: [
      { key: 'webDevelopment', label: 'Web Dev', phase: 0, x: '8vw', y: '50vh' },
    ],
    edges: [
      { id: 'center-webDevelopment', from: 'webDevProjects', to: 'webDevelopment' },
    ],
  },
  webDevServices: {
    CenterComp: WebDevServicesNode,
    nodes: {
      webDevServices: { x: 50, y: 50 },
      webDevelopment: { x:  8, y: 50 },
    },
    ghosts: [
      { key: 'webDevelopment', label: 'Web Dev', phase: 0, x: '8vw', y: '50vh' },
    ],
    edges: [
      { id: 'center-webDevelopment', from: 'webDevServices', to: 'webDevelopment' },
    ],
  },

  // ── Mobile branch ──────────────────────────────────────────────────────────
  mobileDevelopment: {
    CenterComp: MobileDevelopmentNode,
    nodes: {
      mobileDevelopment: { x: 50, y: 50 },
      development:       { x:  8, y: 50 },
      mobileDevProjects: { x: 90, y: 20 },
      mobileDevServices: { x: 90, y: 80 },
    },
    ghosts: [
      { key: 'development',       label: 'Hub',      phase: 0, x: '8vw',  y: '50vh' },
      { key: 'mobileDevProjects', label: 'Projects', phase: 1, x: '90vw', y: '20vh' },
      { key: 'mobileDevServices', label: 'Services', phase: 2, x: '90vw', y: '80vh' },
    ],
    edges: [
      { id: 'center-development',       from: 'mobileDevelopment', to: 'development' },
      { id: 'center-mobileDevProjects', from: 'mobileDevelopment', to: 'mobileDevProjects' },
      { id: 'center-mobileDevServices', from: 'mobileDevelopment', to: 'mobileDevServices' },
    ],
  },
  mobileDevProjects: {
    CenterComp: MobileDevProjectsNode,
    nodes: {
      mobileDevProjects: { x: 50, y: 50 },
      mobileDevelopment: { x:  8, y: 50 },
    },
    ghosts: [
      { key: 'mobileDevelopment', label: 'Mobile Dev', phase: 0, x: '8vw', y: '50vh' },
    ],
    edges: [
      { id: 'center-mobileDevelopment', from: 'mobileDevProjects', to: 'mobileDevelopment' },
    ],
  },
  mobileDevServices: {
    CenterComp: MobileDevServicesNode,
    nodes: {
      mobileDevServices: { x: 50, y: 50 },
      mobileDevelopment: { x:  8, y: 50 },
    },
    ghosts: [
      { key: 'mobileDevelopment', label: 'Mobile Dev', phase: 0, x: '8vw', y: '50vh' },
    ],
    edges: [
      { id: 'center-mobileDevelopment', from: 'mobileDevServices', to: 'mobileDevelopment' },
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
    <div className="fixed inset-0 overflow-hidden bg-zinc-900 z-60 touch-none">
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
