'use client';
import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { heroIcons } from "@/assets";

// ─── Data ─────────────────────────────────────────────────────────────────────

const navItems = ["About", "Skills", "Projects", "Contact"];
const sections = ["Home", "About", "Skills", "Projects", "Contact"];

// ─── Animation variants ───────────────────────────────────────────────────────

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
};

const fadeUp = {
    hidden:  { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Root component ───────────────────────────────────────────────────────────

const Portfolio = () => {
    const [buttonHover, setButtonHover] = useState(false);

    // ── 3D tilt for photo ──────────────────────────────────────────────────────
    const wrapRef = useRef(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 220, damping: 28 });
    const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 220, damping: 28 });

    const onMouseMove = useCallback((e) => {
        const rect = wrapRef.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [mx, my]);

    const onMouseLeave = useCallback(() => {
        mx.set(0);
        my.set(0);
    }, [mx, my]);

    return (
        <div className="w-full h-full flex flex-col overflow-hidden rounded-2xl" style={{ background: "#07090f" }}>

            {/* ── Ambient glow ─────────────────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse 55% 45% at 75% 35%, #4f46e520 0%, transparent 65%)" }} />

            {/* ── Navbar ───────────────────────────────────────────────────── */}
            <motion.nav
                initial={{ y: -18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="shrink-0 flex items-center justify-between px-6 py-3.5 border-b border-white/6 z-10"
            >
                <span className="text-white font-bold text-sm tracking-tight select-none">
                    <span style={{ color: "#818cf8" }}>AC</span>.dev
                </span>

                <div className="hidden md:flex items-center gap-5">
                    {navItems.map(link => (
                        <a key={link} className="text-white/30 hover:text-white/70 text-xs font-medium tracking-wide transition-colors duration-150 cursor-pointer">
                            {link}
                        </a>
                    ))}
                </div>

                <button
                    className="text-xs font-semibold text-white px-4 py-1.5 rounded-lg transition-all duration-150 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" }}
                >
                    Hire me
                </button>
            </motion.nav>

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 px-8 py-5 z-10 overflow-hidden">

                {/* Left — text layers */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="flex-1 flex flex-col gap-4 min-w-0"
                >
                    {/* Status pill */}
                    <motion.div variants={fadeUp} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-emerald-400/80 text-[10px] font-medium tracking-wide">Available for work</span>
                    </motion.div>

                    {/* Name */}
                    <motion.div variants={fadeUp}>
                        <p className="text-indigo-400/70 text-[10px] font-semibold tracking-widest uppercase mb-2">
                            Software Engineer
                        </p>
                        <h1
                            className="text-white font-extrabold leading-tight tracking-tight"
                            style={{ fontSize: "clamp(1.45rem, 2.8vw, 2.1rem)" }}
                        >
                            Eng. André<br />
                            <span style={{
                                background: "linear-gradient(90deg, #818cf8 0%, #c084fc 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}>
                                C. Costa
                            </span>
                        </h1>
                    </motion.div>

                    {/* Quote */}
                    <motion.p variants={fadeUp} className="text-white/30 text-[11px] leading-relaxed max-w-xs italic">
                        &ldquo;One day of doing things is more worth than one month of planning them.&rdquo;
                    </motion.p>

                    {/* Social icons */}
                    <motion.div variants={fadeUp} className="flex items-center gap-2.5">
                        {heroIcons.map((item, i) => (
                            <a
                                key={i}
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-white/35 hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-indigo-500/8 transition-all duration-200"
                            >
                                {item.icon}
                            </a>
                        ))}
                    </motion.div>

                    {/* CTAs */}
                    <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
                        <motion.a
                            href="#contact"
                            onHoverStart={() => setButtonHover(true)}
                            onHoverEnd={() => setButtonHover(false)}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white rounded-xl shadow-lg transition-all duration-150"
                            style={{
                                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                                boxShadow: "0 4px 20px #4f46e533",
                            }}
                        >
                            Send me a Message
                            <motion.span
                                animate={{ x: buttonHover ? 3 : 0 }}
                                transition={{ duration: 0.18 }}
                            >
                                →
                            </motion.span>
                        </motion.a>
                        <a className="text-xs font-medium text-white/30 hover:text-white/60 transition-colors duration-150 cursor-pointer">
                            View projects ↗
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right — 3D photo */}
                <motion.div
                    initial={{ opacity: 0, x: 30, scale: 0.92 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="shrink-0 flex items-center justify-center"
                    style={{ perspective: 900 }}
                    ref={wrapRef}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                >
                    <motion.div
                        style={{ rotateX, rotateY }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Decorative ring */}
                        <div
                            className="absolute rounded-full border border-indigo-500/15"
                            style={{ inset: "-20px" }}
                        />
                        <div
                            className="absolute rounded-full border border-violet-500/10"
                            style={{ inset: "-36px" }}
                        />

                        {/* Glow */}
                        <div
                            className="absolute rounded-full blur-2xl opacity-50"
                            style={{
                                inset: "-10px",
                                background: "radial-gradient(circle, #6d28d9 0%, transparent 70%)",
                            }}
                        />

                        {/* Photo */}
                        <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-indigo-500/25 shadow-2xl">
                            <Image
                                src="/person.png"
                                alt="André C. Costa"
                                fill
                                className="object-cover object-top"
                                priority
                            />
                        </div>

                        {/* Hi badge */}
                        <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.85, type: "spring", stiffness: 260, damping: 18 }}
                            className="absolute -top-1 -right-1 w-10 h-10 flex items-center justify-center rounded-full text-lg shadow-xl"
                            style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
                        >
                            👋
                        </motion.span>
                    </motion.div>
                </motion.div>
            </div>

            {/* ── Section dots (1-page indicator) ──────────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="shrink-0 flex items-center justify-center gap-5 pb-4 z-10"
            >
                {sections.map((s, i) => (
                    <div key={s} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                        <div
                            className="rounded-full transition-all duration-300"
                            style={{
                                width:  i === 0 ? "20px" : "6px",
                                height: "6px",
                                background: i === 0 ? "#818cf8" : "rgba(255,255,255,0.12)",
                            }}
                        />
                        <span className="text-[8px] text-white/0 group-hover:text-white/30 transition-colors duration-200 tracking-wide">
                            {s}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Portfolio;
