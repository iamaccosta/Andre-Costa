'use client'
import { animate, motion } from "framer-motion"
import Heading from "./sub/Heading"
import Project from "./sub/Project"
import { projectDomains, projectsData } from "@/assets"
import { useEffect, useRef, useState } from "react"

const Projects = () => {
    const [domain, setDomain] = useState("All");
    const [index, setIndex] = useState(0);
    const prevIndex = useRef(0);
    const buttonsRef = useRef([]);

    const handleClick = () => {
        animate(buttonsRef.current[prevIndex.current], { opacity: 0.5, scale: 1 });
        animate(buttonsRef.current[index], { opacity: 1, scale: 1.2 });
    }

    useEffect(() => {
        handleClick();
        prevIndex.current = index;
    }, [index])

    return (
        <div 
            id="projects"
            className="min-h-screen py-20">
            <Heading title={"Projects"} />
            <div className="flex flex-wrap items-center justify-between gap-4 py-10">
                { projectDomains.map((text, i) => (
                    <motion.button 
                        key={i}
                        initial={{ opacity: i === 0 ? 1 : 0.5, scale: i === 0 ? 1.2 : 1 }}
                        className="border border-yellow-500 rounded-xl px-2 py-1 text-sm font-light tracking-wider text-gray-400 cursor-pointer"
                        onClick={() => {
                            setIndex(i);
                            setDomain(text)
                        }}
                        ref={(el) => buttonsRef.current.push(el)}
                    >{text}</motion.button>
                ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5">
                { projectsData.filter((project) => {
                    return domain === "All" ? true : project.domain === domain
                })
                .map((project, i) => (
                    <motion.div 
                        key={`id-${i}`}
                        layout
                    >
                        <Project index={i} {...project} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Projects