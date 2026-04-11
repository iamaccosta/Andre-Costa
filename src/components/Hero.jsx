'use client'
import Image from "next/image";
import { heroIcons, heroRoles, heroTechBadges, aboutData, fadeUp, stagger } from "@/assets";
import { useMotionValue, useTransform, motion, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import PhotoFrame from "./sub/PhotoFrame";

// Hero-specific entry animation (faster stagger + earlier start than default)
const heroStagger = {
    hidden:   {},
    visible:  { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const heroFadeUp = {
    hidden:   { opacity: 0, y: 28 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Hero = () => {
    const [buttonHover, setButtonHover]   = useState(false);
    const [roleIndex,   setRoleIndex]     = useState(0);

    useEffect(() => {
        const id = setInterval(() => setRoleIndex(i => (i + 1) % heroRoles.length), 2800);
        return () => clearInterval(id);
    }, []);

    // ── 3D tilt (relative to the image wrapper) ───────────────────────────────
    const imageWrapRef = useRef(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 140, damping: 22 });
    const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]),  { stiffness: 140, damping: 22 });

    const onMouseMove = useCallback((e) => {
        const rect = imageWrapRef.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width  - 0.5);
        my.set((e.clientY - rect.top)  / rect.height - 0.5);
    }, [mx, my]);

    const onMouseLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

    return (
        <div
            id="home"
            className="relative h-screen flex items-center px-5 sm:p-0 overflow-hidden"
        >
            {/* ── Decorative background ──────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-20 right-0 w-120 h-120 rounded-full blur-3xl opacity-[0.07] dark:opacity-[0.12] bg-amber-400" />
                <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-[0.05] dark:opacity-[0.08] bg-red-400" />
                <div
                    className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #78716c 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>

            {/* ── Main layout ────────────────────────────────────────────── */}
            <div className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-6">

                {/* ── LEFT: Text content ──────────────────────────────────── */}
                <motion.div
                    variants={heroStagger}
                    initial="hidden"
                    animate="visible"
                    className="flex-1 flex flex-col gap-5 text-center lg:text-left"
                >
                    {/* Available badge */}
                    <motion.div variants={heroFadeUp} className="flex justify-center lg:justify-start">
                        <span className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-medium px-3 py-1.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Available for new projects
                        </span>
                    </motion.div>

                    {/* Animated role */}
                    <motion.div variants={heroFadeUp} className="h-5 flex items-center justify-center lg:justify-start overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={roleIndex}
                                initial={{ y: 16, opacity: 0 }}
                                animate={{ y: 0,  opacity: 1 }}
                                exit={{    y: -16, opacity: 0 }}
                                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                                className="text-xs font-semibold tracking-widest uppercase text-amber-600 dark:text-amber-500"
                            >
                                {heroRoles[roleIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        variants={heroFadeUp}
                        className="font-extrabold tracking-tight leading-[1.08] text-zinc-900 dark:text-white"
                        style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
                    >
                        Eng. André<br />
                        <span style={{
                            background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                            C. Costa
                        </span>
                    </motion.h1>

                    {/* Quote */}
                    <motion.p
                        variants={heroFadeUp}
                        className="text-sm italic leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto lg:mx-0 border-l-2 border-amber-400/50 pl-3"
                    >
                        One day of doing things is more worth than one month of planning them.
                    </motion.p>

                    {/* Stats */}
                    <motion.div variants={heroFadeUp} className="flex items-center gap-7 justify-center lg:justify-start">
                        {aboutData.slice(0, 3).map((stat) => (
                            <div key={stat.title} className="flex flex-col items-center lg:items-start">
                                <span className="text-2xl font-bold text-zinc-900 dark:text-white leading-none">
                                    {stat.amount}
                                    <span className="text-amber-500">+</span>
                                </span>
                                <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wide uppercase mt-0.5 leading-snug">
                                    {stat.title}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTAs */}
                    <motion.div variants={heroFadeUp} className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
                        <motion.a
                            href="#contact"
                            whileTap={{ scale: 0.97 }}
                            onHoverStart={() => setButtonHover(true)}
                            onHoverEnd={() => setButtonHover(false)}
                            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl shadow-lg transition-shadow duration-200"
                            style={{
                                background:  "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
                                boxShadow:   "0 4px 24px rgba(245,158,11,0.25)",
                            }}
                        >
                            Send me a Message
                            <motion.span
                                animate={{ x: buttonHover ? 4 : 0 }}
                                transition={{ duration: 0.18 }}
                            >
                                →
                            </motion.span>
                        </motion.a>
                    </motion.div>

                    {/* Social icons */}
                    <motion.div variants={heroFadeUp} className="flex items-center gap-2.5 justify-center lg:justify-start">
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
                    </motion.div>
                </motion.div>

                {/* ── RIGHT: Image ─────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    ref={imageWrapRef}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    className="shrink-0 flex items-center justify-center"
                    style={{ perspective: "1000px" }}
                >
                    <motion.div
                        style={{ rotateX, rotateY }}
                        className="relative flex items-center justify-center"
                    >
                        <PhotoFrame width="w-56 lg:w-72" height="h-56 lg:h-72">
                            <Image
                                src="/me/image-4.JPG"
                                alt="André C. Costa"
                                fill
                                priority
                                className="object-cover object-top"
                            />
                        </PhotoFrame>

                        {/* Floating tech badges */}
                        {heroTechBadges.map((badge) => (
                            <motion.div
                                key={badge.label}
                                initial={{ opacity: 0, scale: 0.75 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.9, duration: 0.4, type: "spring", stiffness: 200 }}
                                className="absolute"
                                style={badge.style}
                            >
                                <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full px-2.5 py-1 shadow-md text-[10px] font-semibold text-zinc-700 dark:text-zinc-200 whitespace-nowrap">
                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: badge.color }} />
                                    {badge.label}
                                </div>
                            </motion.div>
                        ))}

                        {/* Hi 👋 badge */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.75, type: "spring", stiffness: 260, damping: 18 }}
                            className="absolute -top-3 -right-3 w-12 h-12 bg-white dark:bg-zinc-900 border border-amber-200 dark:border-amber-800 rounded-full flex items-center justify-center text-2xl shadow-xl"
                        >
                            👋
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* ── Scroll indicator ──────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
            >
                <span className="text-[11px] tracking-widest uppercase text-zinc-500 dark:text-zinc-200 font-medium">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-0.5 h-7 rounded-full"
                    style={{ background: "linear-gradient(to bottom, #f59e0b80, transparent)" }}
                />
            </motion.div>
        </div>
    );
};

export default Hero;
