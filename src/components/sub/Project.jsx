'use client'
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { projectStatusConfig, projectSourceConfig, projectDomainConfig, projectLinkIcon } from "@/assets"

// ─── Domain banner (shown when no image is provided) ─────────────────────────

const DomainBanner = ({ domain, tech, highlights, hovered }) => {
    const cfg = projectDomainConfig[domain] ?? { color: '#f59e0b', icon: '📁' }

    return (
        <div
            className="relative h-44 overflow-hidden flex items-center justify-center"
            style={{
                background: `radial-gradient(ellipse at 60% 40%, ${cfg.color}22 0%, transparent 70%),
                             radial-gradient(ellipse at 20% 80%, ${cfg.color}12 0%, transparent 60%)`,
                backgroundColor: 'rgba(0,0,0,0.02)',
            }}
        >
            {/* Dot-grid texture */}
            <div
                className="absolute inset-0 opacity-[0.07] dark:opacity-[0.10] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, ${cfg.color} 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                }}
            />

            {/* Large domain label — background texture */}
            <span
                className="absolute font-black tracking-tighter select-none pointer-events-none"
                style={{
                    fontSize: 'clamp(3.5rem, 12vw, 5rem)',
                    color: cfg.color,
                    opacity: 0.06,
                    letterSpacing: '-0.04em',
                }}
            >
                {domain}
            </span>

            {/* Default state: icon + tech pills */}
            <AnimatePresence mode="wait">
                {!hovered ? (
                    <motion.div
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="relative flex flex-col items-center gap-3 px-4"
                    >
                        <span className="text-4xl">{cfg.icon}</span>
                        <div className="flex flex-wrap justify-center gap-1.5">
                            {tech.slice(0, 5).map((t) => (
                                <span
                                    key={t}
                                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                                    style={{
                                        background: `${cfg.color}18`,
                                        color: cfg.color,
                                        border: `1px solid ${cfg.color}40`,
                                    }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    /* Hover state: highlights list */
                    <motion.div
                        key="hover"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2 }}
                        className="relative flex flex-col justify-end w-full h-full p-4 gap-1.5"
                    >
                        {highlights.slice(0, 3).map((h, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <span
                                    className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                                    style={{ background: cfg.color }}
                                />
                                <p className="text-zinc-700 dark:text-zinc-200 text-[11px] leading-snug">{h}</p>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Accent line at the bottom edge */}
            <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${cfg.color}60, transparent)` }}
            />
        </div>
    )
}

// ─── Image banner (shown when an image is provided) ──────────────────────────

const ImageBanner = ({ image, name, highlights, hovered }) => (
    <div className="relative h-44 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="320px"
        />
        <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/55 transition-colors duration-300" />

        <AnimatePresence>
            {hovered && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.22 }}
                    className="absolute inset-0 flex flex-col justify-end p-4 gap-1.5"
                >
                    {highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-amber-400" />
                            <p className="text-white/90 text-[11px] leading-snug">{h}</p>
                        </div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    </div>
)

// ─── Project card ─────────────────────────────────────────────────────────────

const Project = ({ index, name, summary, highlights, image, domain, source, tech, repoUrl, status }) => {
    const [hovered, setHovered] = useState(false)

    const statusCfg = projectStatusConfig[status]  ?? projectStatusConfig.completed
    const sourceCfg = projectSourceConfig[source]  ?? projectSourceConfig.academic

    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
            layout
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="group relative w-full sm:w-80 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700/60 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl hover:shadow-zinc-900/10 dark:hover:shadow-black/30 transition-shadow duration-300 cursor-pointer"
        >
            {/* ── Visual banner: image or domain panel ───────────────────── */}
            {image ? (
                <ImageBanner image={image} name={name} highlights={highlights} hovered={hovered} />
            ) : (
                <DomainBanner domain={domain} tech={tech} highlights={highlights} hovered={hovered} />
            )}

            {/* Status / Source badges (absolute over the banner) */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span
                    className="text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full"
                    style={{ background: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.color}33` }}
                >
                    {statusCfg.label}
                </span>
                <span
                    className="text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm"
                    style={{ color: sourceCfg.color }}
                >
                    {sourceCfg.label}
                </span>
            </div>

            {/* ── Card body ──────────────────────────────────────────────── */}
            <div className="flex flex-col gap-3 p-4">

                {/* Title + domain tag */}
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug line-clamp-2">
                        {name}
                    </h3>
                    <span className="shrink-0 text-[10px] font-semibold text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-full px-2 py-0.5">
                        {domain}
                    </span>
                </div>

                {/* Summary */}
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {summary}
                </p>

                {/* Tech tags — only shown when there's no image (banner already shows them) */}
                {image && (
                    <div className="flex flex-wrap gap-1.5">
                        {tech.slice(0, 4).map((t) => (
                            <span
                                key={t}
                                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                            >
                                {t}
                            </span>
                        ))}
                        {tech.length > 4 && (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                +{tech.length - 4}
                            </span>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 mt-auto border-t border-zinc-100 dark:border-zinc-800">
                    <div
                        className="h-px flex-1 rounded-full mr-4"
                        style={{ background: "linear-gradient(to right, #f59e0b, transparent)" }}
                    />
                    {repoUrl ? (
                        <a
                            href={repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-150"
                        >
                            View <span className="text-sm">{projectLinkIcon}</span>
                        </a>
                    ) : (
                        <span className="text-[11px] text-zinc-300 dark:text-zinc-600 italic">Private</span>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default Project
