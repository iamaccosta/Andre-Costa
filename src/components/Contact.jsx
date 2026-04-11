'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import Heading from './sub/Heading'
import { heroIcons, fadeUp, stagger } from '@/assets'

// ─── EmailJS config ───────────────────────────────────────────────────────────
// Main template variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// Auto-reply template variables: {{to_name}}, {{to_email}}
const EMAILJS_SERVICE_ID        = 'service_bbyljq9'
const EMAILJS_TEMPLATE_ID       = 'template_sojh37j'
const EMAILJS_AUTOREPLY_ID      = 'YOUR_AUTOREPLY_TEMPLATE_ID' // set in EmailJS dashboard
const EMAILJS_PUBLIC_KEY        = 'E32pHTZh78NJN7kzk'

// ─── Validation ───────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(fields) {
    const errors = {}
    if (!fields.name.trim())               errors.name    = 'Name is required.'
    if (!fields.email.trim())              errors.email   = 'Email is required.'
    else if (!EMAIL_RE.test(fields.email)) errors.email   = 'Enter a valid email address.'
    if (!fields.subject.trim())            errors.subject = 'Subject is required.'
    if (!fields.message.trim())            errors.message = 'Message cannot be empty.'
    return errors
}

// ─── Static contact details ───────────────────────────────────────────────────

const contactDetails = [
    { label: 'Email',        value: 'andre.c.costa06@gmail.com', icon: '✉️' },
    { label: 'Location',     value: 'Porto, Portugal',           icon: '📍' },
    { label: 'Availability', value: 'Open to new projects',      icon: '🟢' },
]

// ─── Input class helpers ──────────────────────────────────────────────────────

const baseCls =
    "w-full px-4 py-3 text-sm rounded-xl border bg-zinc-50 dark:bg-zinc-800/60 " +
    "text-zinc-700 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 " +
    "outline-none transition-colors duration-200"

const fieldCls = (hasError) =>
    baseCls + (hasError
        ? " border-red-400 dark:border-red-500 focus:border-red-400"
        : " border-zinc-200 dark:border-zinc-700 focus:border-amber-400/70 dark:focus:border-amber-500/60")

// ─── Component ────────────────────────────────────────────────────────────────

const INIT = { name: '', email: '', subject: '', message: '' }

const Contact = () => {
    const [fields,  setFields]  = useState(INIT)
    const [errors,  setErrors]  = useState({})
    const [status,  setStatus]  = useState('idle') // idle | sending | success | error

    // Honeypot — stays empty for real users, bots fill it
    const honeypotRef = useRef(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFields(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Silently discard if honeypot was filled
        if (honeypotRef.current?.value) return

        const errs = validate(fields)
        if (Object.keys(errs).length) { setErrors(errs); return }

        setStatus('sending')
        try {
            // 1. Send the message to yourself
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name:  fields.name,
                    from_email: fields.email,
                    subject:    fields.subject,
                    message:    fields.message,
                },
                EMAILJS_PUBLIC_KEY
            )

            // 2. Send auto-reply to the sender
            if (EMAILJS_AUTOREPLY_ID !== 'YOUR_AUTOREPLY_TEMPLATE_ID') {
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_AUTOREPLY_ID,
                    {
                        to_name:  fields.name,
                        to_email: fields.email,
                    },
                    EMAILJS_PUBLIC_KEY
                )
            }

            setStatus('success')
            setFields(INIT)
        } catch {
            setStatus('error')
        }
    }

    return (
        <div
            id="contact"
            className="relative min-h-screen flex flex-col justify-center py-24 overflow-hidden"
        >
            {/* ── Decorative background ──────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-3xl opacity-[0.05] dark:opacity-[0.09] bg-amber-400" />
                <div className="absolute top-1/3  -left-16  w-64 h-64 rounded-full blur-3xl opacity-[0.04] dark:opacity-[0.06] bg-red-400" />
            </div>

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
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 flex flex-col gap-4"
                >
                    {/* Honeypot — hidden from real users, bots fill it and get silently dropped */}
                    <input
                        ref={honeypotRef}
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
                    />

                    {/* Name + Email row */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex flex-col gap-1 w-full">
                            <input
                                type="text"
                                name="name"
                                value={fields.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className={fieldCls(errors.name)}
                            />
                            {errors.name && <p className="text-[11px] text-red-500 pl-1">{errors.name}</p>}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <input
                                type="email"
                                name="email"
                                value={fields.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                className={fieldCls(errors.email)}
                            />
                            {errors.email && <p className="text-[11px] text-red-500 pl-1">{errors.email}</p>}
                        </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-1">
                        <input
                            type="text"
                            name="subject"
                            value={fields.subject}
                            onChange={handleChange}
                            placeholder="Subject"
                            className={fieldCls(errors.subject)}
                        />
                        {errors.subject && <p className="text-[11px] text-red-500 pl-1">{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1">
                        <textarea
                            name="message"
                            value={fields.message}
                            onChange={handleChange}
                            placeholder="Write me a message..."
                            rows={6}
                            className={fieldCls(errors.message) + " resize-none"}
                        />
                        {errors.message && <p className="text-[11px] text-red-500 pl-1">{errors.message}</p>}
                    </div>

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        disabled={status === 'sending'}
                        whileTap={{ scale: 0.97 }}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                        style={{
                            background:  "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
                            boxShadow:   "0 4px 24px rgba(245,158,11,0.22)",
                        }}
                    >
                        {status === 'sending' ? (
                            <>
                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                                </svg>
                                Sending…
                            </>
                        ) : 'Send Message →'}
                    </motion.button>

                    {/* Feedback banners */}
                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.p
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-sm text-center text-emerald-600 dark:text-emerald-400 font-medium"
                            >
                                Message sent! Check your inbox — I&apos;ve sent you a confirmation too.
                            </motion.p>
                        )}
                        {status === 'error' && (
                            <motion.p
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-sm text-center text-red-500 font-medium"
                            >
                                Something went wrong. Please try again or email me directly.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.form>
            </div>
        </div>
    )
}

export default Contact
