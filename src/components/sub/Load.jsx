'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Load = () => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const t = setTimeout(() => setVisible(false), 1400)
        return () => clearTimeout(t)
    }, [])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="loader"
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white dark:bg-zinc-950"
                >
                    {/* Logo mark */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center gap-3"
                    >
                        <span
                            className="text-8xl font-extrabold tracking-tight leading-none select-none"
                            style={{
                                background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            A.
                        </span>
                        <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-zinc-400 dark:text-zinc-500">
                            André Costa
                        </span>
                    </motion.div>

                    {/* Progress bar */}
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-28 h-px rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '0%' }}
                            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full h-full rounded-full"
                            style={{ background: "linear-gradient(to right, #f59e0b, #ef4444)" }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Load
