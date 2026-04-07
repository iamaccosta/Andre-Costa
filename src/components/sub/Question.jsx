'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Question = ({ question_data, index }) => {
    const [open, setOpen] = useState(false)

    return (
        <motion.li
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '40px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
            className={[
                "rounded-xl border transition-colors duration-200 overflow-hidden",
                open
                    ? "border-amber-400/60 dark:border-amber-500/50 bg-zinc-50 dark:bg-zinc-800/60"
                    : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-600",
            ].join(' ')}
        >
            {/* Header row */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left"
            >
                {/* Number badge */}
                <span
                    className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)" }}
                >
                    {index + 1}
                </span>

                {/* Question text */}
                <span className="flex-1 text-sm font-semibold tracking-wide text-zinc-800 dark:text-zinc-100">
                    {question_data.question}
                </span>

                {/* Chevron */}
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0 text-zinc-400 dark:text-zinc-500"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.span>
            </button>

            {/* Answer — animated expand/collapse */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p className="px-5 pb-5 pl-15 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-700/60 pt-3">
                            {question_data.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.li>
    )
}

export default Question
