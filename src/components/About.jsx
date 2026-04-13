'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Heading from './sub/Heading';
import Achievements from './sub/Achievements';
import PhotoFrame from './sub/PhotoFrame';
import { aboutData, aboutText, aboutHighlights, downloadIcon, fadeUp, stagger } from '@/assets';

const About = () => {
    const [intro, stack, closing] = aboutText.split('\n\n');

    return (
        <div id="about" className="relative min-h-screen flex flex-col justify-center py-24 overflow-hidden">

            {/* ── Decorative background ──────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full blur-3xl opacity-[0.04] dark:opacity-[0.07] bg-amber-400" />
            </div>

            <Heading title="About Me" subtitle="Who I Am" />

            {/* ── Two-column: text + image ───────────────────────────────── */}
            <div className="w-full flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

                {/* LEFT — Bio & CTA */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="flex-1 flex flex-col gap-6"
                >
                    <motion.p
                        variants={fadeUp}
                        className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium"
                    >
                        {intro}
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex flex-col gap-4">
                        {[stack, closing].map((para, i) => (
                            <p key={i} className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                                {para}
                            </p>
                        ))}
                    </motion.div>

                    {/* Expertise tags */}
                    <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                        {aboutHighlights.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/60 hover:border-amber-400/50 dark:hover:border-amber-500/40 transition-colors duration-200"
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full shrink-0"
                                    style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}
                                />
                                {tag}
                            </span>
                        ))}
                    </motion.div>

                    {/* Download CV */}
                    <motion.div variants={fadeUp}>
                        <a
                            href="/cv.pdf"
                            download
                            className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white rounded-xl shadow-md transition-all duration-200 hover:shadow-amber-500/20 hover:-translate-y-0.5 active:scale-97"
                            style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)" }}
                        >
                            Download CV
                            <span className="text-base">{downloadIcon}</span>
                        </a>
                    </motion.div>
                </motion.div>

                {/* RIGHT — Photo */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0 lg:self-center flex items-center justify-center"
                >
                    <div className="relative">
                        <PhotoFrame width="w-64 lg:w-80" height="h-64 lg:h-80">
                            <Image
                                src="/me/image-2.JPG"
                                alt="About André Costa"
                                fill
                                className="object-cover object-top"
                            />
                        </PhotoFrame>

                        {/* Floating location badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 220, damping: 18 }}
                            className="absolute -bottom-4 -left-6 flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full px-3 py-2 shadow-lg text-xs font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            <span>📍</span>
                            Porto, Portugal
                        </motion.div>

                        {/* Floating INESC TEC badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.65, type: "spring", stiffness: 220, damping: 18 }}
                            className="absolute -top-4 -right-4 flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full px-3 py-2 shadow-lg text-xs font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                            INESC TEC
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* ── Stats grid ─────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="mt-16 flex flex-wrap gap-4"
            >
                {aboutData.map((item) => (
                    <Achievements
                        key={item.title}
                        title={item.title}
                        amount={item.amount}
                        icon={item.icon}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default About;
