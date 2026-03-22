'use client'

import Heading from "./sub/Heading"
import Image from "next/image"
import { experienceData, arrowLeftIcon } from "@/assets"
import { motion, useScroll, useSpring } from "framer-motion"
import { useRef } from "react"

const Experience = () => {
    const date = new Date().getFullYear();

    const contaierRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: contaierRef,
        offset: ["start 90%", "end end"]
    });

    const scrollY = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 20,
    });

    return <div id="experience" className="relative py-20">
        <Heading title="Education & Work Experience" />
        <Image
            src="/education.png"
            alt="Experience and Education"
            width={400}
            height={400}
            className="absolute top-5 right-0 opacity-70 lg:block hidden"
        />
        <div ref={contaierRef} className="relative w-full h-full flex flex-col items-center justify-center lg:gap-y-10 gap-y-20 py-10">
            {experienceData.map((data, i) => (
                <div 
                    key={`id-${i}`} 
                    className={`xl:w-150 lg:w-120 w-full sm:px-12 px-0 relative -left-75 ${
                        i % 2 === 0
                            ? 'xl:-left-75 lg:-left-60 left-0'
                            : 'xl:left-75 lg:left-60 left-0'
                        }`}
                >
                    <motion.div 
                        initial={{opacity: 0, x: i % 2 === 0 ? -100 : 100}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once:true}}
                        transition={{duration: .7, type: 'spring', stiffness: 50}}
                        className="relative flex flex-col gap-y-3 rounded-md border border-red-300 bg-white p-4 tracking-wide sm:text-sm dark:bg-zinc-700 transition-colors z-20"
                    >
                        <h1 className="md:text-xl sm:text-lg font-semibold text-gray-700 dark:text-white">{data.title}</h1>
                        <p className="text-gray-800 dark:text-gray-100">
                            <span className="block font-semibold">{data.work ? 'Work:' : 'Education:'}</span>
                            <span className="block pl-2 font-extralight">{data.education}</span>
                        </p>
                        <div className="text-gray-800 dark:text-gray-200 transition-colors">
                            <span className="font-semibold">Experience:</span>
                            <ul className="pl-2">
                                {data.experience.map((exp, j) => (
                                    <li key={j} className="my-1 font-extralight">{exp}</li>
                                ))}
                            </ul>
                        </div>
                        <span className={`absolute top-20 text-red-300 -translate-y-1/2 lg:block hidden ${
                            i % 2 === 0 ? "left-full rotate-180" : "right-full"
                        }`}
                        >{arrowLeftIcon}</span>
                    </motion.div>
                    <div 
                        className={`w-14 absolute top-20 border border-gray-300 rounded-full aspect-square place-items-center text-red-400 font-light -translate-y-1/2 z-10 lg:grid hidden bg-white ${
                            i % 2 === 0
                            ? 'lg:left-full -translate-x-1/2 left-1/2'
                            : 'lg:right-full translate-x-1/2 right-1/2'
                        }`}
                    >
                        {data.year}
                    </div>
                </div>
            ))}
            <motion.div 
                initial={{scaleY: 0}}
                style={{scaleY: scrollY}}
                className="absolute w-1 h-full rounded-full bg-gray-300 origin-top"
            ></motion.div>
        </div>
    </div>
}

export default Experience