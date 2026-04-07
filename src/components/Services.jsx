'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "./sub/Heading";
import OnlineShop from "./sub/services/OnlineShop";
import Portfolio from "./sub/services/Portfolio";
import Gallery from "./sub/services/Gallery";
import RestaurantMenu from "./sub/services/RestaurantMenu";
import BusinessWebsite from "./sub/services/BusinessWebsite";
import { servicesData, serviceDemos } from "@/assets";

// ─── Demo component map ───────────────────────────────────────────────────────

const demoComponents = {
    portfolio: <Portfolio key="portfolio" />,
    gallery:   <Gallery   key="gallery"   />,
    shop:      <OnlineShop key="shop"     />,
    menu:      <RestaurantMenu key="menu" />,
    business:  <BusinessWebsite key="business" />,
};

// ─── Animation helpers ────────────────────────────────────────────────────────

const stagger = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const fadeUp = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Service card ─────────────────────────────────────────────────────────────

const ServiceCard = ({ title, subtitle, icon, accent, description, tech }) => (
    <motion.div
        variants={fadeUp}
        className="group relative flex flex-col gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 bg-white dark:bg-zinc-900 p-5 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-default"
        style={{ "--accent": accent }}
    >
        {/* Hover accent line */}
        <div
            className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
            style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
        />

        {/* Icon */}
        <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${accent}18`, color: accent }}
        >
            {icon}
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug">{title}</h3>
            <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">{subtitle}</p>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-zinc-100 dark:border-zinc-800">
            {tech.map((t) => (
                <span
                    key={t}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400"
                >
                    {t}
                </span>
            ))}
        </div>
    </motion.div>
);

// ─── Root component ───────────────────────────────────────────────────────────

const Services = () => {
    const [activeDemo, setActiveDemo] = useState(serviceDemos[0].key);

    const currentDemo = serviceDemos.find(d => d.key === activeDemo);

    return (
        <div id="services" className="relative py-24 overflow-hidden">

            {/* ── Decorative background ──────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-[0.04] dark:opacity-[0.07] bg-amber-400" />
                <div className="absolute bottom-1/3 -left-20 w-72 h-72 rounded-full blur-3xl opacity-[0.03] dark:opacity-[0.05] bg-indigo-400" />
            </div>

            {/* ── Section heading ────────────────────────────────────────── */}
            <Heading title="What I Can Do For You" subtitle="Services" />

            {/* ══ PART 1: Services grid ══════════════════════════════════ */}
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20"
            >
                {servicesData.map((service) => (
                    <ServiceCard key={service.title} {...service} />
                ))}
            </motion.div>

            {/* ── Divider ────────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 mb-16 origin-left"
            >
                <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                <div className="flex items-center gap-2 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                        Live Examples
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                </div>
                <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
            </motion.div>

            {/* ══ PART 2: Live demo showcase ═════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-6"
            >
                {/* Sub-heading */}
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        See it in action
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Interactive demos of website types I can build for you — fully functional, animated, production-quality.
                    </p>
                </div>

                {/* Tab selector */}
                <div className="flex flex-wrap items-center gap-2">
                    {serviceDemos.map((demo, i) => (
                        <button
                            key={demo.key}
                            onClick={() => setActiveDemo(demo.key)}
                            className="relative px-4 py-2 text-xs font-semibold rounded-xl transition-colors duration-150"
                        >
                            {activeDemo === demo.key && (
                                <motion.div
                                    layoutId="demoTab"
                                    className="absolute inset-0 rounded-xl"
                                    style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            <span className={`relative z-10 transition-colors duration-150 ${
                                activeDemo === demo.key
                                    ? "text-white"
                                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                            }`}>
                                {String(i + 1).padStart(2, "0")} {demo.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Demo description */}
                <AnimatePresence mode="wait">
                    <motion.p
                        key={activeDemo + "-desc"}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22 }}
                        className="text-sm text-zinc-500 dark:text-zinc-400 border-l-2 border-amber-400/50 pl-3 leading-relaxed"
                    >
                        {currentDemo?.description}
                    </motion.p>
                </AnimatePresence>

                {/* Preview window */}
                <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700/60 shadow-xl dark:shadow-black/30">

                    {/* Fake browser chrome */}
                    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shrink-0">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                        </div>
                        <div className="flex-1 flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-3 py-1 max-w-64 mx-auto">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate font-mono">
                                {currentDemo?.label.toLowerCase().replace(/ /g, "-")}.andrecosta.dev
                            </span>
                        </div>
                        <div className="w-16" />
                    </div>

                    {/* Demo content */}
                    <div className="relative lg:h-150 md:h-130 h-110 overflow-hidden bg-zinc-100 dark:bg-zinc-950">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeDemo}
                                initial={{ opacity: 0, scale: 0.99, y: 12 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.99, y: -8 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0"
                            >
                                {demoComponents[activeDemo]}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation dots */}
                <div className="flex items-center justify-center gap-2">
                    {serviceDemos.map((demo) => (
                        <button
                            key={demo.key}
                            onClick={() => setActiveDemo(demo.key)}
                            className="relative h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                            style={{
                                width: activeDemo === demo.key ? "24px" : "6px",
                                background: activeDemo === demo.key
                                    ? "linear-gradient(to right, #f59e0b, #ef4444)"
                                    : undefined,
                            }}
                        >
                            {activeDemo !== demo.key && (
                                <span className="absolute inset-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                            )}
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Services;
