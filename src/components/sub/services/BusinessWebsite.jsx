'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const navLinks = ["Solutions", "About", "Careers", "Contact"];

const stats = [
    { value: "12+",  label: "Years of expertise"   },
    { value: "340",  label: "Projects delivered"   },
    { value: "98%",  label: "Client satisfaction"  },
    { value: "40+",  label: "Countries served"     },
];

const services = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
        ),
        title: "Digital Strategy",
        description: "Data-driven roadmaps that align technology with your growth objectives.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
        ),
        title: "Growth Marketing",
        description: "Performance campaigns engineered to convert audiences into loyal customers.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
        ),
        title: "Web Presence",
        description: "End-to-end web design and development built for performance and scale.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
        ),
        title: "Brand Consulting",
        description: "Positioning, identity, and messaging that make your brand unforgettable.",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="shrink-0 flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-white/80 backdrop-blur-sm"
        >
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                        fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                    </svg>
                </div>
                <span className="text-slate-800 font-bold text-sm tracking-tight"
                    style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>
                    Nexvera
                </span>
            </div>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
                {navLinks.map(link => (
                    <a key={link}
                        className="text-slate-500 hover:text-slate-900 text-xs font-medium tracking-wide transition-colors duration-150 cursor-pointer">
                        {link}
                    </a>
                ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-2">
                <button className="text-xs text-slate-500 hover:text-slate-800 font-medium px-3 py-1.5 transition-colors duration-150">
                    Sign in
                </button>
                <button className="text-xs text-white font-semibold bg-emerald-500 hover:bg-emerald-400 active:scale-95 px-4 py-1.5 rounded-lg transition-all duration-150">
                    Get started
                </button>
            </div>

            {/* Mobile hamburger */}
            <button
                className="md:hidden text-slate-500 hover:text-slate-800 transition-colors"
                onClick={() => setMobileOpen(o => !o)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {mobileOpen
                        ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                        : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>
                    }
                </svg>
            </button>
        </motion.nav>
    );
};

const HeroSection = () => (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center px-6 pt-10 pb-8"
    >
        {/* Pill badge */}
        <motion.div variants={fadeUp}
            className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Now serving 40+ markets worldwide
        </motion.div>

        {/* Headline */}
        <motion.h1
            variants={fadeUp}
            className="text-slate-900 text-3xl md:text-4xl font-bold leading-tight tracking-tight max-w-md mb-4"
            style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
        >
            Grow faster with{" "}
            <span className="relative inline-block">
                <span className="relative z-10 text-emerald-500">smarter</span>
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 100 6" preserveAspectRatio="none">
                    <path d="M0 5 Q50 0 100 5" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                </svg>
            </span>{" "}
            digital solutions
        </motion.h1>

        {/* Subheadline */}
        <motion.p
            variants={fadeUp}
            className="text-slate-500 text-sm leading-relaxed max-w-sm mb-7"
        >
            Nexvera partners with ambitious companies to build digital infrastructure,
            sharpen brand identity, and accelerate measurable growth.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap justify-center">
            <button className="px-5 py-2.5 bg-slate-900 hover:bg-slate-700 active:scale-95 text-white text-xs font-semibold rounded-xl transition-all duration-200 shadow-md shadow-slate-900/15">
                Book a free consultation
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:text-slate-900 text-xs font-medium transition-colors duration-150">
                <span className="w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"
                        fill="currentColor" stroke="none">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                </span>
                Watch overview
            </button>
        </motion.div>
    </motion.div>
);

const StatsRow = () => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45, ease: "easeOut" }}
        className="mx-5 mb-6 grid grid-cols-4 divide-x divide-slate-200 bg-white border border-slate-200 rounded-2xl shadow-sm shadow-slate-100 overflow-hidden"
    >
        {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center py-4 px-2">
                <span className="text-slate-900 font-bold text-lg md:text-xl leading-none mb-1"
                    style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>
                    {s.value}
                </span>
                <span className="text-slate-400 text-[9px] md:text-[10px] text-center leading-snug tracking-wide uppercase">
                    {s.label}
                </span>
            </div>
        ))}
    </motion.div>
);

const ServicesGrid = () => (
    <div className="px-5 pb-6">
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.3 }}
            className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-3"
        >
            What we do
        </motion.p>
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-3"
        >
            {services.map((s) => (
                <motion.div
                    key={s.title}
                    variants={fadeUp}
                    className="group bg-white border border-slate-200 hover:border-emerald-300 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-emerald-50"
                >
                    <div className="w-9 h-9 rounded-lg bg-slate-50 group-hover:bg-emerald-50 border border-slate-200 group-hover:border-emerald-200 flex items-center justify-center text-slate-500 group-hover:text-emerald-600 mb-3 transition-all duration-200">
                        {s.icon}
                    </div>
                    <h3 className="text-slate-800 font-semibold text-xs mb-1 tracking-tight"
                        style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>
                        {s.title}
                    </h3>
                    <p className="text-slate-400 text-[11px] leading-relaxed">{s.description}</p>
                </motion.div>
            ))}
        </motion.div>
    </div>
);

// ─── Root component ───────────────────────────────────────────────────────────

const BusinessWebsite = () => (
    <div
        className="w-full h-full flex flex-col overflow-hidden"
        style={{ background: "#f8fafc" }}
    >

        <Navbar />

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
            <HeroSection />
            <StatsRow />
            <ServicesGrid />
        </div>
    </div>
);

export default BusinessWebsite;