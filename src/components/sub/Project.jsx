'use client'
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { projectStatusConfig, projectSourceConfig, projectGithubIcon, projectLinkIcon } from "@/assets"

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
            {/* ── Image ──────────────────────────────────────────────────── */}
            <div className="relative h-44 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="320px"
                />

                {/* Dark scrim — always present, deepens on hover */}
                <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/55 transition-colors duration-300" />

                {/* Hover overlay — highlights list */}
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
                                    <span
                                        className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-amber-400"
                                    />
                                    <p className="text-white/90 text-[11px] leading-snug">{h}</p>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Top badges row */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    {/* Status */}
                    <span
                        className="text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full"
                        style={{ background: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.color}33` }}
                    >
                        {statusCfg.label}
                    </span>

                    {/* Source */}
                    <span
                        className="text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm"
                        style={{ color: sourceCfg.color }}
                    >
                        {sourceCfg.label}
                    </span>
                </div>
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

                {/* Tech tags */}
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

                {/* Footer — gradient accent line + repo link */}
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
