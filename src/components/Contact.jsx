'use client'

import { motion } from "framer-motion"
import Heading from "./sub/Heading"
import { heroIcons } from "@/assets"

// ─── Animation helpers ────────────────────────────────────────────────────────

const stagger = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const fadeUp = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

// ─── Static contact details ───────────────────────────────────────────────────

const contactDetails = [
    { label: 'Email',        value: 'hello@andrecosta.dev', icon: '✉️' },
    { label: 'Location',     value: 'Porto, Portugal',       icon: '📍' },
    { label: 'Availability', value: 'Open to new projects',  icon: '🟢' },
]

// ─── Input class helper ───────────────────────────────────────────────────────

const inputCls =
    "w-full px-4 py-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 " +
    "bg-zinc-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-200 " +
    "placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none " +
    "focus:border-amber-400/70 dark:focus:border-amber-500/60 transition-colors duration-200"

// ─── Component ────────────────────────────────────────────────────────────────

const Contact = () => (
    <div
        id="contact"
        className="relative min-h-screen flex flex-col justify-center py-24 overflow-hidden"
    >
        {/* ── Decorative background ──────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0">
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-3xl opacity-[0.05] dark:opacity-[0.09] bg-amber-400" />
            <div className="absolute top-1/3  -left-16  w-64 h-64 rounded-full blur-3xl opacity-[0.04] dark:opacity-[0.06] bg-red-400" />
        </div>

        {/* ── Section heading ────────────────────────────────────────── */}
        <Heading title="Get in Touch" subtitle="Contact" />

        {/* ── Two-column layout ──────────────────────────────────────── */}
        <div className="w-full flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

            {/* LEFT — Info & socials */}
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="flex-1 flex flex-col gap-8"
            >
                <motion.p
                    variants={fadeUp}
                    className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-sm"
                >
                    Have a project in mind, a question, or just want to connect?
                    Send me a message and I&apos;ll get back to you as soon as possible.
                </motion.p>

                {/* Contact detail cards */}
                <motion.div variants={fadeUp} className="flex flex-col gap-3">
                    {contactDetails.map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50"
                        >
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-sm text-lg shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                                    {item.label}
                                </p>
                                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Social links */}
                <motion.div variants={fadeUp} className="flex flex-col gap-3">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                        Find me on
                    </p>
                    <div className="flex items-center gap-2.5">
                        {heroIcons.map((item, i) => (
                            <a
                                key={i}
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-full text-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-amber-400/60 hover:text-amber-600 dark:hover:text-amber-500 transition-all duration-200"
                            >
                                {item.icon}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* RIGHT — Form */}
            <motion.form
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex flex-col gap-4"
            >
                <div className="flex flex-col sm:flex-row gap-4">
                    <input type="text"  placeholder="Your Name"  className={inputCls} />
                    <input type="email" placeholder="Your Email" className={inputCls} />
                </div>

                <input type="text" placeholder="Subject" className={inputCls} />

                <textarea
                    placeholder="Write me a message..."
                    rows={6}
                    className={inputCls + " resize-none"}
                />

                <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                        background:  "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
                        boxShadow:   "0 4px 24px rgba(245,158,11,0.22)",
                    }}
                >
                    Send Message
                    <span>→</span>
                </motion.button>
            </motion.form>
        </div>
    </div>
)

export default Contact
