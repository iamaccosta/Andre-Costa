'use client'
import { useRef, useEffect } from 'react'

function drawOrb(ctx, x, y) {
  const pulse = 0.7 + 0.3 * Math.sin(Date.now() * 0.02)
  const r = 18 * pulse
  const grd = ctx.createRadialGradient(x, y, 0, x, y, r)
  grd.addColorStop(0,   'rgba(255, 255, 200, 1.0)')
  grd.addColorStop(0.2, 'rgba(255, 200, 50,  0.9)')
  grd.addColorStop(0.6, 'rgba(255, 100, 10,  0.4)')
  grd.addColorStop(1,   'rgba(0,   0,   0,   0.0)')
  ctx.save()
  ctx.fillStyle = grd
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
  // Hard bright core
  ctx.fillStyle = 'rgba(255, 255, 220, 1)'
  ctx.beginPath()
  ctx.arc(x, y, 4, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

// pts is array of [x, y] tuples from LightningCanvas bolt.main
function getOrbPos(pts, t) {
  const total = pts.length - 1
  const idx   = Math.min(Math.floor(t * total), total - 1)
  const frac  = t * total - idx
  const [ax, ay] = pts[idx]
  const [bx, by] = pts[Math.min(idx + 1, total)]
  return { x: ax + (bx - ax) * frac, y: ay + (by - ay) * frac }
}

export default function OrbTransition({ active, frozenPath, duration = 900, onArrived, graphWrapperRef }) {
  const canvasRef = useRef(null)

  // Smooth return to origin when deactivated
  useEffect(() => {
    if (!active && graphWrapperRef?.current) {
      graphWrapperRef.current.style.transition = 'transform 0.6s ease-out'
      graphWrapperRef.current.style.transform  = 'translate(0, 0)'
    }
  }, [active, graphWrapperRef])

  useEffect(() => {
    if (!active || !frozenPath || frozenPath.length < 2) return

    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    const cx  = canvas.width  / 2
    const cy  = canvas.height / 2

    // Disable CSS transition so per-frame JS transform is instantaneous
    if (graphWrapperRef?.current) {
      graphWrapperRef.current.style.transition = 'none'
    }

    let rafId
    let didArrive = false
    const startTime = performance.now()

    function frame(timestamp) {
      const elapsed = timestamp - startTime
      const rawT    = Math.min(elapsed / duration, 1)
      const eased   = rawT < 0.5
        ? 2 * rawT * rawT
        : 1 - Math.pow(-2 * rawT + 2, 2) / 2

      const pos = getOrbPos(frozenPath, eased)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Orb is always drawn at screen center
      drawOrb(ctx, cx, cy)

      // Graph shifts so that pos.x/y maps exactly to screen center
      if (graphWrapperRef?.current) {
        graphWrapperRef.current.style.transform = `translate(${cx - pos.x}px, ${cy - pos.y}px)`
      }

      if (rawT >= 1 && !didArrive) {
        didArrive = true
        cancelAnimationFrame(rafId)
        onArrived?.()
        return
      }

      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, frozenPath])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}
    />
  )
}
