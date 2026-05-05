'use client'
import { useRef, useEffect } from 'react'

const EDGE_DEFS = [
  { id: 'hero-about',          from: 'hero',       to: 'about' },
  { id: 'hero-experience',     from: 'hero',       to: 'experience' },
  { id: 'hero-projects',       from: 'hero',       to: 'projects' },
  { id: 'hero-services',       from: 'hero',       to: 'services' },
  { id: 'hero-contact',        from: 'hero',       to: 'contact' },
  { id: 'about-experience',    from: 'about',      to: 'experience' },
  { id: 'experience-projects', from: 'experience', to: 'projects' },
  { id: 'projects-services',   from: 'projects',   to: 'services' },
  { id: 'services-contact',    from: 'services',   to: 'contact' },
  { id: 'contact-about',       from: 'contact',    to: 'about' },
]

// Recursive midpoint displacement — returns array of [x, y] points
function displace(x1, y1, x2, y2, roughness, depth) {
  if (depth === 0) return [[x1, y1], [x2, y2]]
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.hypot(dx, dy)
  if (len < 1) return [[x1, y1], [x2, y2]]
  const nx = -dy / len, ny = dx / len
  const offset = (Math.random() - 0.5) * len * roughness
  const pmx = mx + nx * offset, pmy = my + ny * offset
  const L = displace(x1, y1, pmx, pmy, roughness * 0.65, depth - 1)
  const R = displace(pmx, pmy, x2, y2, roughness * 0.65, depth - 1)
  return [...L.slice(0, -1), ...R]
}

function makeBolts(x1, y1, x2, y2) {
  const main = displace(x1, y1, x2, y2, 0.38, 5)
  const totalLen = Math.hypot(x2 - x1, y2 - y1)
  const branches = []
  const count = 2 + Math.floor(Math.random() * 2)
  const lo = Math.floor(main.length * 0.2)
  const hi = Math.floor(main.length * 0.78)

  for (let i = 0; i < count; i++) {
    const idx = lo + Math.floor(Math.random() * Math.max(1, hi - lo - 1))
    const [bx, by]   = main[idx]
    const [bx2, by2] = main[Math.min(idx + 1, main.length - 1)]
    const mainAng = Math.atan2(by2 - by, bx2 - bx)
    const diverge = (Math.random() > 0.5 ? 1 : -1) * (0.4 + Math.random() * 0.9)
    const bLen = totalLen * (0.12 + Math.random() * 0.2)
    branches.push(
      displace(bx, by, bx + Math.cos(mainAng + diverge) * bLen, by + Math.sin(mainAng + diverge) * bLen, 0.45, 3)
    )
  }

  return { main, branches }
}

function tracePath(ctx, pts) {
  if (pts.length < 2) return
  ctx.beginPath()
  ctx.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
}

function drawEdge(ctx, { main, branches }) {
  ctx.save()
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  // Outer orange glow halo
  ctx.shadowColor = 'rgba(255, 110, 20, 0.7)'
  ctx.shadowBlur = 14
  ctx.strokeStyle = 'rgba(255, 100, 20, 0.3)'
  ctx.lineWidth = 4
  tracePath(ctx, main)
  ctx.stroke()

  // Gold core
  ctx.shadowColor = 'rgba(255, 230, 80, 0.9)'
  ctx.shadowBlur = 5
  ctx.strokeStyle = 'rgba(255, 200, 80, 0.9)'
  ctx.lineWidth = 1.5
  tracePath(ctx, main)
  ctx.stroke()

  // Branches — no shadow, thin
  ctx.shadowBlur = 0
  ctx.globalAlpha = 0.38
  ctx.strokeStyle = 'rgba(255, 185, 60, 1)'
  ctx.lineWidth = 0.9
  for (const b of branches) {
    tracePath(ctx, b)
    ctx.stroke()
  }

  ctx.restore()
}

// Regen interval: 80–120ms baseline scaled up by 1/0.8 → 100–150ms
function nextInterval() {
  return 100 + Math.random() * 50
}

export default function LightningCanvas({ nodes }) {
  const canvasRef = useRef(null)
  const nodesRef  = useRef(nodes)  // nodes is a stable constant — no update needed
  const stRef     = useRef(null)   // initialized inside the effect below

  useEffect(() => {
    const st = { bolts: {}, lastRegen: {}, nextRegen: {}, forceRegen: false }
    for (const { id } of EDGE_DEFS) {
      st.lastRegen[id] = 0
      st.nextRegen[id] = nextInterval()
    }
    stRef.current = st

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      stRef.current.forceRegen = true
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(document.documentElement)

    function px(key) {
      const n = nodesRef.current[key]
      return [n.x * canvas.width / 100, n.y * canvas.height / 100]
    }

    let rafId
    function frame(now) {
      const st = stRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const { id, from, to } of EDGE_DEFS) {
        if (!st.bolts[id] || st.forceRegen || now - st.lastRegen[id] > st.nextRegen[id]) {
          const [x1, y1] = px(from)
          const [x2, y2] = px(to)
          st.bolts[id] = makeBolts(x1, y1, x2, y2)
          st.lastRegen[id] = now
          st.nextRegen[id] = nextInterval()
        }

        drawEdge(ctx, st.bolts[id])
      }

      st.forceRegen = false
      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}
    />
  )
}
