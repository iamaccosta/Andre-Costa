'use client'
import { motion } from 'framer-motion'

// ─── Animated rotating-gradient photo frame ───────────────────────────────────
// Usage:
//   <PhotoFrame width="w-64" height="h-64">
//     <Image src="..." alt="..." fill className="object-cover object-top" />
//   </PhotoFrame>
//
// The frame consists of:
//   1. A conic-gradient div (scale-150 so it always fills the parent)
//      that rotates continuously — this creates the moving gradient border.
//   2. An inner rounded container that clips the photo.
//   3. A diffuse outer glow that shifts hue slowly.
//   4. Four corner dots that pulse at staggered intervals.

const CORNERS = [
    { top:    '-6px', left:  '-6px' },
    { top:    '-6px', right: '-6px' },
    { bottom: '-6px', left:  '-6px' },
    { bottom: '-6px', right: '-6px' },
]

const PhotoFrame = ({ children, width = 'w-64', height = 'h-64', rounded = 'rounded-3xl' }) => (
    <div className="relative" style={{ isolation: 'isolate' }}>

        {/* ── Outer glow (rotates + slowly shifts) ─────────────────────── */}
        <motion.div
            className={`absolute -inset-1 ${rounded} blur-2xl opacity-25 dark:opacity-35 pointer-events-none`}
            style={{ background: 'conic-gradient(from 0deg, #f59e0b, #ef4444, #818cf8, #38bdf8, #f59e0b)' }}
            animate={{ rotate: 360, filter: ['hue-rotate(0deg)', 'hue-rotate(40deg)', 'hue-rotate(0deg)'] }}
            transition={{
                rotate:  { duration: 10, repeat: Infinity, ease: 'linear' },
                filter:  { duration: 8,  repeat: Infinity, ease: 'easeInOut' },
            }}
        />

        {/* ── Border wrapper (2.5 px padding = border thickness) ────────── */}
        <div className={`relative p-[2.5px] ${rounded} overflow-hidden`}>

            {/* Rotating conic gradient — the visible "border" */}
            <motion.div
                className={`absolute inset-0 scale-150`}
                style={{ background: 'conic-gradient(from 0deg, #f59e0b 0%, #ef4444 25%, #818cf8 55%, #38bdf8 75%, #f59e0b 100%)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />

            {/* Inner photo container */}
            <div
                className={`relative ${width} ${height} ${rounded.replace('3xl', '[22px]')} overflow-hidden bg-zinc-100 dark:bg-zinc-800`}
                style={{ borderRadius: 'calc(var(--radius, 1.5rem) - 2.5px)' }}
            >
                {children}
            </div>
        </div>

        {/* ── Corner accent dots ────────────────────────────────────────── */}
        {CORNERS.map((pos, i) => (
            <motion.div
                key={i}
                className="absolute w-2.5 h-2.5 rounded-full pointer-events-none"
                style={{ ...pos, background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.55, ease: 'easeInOut' }}
            />
        ))}
    </div>
)

export default PhotoFrame
