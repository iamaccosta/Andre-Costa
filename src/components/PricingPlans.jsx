'use client'

import { motion } from "framer-motion"
import Heading from "./sub/Heading"
import { pricingPlans, checkIcon } from "@/assets"

// ─── Animation helpers ────────────────────────────────────────────────────────

const stagger = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const fadeUp = {
    hidden:  { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// ─── Single plan card ─────────────────────────────────────────────────────────

const PlanCard = ({ plan }) => {
    const { tier, title, pricing, icon, accent, isPopular, features, recommended } = plan

    return (
        <motion.div
            variants={fadeUp}
            className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
                isPopular
                    ? "shadow-2xl shadow-red-500/10 dark:shadow-red-500/20 scale-[1.03] z-10"
                    : "shadow-sm hover:shadow-lg"
            } border ${
                isPopular
                    ? "border-red-400/40 dark:border-red-500/30"
                    : "border-zinc-200 dark:border-zinc-700/60"
            } bg-white dark:bg-zinc-900`}
        >
            {/* Top gradient bar */}
            <div
                className="h-1 w-full shrink-0"
                style={{ background: `linear-gradient(to right, ${accent}, ${accent}80)` }}
            />

            {/* Popular badge */}
            {isPopular && (
                <div
                    className="absolute top-5 right-5 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full text-white"
                    style={{ background: `linear-gradient(135deg, #f59e0b, #ef4444)` }}
                >
                    Most Popular
                </div>
            )}

            <div className="flex flex-col gap-6 p-6 flex-1">

                {/* Header */}
                <div className="flex flex-col gap-3">
                    {/* Icon + tier */}
                    <div className="flex items-center gap-2">
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                            style={{ background: `${accent}18`, color: accent }}
                        >
                            {icon}
                        </div>
                        <span
                            className="text-xs font-bold tracking-widest uppercase"
                            style={{ color: accent }}
                        >
                            {tier}
                        </span>
                    </div>

                    {/* Price */}
                    <div>
                        <p className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                            {pricing}
                        </p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">one-time project fee</p>
                    </div>
                </div>

                {/* Divider */}
                <div
                    className="h-px w-full"
                    style={{ background: `linear-gradient(to right, ${accent}40, transparent)` }}
                />

                {/* Feature list */}
                <ul className="flex flex-col gap-2.5 flex-1">
                    {features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                            <span
                                className="mt-0.5 text-base shrink-0"
                                style={{ color: accent }}
                            >
                                {checkIcon}
                            </span>
                            <span className="text-sm text-zinc-600 dark:text-zinc-300 leading-snug">
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <div className="flex flex-col gap-3 pt-2">
                    <motion.a
                        href="#contact"
                        whileTap={{ scale: 0.97 }}
                        className="w-full flex items-center justify-center py-3 rounded-xl text-sm font-bold transition-all duration-200"
                        style={
                            isPopular
                                ? { background: "linear-gradient(135deg, #f59e0b, #ef4444)", color: "#fff", boxShadow: "0 4px 20px rgba(245,158,11,0.25)" }
                                : { background: `${accent}12`, color: accent }
                        }
                    >
                        Get started →
                    </motion.a>

                    {/* Recommended for */}
                    <p className="text-[11px] text-zinc-400 dark:text-zinc-500 text-center leading-snug">
                        Ideal for: <span className="font-semibold text-zinc-500 dark:text-zinc-400">{recommended}</span>
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

// ─── Root component ───────────────────────────────────────────────────────────

const PricingPlans = () => (
    <div id="pricing" className="relative py-24 overflow-hidden">

        {/* ── Decorative background ──────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full blur-3xl opacity-[0.04] dark:opacity-[0.07] bg-amber-400" />
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-[0.03] dark:opacity-[0.05] bg-indigo-400" />
        </div>

        <Heading title="Pricing Plans" subtitle="Investment" />

        {/* Value proposition line */}
        <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mb-12 leading-relaxed"
        >
            Transparent, one-time pricing — no recurring fees, no surprises. Every project is tailored to your
            needs; these ranges are a starting point for conversation.
        </motion.p>

        {/* Cards grid */}
        <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
            {pricingPlans.map((plan) => (
                <PlanCard key={plan.tier} plan={plan} />
            ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 text-center text-xs text-zinc-400 dark:text-zinc-600"
        >
            Not sure which plan fits? <a href="#contact" className="text-amber-600 dark:text-amber-500 font-semibold hover:underline">Send me a message</a> and we&apos;ll figure it out together.
        </motion.p>
    </div>
)

export default PricingPlans
