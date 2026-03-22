'use client'
import Image from "next/image";
import { heroIcons } from "@/assets";
import { useMotionValue, useTransform, motion, useSpring } from "framer-motion";
import { useState } from "react";

const Hero = () => {
    const [windowOffset, setWindowOffset] = useState({ innerWidth: 0, innerHeight: 0 });
    const [mouseMove, setMouseMove] = useState(false);
    const [buttonHover, setButtonHover] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (event) => {
        const {clientX, clientY} = event;
        x.set(clientX);
        y.set(clientY);
    }

    const handleMouseEnter = () => {
        setWindowOffset({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
        setMouseMove(true);
    }

    const {innerWidth, innerHeight} = windowOffset;

    const xSpring = useSpring(x, { stiffness: 100, damping: 10 });
    const ySpring = useSpring(y, { stiffness: 100, damping: 10 });

    const rotateY = useTransform(xSpring, [0, innerWidth], [-30, 30]);
    const rotateX = useTransform(ySpring, [0, innerHeight], [30, -30]);

    return (
        <div 
            id="home"
            className="h-screen grid place-items-center px-5 sm:p-0" 
            onMouseMove={handleMouseMove} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setMouseMove(false)}
            >
            <div>
                <motion.div 
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className='flex flex-col items-center justify-center gap-y-3 font-light capitalize'>
                    <motion.div 
                        className='relative flex items-center justify-center' 
                        style={{rotateX: mouseMove ? rotateX: 0, rotateY: mouseMove ? rotateY : 0, transition: '0.1s'}}>
                        <Image 
                            src={'/person.png'} 
                            alt={'Person Image'} 
                            width={400} 
                            height={400} 
                            priority={true} 
                            className='h-auto w-37.5'

                        />
                        <motion.span 
                            className='absolute text-3xl font-semibold text-white'
                            initial={{ scale: 0 }}
                            animate={{
                                opacity: buttonHover ? 0 : 1, 
                                scale: buttonHover ? 2 : 0, 
                                y: buttonHover ? -40 : 0
                            }}
                            transition={{opacity: { delay: 0.4 }}}
                        >Hi👋</motion.span>
                    </motion.div>
                    <h1 className='text-center md:text-3xl font-bold tracking-wider text-gray-500 text-2xl dark:text-white transition-colors'
                    >Eng. André C. Costa</h1>
                    <p className='text-lg tracking-wider text-gray-700 dark:text-gray-200 transition-colors'><b><i>One day of doing things is more worth than one month of planning them 😁</i></b></p>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-x-6 mt-6 text-yellow-600 sm:text-2xl">
                    {heroIcons.map((icon, index) => (
                        <a href={icon.link} key={index} className="hover:bg-red-400 hover:text-white rounded-full">{icon.icon}</a>
                    ))}
                    
                </motion.div>
                <motion.a 
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    href="#contact" 
                    className='mx-auto mt-7 block w-max rounded-lg bg-red-400 px-3 py-1 font-light capitalize tracking-wider text-white hover:bg-red-500 transition-colors'
                    onMouseEnter={() => setButtonHover(true)}
                    onMouseLeave={() => setButtonHover(false)}
                >Send me a Message</motion.a>
            </div>
        </div>
    )
}

export default Hero;