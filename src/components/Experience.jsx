'use client'

import { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import Heading from "./sub/Heading"
import { experienceData, experienceIcons } from "@/assets"

// ─── Per-entry styling: education = amber, work = emerald ─────────────────────

const theme = {
    education: {
        accent:      "#f59e0b",
        accentLight: "rgba(245,158,11,0.10)",
        border:      "rgba(245,158,11,0.25)",
        badgeBg:     "rgba(245,158,11,0.10)",
        badgeText:   "#d97706",
        label:       "Education",
        icon:        experienceIcons.education,
    },
    work: {
        accent:      "#10b981",
        accentLight: "rgba(16,185,129,0.10)",
        border:      "rgba(16,185,129,0.25)",
        badgeBg:     "rgba(16,185,129,0.10)",
        badgeText:   "#059669",
        label:       "Work",
        icon:        experienceIcons.work,
    },
}

// ─── Single card ──────────────────────────────────────────────────────────────

const TimelineCard = ({ data, index }) => {
    const isLeft = index % 2 === 0
    const t      = theme[data.work ? "work" : "education"]

    return (
        <div className="relative w-full flex items-start justify-center">

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -48 : 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`
                    relative group w-full lg:w-[calc(50%-3rem)]
                    ${isLeft ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"}
                `}
            >
                <div
                    className="relative rounded-2xl border bg-white dark:bg-zinc-900 p-6 shadow-sm transition-all duration-300 hover:shadow-lg overflow-hidden"
                    style={{ borderColor: t.border }}
                >
                    {/* Top gradient accent line */}
                    <div
                        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                        style={{ background: `linear-gradient(to right, ${t.accent}, transparent)` }}
                    />

                    {/* Card header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex-1">
                            {/* Type badge */}
                            <span
                                className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2"
                                style={{ background: t.badgeBg, color: t.badgeText }}
                            >
                                <span className="text-sm">{t.icon}</span>
                                {t.label}
                            </span>
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-snug">
                                {data.title}
                            </h3>
                        </div>

                        {/* Icon circle */}
                        <div
                            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                            style={{ background: t.accentLight, color: t.accent }}
                        >
                            {t.icon}
                        </div>
                    </div>

                    {/* Institution / description */}
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                        {data.education}
                    </p>

                    {/* Bullet highlights */}
                    <ul className="flex flex-col gap-2">
                        {data.experience.map((item, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                                <span
                                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                    style={{ background: t.accent }}
                                />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Connector line → center dot (desktop only) */}
                <div
                    className={`
                        hidden lg:block absolute top-9 w-8 border-t border-dashed
                        ${isLeft
                            ? "right-0 translate-x-full"
                            : "left-0 -translate-x-full"}
                    `}
                    style={{ borderColor: t.accent, opacity: 0.5 }}
                />
            </motion.div>

            {/* Center year bubble (desktop only) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-7 z-20 flex-col items-center justify-center w-14 h-14 rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md text-xs font-bold tracking-tight text-center leading-tight"
                style={{ borderColor: t.accent, color: t.accent }}
            >
                {String(data.year).includes("Today")
                    ? <><span className="text-[8px] uppercase tracking-widest">Now</span></>
                    : data.year
                }
            </motion.div>
        </div>
    )
}

// ─── Root component ───────────────────────────────────────────────────────────

const Experience = () => {
    const containerRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 85%", "end center"],
    })

    const scaleY = useSpring(scrollYProgress, { stiffness: 160, damping: 24 })

    return (
        <div id="experience" className="relative py-24 overflow-hidden">

            {/* ── Decorative background ──────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/4 -right-24 w-72 h-72 rounded-full blur-3xl opacity-[0.04] dark:opacity-[0.07] bg-emerald-400" />
                <div className="absolute bottom-1/4 -left-16 w-64 h-64 rounded-full blur-3xl opacity-[0.04] dark:opacity-[0.06] bg-amber-400" />
            </div>

            <Heading title="Education & Experience" subtitle="My Road" />

            {/* ── Legend ────────────────────────────────────────────────── */}
            <div className="flex items-center gap-5 mb-10">
                {Object.values(theme).map((t) => (
                    <span key={t.label} className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.accent }} />
                        {t.label}
                    </span>
                ))}
            </div>

            {/* ── Timeline ──────────────────────────────────────────────── */}
            <div ref={containerRef} className="relative flex flex-col gap-10">

                {/* Scroll-driven center line (desktop) */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-zinc-100 dark:bg-zinc-800 origin-top" />
                <motion.div
                    style={{ scaleY, background: "linear-gradient(to bottom, #f59e0b, #10b981)" }}
                    className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 w-px h-full origin-top"
                />

                {/* Mobile: simple left border */}
                <div
                    className="lg:hidden absolute left-3 top-0 w-px h-full"
                    style={{ background: "linear-gradient(to bottom, #f59e0b, #10b981)", opacity: 0.3 }}
                />

                {experienceData.map((data, i) => (
                    <TimelineCard key={i} data={data} index={i} />
                ))}
            </div>
        </div>
    )
}

export default Experience
