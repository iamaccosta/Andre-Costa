'use client'
import Image from "next/image"
import { useState } from "react";
import { motion } from "framer-motion"

const Project = ({ index, ...project }) => {
    const [show, setShow] = useState(false);

    return (
        <motion.div 
            initial={{ opacity: 0, y: index % 2 === 0 ? 100 : -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{once: true}}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="relative sm:w-87.5 w-full h-max border border-yellow-400 rounded-lg cursor-pointer" 
            onClick={() => setShow(!show)}
        >
            <Image
                src={project.url}
                alt={project.name}
                width={400}
                height={400}
                className="rounded-lg opacity-70"
            />
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: show ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 w-full h-full flex flex-col items-center justify-center gap-y-2 bg-white/95 p-6 rounded-lg dark:bg-zinc-700 transition-colors opacity-95"
            >
                <h2 className="text-lg font-bold tracking-wide text-gray-500 dark:text-white">{project.name}</h2>
                <p className="text-justify text-gray-500 first-letter:pl-2 dark:text-gray-100">{project.desc}</p>
            </motion.div>       
        </motion.div>
    )
}

export default Project