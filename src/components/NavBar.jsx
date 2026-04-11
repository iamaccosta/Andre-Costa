'use client'

import { motion } from 'framer-motion'
import { navbarData, copyRightIcon } from '@/assets'

const NavBar = ({ id }) => (
    <nav className="w-17.5 h-full fixed left-0 top-0 flex flex-col justify-between border-r border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-3 xl:py-10 py-6 z-50 transition-colors duration-300">

        {/* ── Logo ─────────────────────────────────────────────────── */}
        <a href="#home" className="flex flex-col items-center gap-1 group">
            <span
                className="text-3xl font-extrabold tracking-tight leading-none"
                style={{
                    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                A
            </span>
            <span className="block rotate-90 origin-center text-[9px] font-bold tracking-[0.18em] uppercase text-zinc-400 dark:text-zinc-600 group-hover:text-amber-500 dark:group-hover:text-amber-500 transition-colors duration-200">
                Costa
            </span>
        </a>

        {/* ── Nav items ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-1">
            {navbarData.map((item) => {
                const isActive = id === item.id
                return (
                    <a
                        key={item.id}
                        href={`/#${item.id}`}
                        className="relative flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all duration-200 group"
                    >
                        {/* Active background pill */}
                        {isActive && (
                            <motion.div
                                layoutId="nav-pill"
                                className="absolute inset-0 rounded-xl"
                                style={{
                                    background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(239,68,68,0.08))",
                                }}
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            />
                        )}

                        {/* Icon */}
                        <span className={[
                            "relative text-xl transition-all duration-200",
                            isActive
                                ? "text-amber-500 scale-110"
                                : "text-zinc-400 dark:text-zinc-500 group-hover:text-amber-500 group-hover:scale-110",
                        ].join(' ')}>
                            {item.icon}
                        </span>

                        {/* Label */}
                        <span className={[
                            "relative text-[8px] font-semibold tracking-wide text-center transition-all duration-200",
                            isActive
                                ? "text-amber-600 dark:text-amber-500 opacity-100"
                                : "text-zinc-400 dark:text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-amber-500",
                        ].join(' ')}>
                            {item.name}
                        </span>
                    </a>
                )
            })}
        </div>

        {/* ── Copyright ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-center">
            <span className="absolute left-1/2 w-max flex items-center gap-0.5 -rotate-90 origin-bottom-left text-[10px] tracking-widest text-zinc-300 dark:text-zinc-700 transition-colors duration-300">
                {copyRightIcon} 2019 – {new Date().getFullYear()}
            </span>
        </div>
    </nav>
)

export default NavBar
