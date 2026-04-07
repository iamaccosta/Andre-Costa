'use client'
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Heading from "./sub/Heading"
import Project from "./sub/Project"
import { projectDomains, projectsData } from "@/assets"

const Projects = () => {
    const [domain, setDomain] = useState("All")

    const filtered = projectsData.filter((p) => domain === "All" || p.domain === domain)

    return (
        <div id="projects" className="relative min-h-screen py-24 overflow-hidden">

            {/* ── Decorative background ──────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/4 -right-24 w-80 h-80 rounded-full blur-3xl opacity-[0.04] dark:opacity-[0.07] bg-amber-400" />
                <div className="absolute bottom-1/3 -left-20 w-64 h-64 rounded-full blur-3xl opacity-[0.03] dark:opacity-[0.05] bg-red-400" />
            </div>

            <Heading title="Projects" subtitle="What I've Built" />

            {/* ── Filter pills ───────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-wrap items-center gap-2 mb-10"
            >
                {projectDomains.map((text) => (
                    <button
                        key={text}
                        onClick={() => setDomain(text)}
                        className="relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200"
                        style={{
                            color: domain === text ? "#fff" : undefined,
                        }}
                    >
                        {domain === text && (
                            <motion.div
                                layoutId="domainPill"
                                className="absolute inset-0 rounded-full"
                                style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        )}
                        <span className={`relative z-10 ${domain === text ? "text-white" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"} transition-colors duration-150`}>
                            {text}
                        </span>

                        {/* Count badge */}
                        {domain !== text && (
                            <span className="relative z-10 ml-1.5 text-[9px] font-bold text-zinc-400 dark:text-zinc-600">
                                {text === "All"
                                    ? projectsData.length
                                    : projectsData.filter((p) => p.domain === text).length}
                            </span>
                        )}
                    </button>
                ))}
            </motion.div>

            {/* ── Project grid ───────────────────────────────────────────── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={domain}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-wrap justify-center gap-5"
                >
                    {filtered.length > 0 ? (
                        filtered.map((project, i) => (
                            <Project key={project.name} index={i} {...project} />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20 text-zinc-400 dark:text-zinc-600 gap-3"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2"/>
                                <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                            </svg>
                            <p className="text-sm">No projects in this category yet.</p>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default Projects
