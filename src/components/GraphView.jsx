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

// Overview: positions derived from world coordinates (hero = 0,0) mapped to vw/vh.
// Ghost nodes render at 0.55x scale so all 14 fit without overlapping.
const OVERVIEW_NODES = {
  hero:               { x: 50, y: 20 },
  about:              { x: 70, y: 20 },
  experience:         { x: 75, y: 55 },
  contact:            { x: 28, y: 12 },
  research:           { x: 17, y: 48 },
  researchProjects:   { x:  5, y: 72 },
  researchServices:   { x: 24, y: 72 },
  development:        { x: 48, y: 55 },
  webDevelopment:     { x: 34, y: 72 },
  mobileDevelopment:  { x: 63, y: 72 },
  webDevProjects:     { x: 22, y: 88 },
  webDevServices:     { x: 38, y: 88 },
  mobileDevProjects:  { x: 55, y: 88 },
  mobileDevServices:  { x: 72, y: 88 },
}

const OVERVIEW_GHOSTS = [
  { key: 'hero',               label: 'Hero',        phase: 0, x: `${OVERVIEW_NODES.hero.x}vw`,               y: `${OVERVIEW_NODES.hero.y}vh` },
  { key: 'about',              label: 'About',        phase: 1, x: `${OVERVIEW_NODES.about.x}vw`,              y: `${OVERVIEW_NODES.about.y}vh` },
  { key: 'experience',         label: 'Experience',   phase: 2, x: `${OVERVIEW_NODES.experience.x}vw`,         y: `${OVERVIEW_NODES.experience.y}vh` },
  { key: 'contact',            label: 'Contact',      phase: 3, x: `${OVERVIEW_NODES.contact.x}vw`,            y: `${OVERVIEW_NODES.contact.y}vh` },
  { key: 'research',           label: 'Research',     phase: 0, x: `${OVERVIEW_NODES.research.x}vw`,           y: `${OVERVIEW_NODES.research.y}vh` },
  { key: 'researchProjects',   label: 'Res. Proj.',   phase: 1, x: `${OVERVIEW_NODES.researchProjects.x}vw`,   y: `${OVERVIEW_NODES.researchProjects.y}vh` },
  { key: 'researchServices',   label: 'Res. Svc.',    phase: 2, x: `${OVERVIEW_NODES.researchServices.x}vw`,   y: `${OVERVIEW_NODES.researchServices.y}vh` },
  { key: 'development',        label: 'Dev Hub',      phase: 3, x: `${OVERVIEW_NODES.development.x}vw`,        y: `${OVERVIEW_NODES.development.y}vh` },
  { key: 'webDevelopment',     label: 'Web Dev',      phase: 0, x: `${OVERVIEW_NODES.webDevelopment.x}vw`,     y: `${OVERVIEW_NODES.webDevelopment.y}vh` },
  { key: 'mobileDevelopment',  label: 'Mobile Dev',   phase: 1, x: `${OVERVIEW_NODES.mobileDevelopment.x}vw`,  y: `${OVERVIEW_NODES.mobileDevelopment.y}vh` },
  { key: 'webDevProjects',     label: 'Web Proj.',    phase: 2, x: `${OVERVIEW_NODES.webDevProjects.x}vw`,     y: `${OVERVIEW_NODES.webDevProjects.y}vh` },
  { key: 'webDevServices',     label: 'Web Svc.',     phase: 3, x: `${OVERVIEW_NODES.webDevServices.x}vw`,     y: `${OVERVIEW_NODES.webDevServices.y}vh` },
  { key: 'mobileDevProjects',  label: 'Mob. Proj.',   phase: 0, x: `${OVERVIEW_NODES.mobileDevProjects.x}vw`,  y: `${OVERVIEW_NODES.mobileDevProjects.y}vh` },
  { key: 'mobileDevServices',  label: 'Mob. Svc.',    phase: 1, x: `${OVERVIEW_NODES.mobileDevServices.x}vw`,  y: `${OVERVIEW_NODES.mobileDevServices.y}vh` },
]

const OVERVIEW_EDGES = [
  { id: 'ov-hero-about',               from: 'hero',              to: 'about' },
  { id: 'ov-hero-experience',          from: 'hero',              to: 'experience' },
  { id: 'ov-hero-contact',             from: 'hero',              to: 'contact' },
  { id: 'ov-hero-research',            from: 'hero',              to: 'research' },
  { id: 'ov-hero-development',         from: 'hero',              to: 'development' },
  { id: 'ov-about-experience',         from: 'about',             to: 'experience' },
  { id: 'ov-research-researchProj',    from: 'research',          to: 'researchProjects' },
  { id: 'ov-research-researchSvc',     from: 'research',          to: 'researchServices' },
  { id: 'ov-dev-webDev',               from: 'development',       to: 'webDevelopment' },
  { id: 'ov-dev-mobileDev',            from: 'development',       to: 'mobileDevelopment' },
  { id: 'ov-webDev-webDevProj',        from: 'webDevelopment',    to: 'webDevProjects' },
  { id: 'ov-webDev-webDevSvc',         from: 'webDevelopment',    to: 'webDevServices' },
  { id: 'ov-mobileDev-mobileDevProj',  from: 'mobileDevelopment', to: 'mobileDevProjects' },
  { id: 'ov-mobileDev-mobileDevSvc',   from: 'mobileDevelopment', to: 'mobileDevServices' },
]

function ZoomIcon({ isOverview }) {
  return isOverview ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="6" y1="1" x2="1" y2="6" /><polyline points="1,2 1,6 5,6" />
      <line x1="10" y1="1" x2="15" y2="6" /><polyline points="15,2 15,6 11,6" />
      <line x1="6" y1="15" x2="1" y2="10" /><polyline points="1,14 1,10 5,10" />
      <line x1="10" y1="15" x2="15" y2="10" /><polyline points="15,14 15,10 11,10" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="1" y1="6" x2="6" y2="1" /><polyline points="5,1 1,1 1,5" />
      <line x1="15" y1="6" x2="10" y2="1" /><polyline points="11,1 15,1 15,5" />
      <line x1="1" y1="10" x2="6" y2="15" /><polyline points="5,15 1,15 1,11" />
      <line x1="15" y1="10" x2="10" y2="15" /><polyline points="11,15 15,15 15,11" />
    </svg>
  )
}

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
      contact:     { x: 5, y: 10 },
      research:    { x:  5, y: 50 },
      development: { x: 40, y: 107 },
    },
    ghosts: [
      { key: 'about',       label: 'About',       phase: 0, x: '87vw', y: '13vh' },
      { key: 'experience',  label: 'Experience',  phase: 1, x: '95vw', y: '90vh' },
      { key: 'contact',     label: 'Contact',     phase: 2, x: '5vw',  y: '10vh' },
      { key: 'research',    label: 'Research',    phase: 3, x: '5vw',  y: '55vh' },
      { key: 'development', label: 'Development', phase: 4, x: '40vw', y: '107vh' },
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
      hero:    { x:  95, y: 90 },
    },
    ghosts: [
      { key: 'hero', label: 'Hero', phase: 0, x: '95vw', y: '90vh' },
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
      hero:             { x:  95, y: 50 },
      researchProjects: { x: 25, y: 80 },
      researchServices: { x: 75, y: 80 },
    },
    ghosts: [
      { key: 'hero',             label: 'Hero',     phase: 0, x: '95vw',  y: '50vh' },
      { key: 'researchProjects', label: 'Projects', phase: 1, x: '25vw', y: '80vh' },
      { key: 'researchServices', label: 'Services', phase: 2, x: '75vw', y: '80vh' },
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
      research:         { x:  75, y: 20 },
    },
    ghosts: [
      { key: 'research', label: 'Research', phase: 0, x: '75vw', y: '20vh' },
    ],
    edges: [
      { id: 'center-research', from: 'researchProjects', to: 'research' },
    ],
  },
  researchServices: {
    CenterComp: ResearchServicesNode,
    nodes: {
      researchServices: { x: 50, y: 50 },
      research:         { x:  25, y: 20 },
    },
    ghosts: [
      { key: 'research', label: 'Research', phase: 0, x: '25vw', y: '20vh' },
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
      hero:              { x: 60, y:  3 },
      webDevelopment:    { x: 25, y: 80 },
      mobileDevelopment: { x: 75, y: 80 },
    },
    ghosts: [
      { key: 'hero',              label: 'Hero',   phase: 0, x: '60vw', y: '-7vh'  },
      { key: 'webDevelopment',    label: 'Web',    phase: 1, x: '25vw', y: '80vh' },
      { key: 'mobileDevelopment', label: 'Mobile', phase: 2, x: '75vw', y: '80vh' },
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
      development:    { x:  75, y: 20 },
      webDevProjects: { x: 25, y: 80 },
      webDevServices: { x: 75, y: 80 },
    },
    ghosts: [
      { key: 'development',    label: 'Hub',      phase: 0, x: '75vw',  y: '20vh' },
      { key: 'webDevProjects', label: 'Projects', phase: 1, x: '25vw', y: '80vh' },
      { key: 'webDevServices', label: 'Services', phase: 2, x: '75vw', y: '80vh' },
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
      webDevelopment: { x:  75, y: 20 },
    },
    ghosts: [
      { key: 'webDevelopment', label: 'Web Dev', phase: 0, x: '75vw', y: '20vh' },
    ],
    edges: [
      { id: 'center-webDevelopment', from: 'webDevProjects', to: 'webDevelopment' },
    ],
  },
  webDevServices: {
    CenterComp: WebDevServicesNode,
    nodes: {
      webDevServices: { x: 50, y: 50 },
      webDevelopment: { x:  25, y: 20 },
    },
    ghosts: [
      { key: 'webDevelopment', label: 'Web Dev', phase: 0, x: '25vw', y: '20vh' },
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
      development:       { x:  25, y: 20 },
      mobileDevProjects: { x: 25, y: 80 },
      mobileDevServices: { x: 75, y: 80 },
    },
    ghosts: [
      { key: 'development',       label: 'Hub',      phase: 0, x: '25vw',  y: '20vh' },
      { key: 'mobileDevProjects', label: 'Projects', phase: 1, x: '25vw', y: '80vh' },
      { key: 'mobileDevServices', label: 'Services', phase: 2, x: '75vw', y: '80vh' },
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
      mobileDevelopment: { x:  75, y: 20 },
    },
    ghosts: [
      { key: 'mobileDevelopment', label: 'Mobile Dev', phase: 0, x: '75vw', y: '20vh' },
    ],
    edges: [
      { id: 'center-mobileDevelopment', from: 'mobileDevProjects', to: 'mobileDevelopment' },
    ],
  },
  mobileDevServices: {
    CenterComp: MobileDevServicesNode,
    nodes: {
      mobileDevServices: { x: 50, y: 50 },
      mobileDevelopment: { x:  25, y: 20 },
    },
    ghosts: [
      { key: 'mobileDevelopment', label: 'Mobile Dev', phase: 0, x: '25vw', y: '20vh' },
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
  const [layout, setLayout]       = useState('hero')
  const [isOverview, setIsOverview] = useState(false)
  const [zoomTarget, setZoomTarget] = useState(null)

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

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape' && !isOrbActive && !zoomTarget) {
        setIsOverview(v => !v)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOrbActive, zoomTarget])

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
    if (isOrbActive || isOverview) return
    completedRef.current = false
    const edgeId = `center-${nodeKey}`
    const pts = lightningCanvasRef.current?.freeze(edgeId)
    if (!pts || pts.length < 2) return
    triggerOrb(nodeKey, nodeKey, pts)
  }

  function handleOverviewNodeClick(nodeKey) {
    if (zoomTarget) return
    setZoomTarget(nodeKey)
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

      {/* Normal graph wrapper — hidden while overview is open */}
      {!isOverview && (
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
      )}

      {/* Overview mode — all nodes as scaled-down ghosts with full edge graph */}
      {isOverview && (
        <motion.div
          key="overview"
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{
            opacity: zoomTarget ? 0 : 1,
            scale:   zoomTarget ? 1.5 : 1,
          }}
          style={{
            transformOrigin: zoomTarget
              ? `${OVERVIEW_NODES[zoomTarget].x}% ${OVERVIEW_NODES[zoomTarget].y}%`
              : '50% 50%',
          }}
          transition={{ duration: 0.45, ease: 'easeIn' }}
          onAnimationComplete={() => {
            if (zoomTarget) {
              setIsOverview(false)
              setLayout(zoomTarget)
              setZoomTarget(null)
            }
          }}
        >
          <LightningCanvas nodes={OVERVIEW_NODES} edges={OVERVIEW_EDGES} />

          <div className="absolute inset-0 z-2">
            {OVERVIEW_GHOSTS.map((g) => (
              <div
                key={g.key}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: g.x, top: g.y }}
              >
                <motion.div
                  animate={{ scale: 0.55 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <GhostNode
                    label={g.label}
                    phaseOffset={g.phase}
                    onClick={() => handleOverviewNodeClick(g.key)}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Orb travel overlay — only active in normal mode */}
      {!isOverview && (
        <OrbTransition
          active={isOrbActive}
          frozenPath={frozenPath}
          duration={1125}
          onArrived={handleArrived}
          graphWrapperRef={graphWrapperRef}
        />
      )}

      {/* ViewSwitcher — top-center */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30">
        <ViewSwitcher viewMode="graph" onSwitch={onSwitchView} />
      </div>

      {/* Zoom-out / zoom-in toggle — top-right */}
      <div className="absolute top-5 right-5 z-30">
        <button
          onClick={() => { if (!isOrbActive && !zoomTarget) setIsOverview(v => !v) }}
          disabled={isOrbActive || !!zoomTarget}
          title={isOverview ? 'Zoom in' : 'Zoom out — see all nodes'}
          className="w-9 h-9 rounded-lg border border-amber-500/30 bg-black/60 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-500/60 transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-default"
        >
          <ZoomIcon isOverview={isOverview} />
        </button>
      </div>

      {/* Navbar — shows current-layout ghosts normally, all nodes in overview */}
      <GraphNavbar
        ghosts={ghosts}
        allGhosts={OVERVIEW_GHOSTS}
        isOverview={isOverview}
        onNodeClick={isOverview ? handleOverviewNodeClick : handleNodeClick}
        disabled={isOrbActive || !!zoomTarget}
      />
    </div>
  )
}
