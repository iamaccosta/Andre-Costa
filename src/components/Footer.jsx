'use client'
import { motion } from 'framer-motion'
import { heroIcons } from '@/assets'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer
            id="footer"
            className="relative border-t border-zinc-200 dark:border-zinc-800 py-10 overflow-hidden"
        >
            {/* Subtle top gradient accent */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(to right, transparent, #f59e0b60, transparent)' }}
            />

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row items-center justify-between gap-6"
            >
                {/* Name + copyright */}
                <div className="flex flex-col items-center sm:items-start gap-0.5">
                    <span className="text-md font-bold text-zinc-900 dark:text-white tracking-tight">
                        André C. Costa
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        © 2019 – {currentYear}
                    </span>
                </div>

                {/* Tagline */}
                <p className="text-sm italic text-zinc-500 dark:text-zinc-400 text-center">
                    Building software that matters.
                </p>

                {/* Social icons */}
            </motion.div>
        </footer>
    )
}

export default Footer
