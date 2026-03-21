'use client'
import { useState } from 'react';
import { questionArrow } from '@/assets';
import { motion } from 'framer-motion';

const Question = ({question_data, index}) => {
    const [clicked, setClicked] = useState(false);

    const variants = {
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.4
            }
        }),
        hidden: { opacity: 0.7, x: 50 }
    }

    return (
        <motion.li 
            variants={variants}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ margin:'50px', once: true }}
            className="border border-yellow-500 p-1 rounded-lg">
            <h1 
                className={`flex items-center text-xl font-extralight text-gray-800 dark:text-white transition-colors dark:hover:text-yellow-600 tracking-wide cursor-pointer hover:text-yellow-600 ${clicked ? 'border-b text-yellow-600' : ''}`}
                onClick={() => 
                    setClicked(!clicked)
                }    
            >
                <motion.span 
                    animate={{ rotate: clicked ? 0 : -90 }}
                    transition={{ duration: 0.1}}
                >{questionArrow}
                </motion.span>
                <span>{question_data.question}</span>
            </h1>
            {
                clicked && 
                <motion.p 
                    initial={{ scaleY: 0, opacity: 0, height: 0 }}
                    animate={{ scaleY: clicked ? 1 : 0, opacity: clicked ? 1 : 0, height: clicked ? 'auto' : 0 }}
                    transition={{ 
                        duration: 0.1, 
                        type: "spring", 
                        stiffness: clicked ? 250 : 50, 
                        opacity: { delay: clicked ? 0.2: 0 }
                    }}
                    className="box-border origin-top pl-8 text-lg font-extralight tracking-wide text-gray-900 first-letter:pl-3 dark:text-gray-200 transition-colors">
                    {question_data.answer}
                </motion.p>
            }
        </motion.li>
    )
}

export default Question