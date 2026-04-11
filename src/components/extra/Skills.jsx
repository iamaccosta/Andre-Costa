'use client';
import Heading from "../sub/Heading";
import Image from "next/image";
import { skillsData } from "@/assets";
import { motion } from "framer-motion";

const Skills = () => {
    const variants = {
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.3 + i * 0.05
            }
        }),
        hidden: {
            opacity: 0,
            y: 30
        }
    }

    return (
        <div 
            id="skills"
            className="min-h-screen flex flex-col items-center justify-center md:gap-y-20 gap-y-10">
            <Heading title="Skills" />
            <div className="w-full flex justify-between flex-wrap gap-x-8 gap-y-10 lg:gap-y-6">
                {skillsData.map((skill, index) => (
                    <motion.div
                        key={index} 
                        className="flex items-center justify-between gap-x-3 rounded-xl border border-yellow-500 bg-zinc-200 lg:px-5 py-2 px-2"
                        custom={index}
                        variants={variants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover={{scale: 1.1}}
                        viewport={{margin: "50px", once: true}}
                    >
                        <Image 
                            src={skill.icon} 
                            alt={skill.name} 
                            width={100} 
                            height={100}
                            className="h-auto w-10"
                        />
                        <p className="text-sm text-gray-600">{skill.name}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Skills;