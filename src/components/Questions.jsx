'use client';
import { motion } from 'framer-motion';
import Heading from "./sub/Heading"
import Question from './sub/Question';
import { questions } from '@/assets'

const Questions = () => {
    return (
        <div 
            id="questions"
            className='py-20 '>
            <Heading title="Questions & Answers" />
            <div >
                <ul className='flex flex-col gap-y-3'>
                    {questions.map((question, index) => (
                        <motion.div
                            key={index}
                        >
                            <Question question_data={question} index={index} />
                        </motion.div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Questions;