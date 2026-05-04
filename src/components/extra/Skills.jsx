'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Heading from '@/components/sub/Heading'
import { skillsCategories } from '@/assets'

const fadeUp = {
    hidden:  { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
    }),
}

const SkillPill = ({ skill, color, index }) => (
    <motion.div
        custom={index}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '40px' }}
        whileHover={{ y: -2, scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
        {skill.icon ? (
            <Image
                src={skill.icon}
                alt={skill.name}
                width={24}
                height={24}
                className="w-6 h-6 object-contain shrink-0"
            />
        ) : (
            <span className="text-xl leading-none shrink-0">{skill.emoji}</span>
        )}
        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
            {skill.name}
        </span>
    </motion.div>
)

const Skills = () => (
    <div
        id="skills"
        className="relative min-h-screen flex flex-col justify-start pt-10 overflow-hidden"
    >
        {/* ── Decorative background ──────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full blur-3xl opacity-[0.04] dark:opacity-[0.07] bg-indigo-400" />
            <div className="absolute bottom-1/4 -left-16 w-72 h-72 rounded-full blur-3xl opacity-[0.04] dark:opacity-[0.06] bg-amber-400" />
        </div>

        <Heading title="Tech Stack" subtitle="Skills" />

        <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm text-zinc-500 dark:text-zinc-400 mb-10 max-w-xl"
        >
            Technologies and tools I work with across frontend, backend, infrastructure, and research.
        </motion.p>

        <div className="flex flex-col gap-10">
            {skillsCategories.map((cat, catIndex) => (
                <motion.div
                    key={cat.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: catIndex * 0.07 }}
                >
                    {/* Category label */}
                    <div className="flex items-center gap-3 mb-4">
                        <div
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ background: cat.color }}
                        />
                        <span
                            className="text-[11px] font-bold tracking-widest uppercase"
                            style={{ color: cat.color }}
                        >
                            {cat.label}
                        </span>
                        <div
                            className="flex-1 h-px"
                            style={{ background: `linear-gradient(to right, ${cat.color}40, transparent)` }}
                        />
                    </div>

                    {/* Skill pills */}
                    <div className="flex flex-wrap gap-2.5">
                        {cat.skills.map((skill, i) => (
                            <SkillPill
                                key={skill.name}
                                skill={skill}
                                color={cat.color}
                                index={catIndex * 6 + i}
                            />
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
)

export default Skills
