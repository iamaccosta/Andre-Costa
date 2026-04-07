'use client'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const Achievements = ({ title, amount, icon }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, v => Math.round(v));

    const startCount = () => {
        animate(count, amount, { duration: 1.6, ease: [0.33, 1, 0.68, 1] });
    };

    return (
        <motion.div
            whileInView={startCount}
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 20 }}
            whileInViewAnimation={{ opacity: 1, y: 0 }}
            className="group relative flex-1 min-w-36 flex flex-col gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 p-5 overflow-hidden transition-all duration-300 hover:border-amber-400/50 dark:hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5"
        >
            {/* Gradient top-edge accent */}
            <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to right, #f59e0b, #ef4444)" }}
            />

            {/* Icon */}
            <span className="text-2xl text-amber-500 dark:text-amber-400 self-start">
                {icon}
            </span>

            {/* Counter */}
            <div className="flex items-end gap-0.5">
                <motion.span className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-none">
                    {rounded}
                </motion.span>
                <span
                    className="text-xl font-bold mb-0.5"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                    +
                </span>
            </div>

            {/* Label */}
            <span className="text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400 uppercase leading-snug">
                {title}
            </span>
        </motion.div>
    );
};

export default Achievements;
