'use client'

import { motion } from 'framer-motion'
import Heading from './sub/Heading'
import Question from './sub/Question'
import { questions } from '@/assets'

// ─── Component ────────────────────────────────────────────────────────────────

const Questions = () => (
    <div
        id="questions"
        className="relative min-h-screen flex flex-col justify-center py-24 overflow-hidden"
    >
        {/* ── Decorative background ──────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/4 -right-16 w-72 h-72 rounded-full blur-3xl opacity-[0.04] dark:opacity-[0.07] bg-amber-400" />
            <div className="absolute bottom-1/4 -left-20 w-64 h-64 rounded-full blur-3xl opacity-[0.04] dark:opacity-[0.06] bg-red-400" />
        </div>

        {/* ── Section heading ────────────────────────────────────────── */}
        <Heading title="Questions & Answers" subtitle="FAQ" />

        {/* ── Intro line ─────────────────────────────────────────────── */}
        <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 max-w-xl"
        >
            Common questions about working with me — from project scoping to timelines and communication.
        </motion.p>

        {/* ── Accordion list ─────────────────────────────────────────── */}
        <ul className="flex flex-col gap-3">
            {questions.map((question, index) => (
                <Question key={index} question_data={question} index={index} />
            ))}
        </ul>
    </div>
)

export default Questions
