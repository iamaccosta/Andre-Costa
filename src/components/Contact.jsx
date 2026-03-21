'use client'

import { motion } from "framer-motion"
import Heading from "./sub/Heading"
import Image from "next/image"

const Contact = () => {
    return (
        <div 
            id="contact"
            className="lg:h-screen py-20 h-auto">
            <Heading title="Get in Touch" />
            <div className="w-full h-full my-auto flex lg:flex-row flex-col items-center lg:justify-between justify-center lg:gap-x-20 gap-x-0 gap-y-20">
                <motion.div
                    initial={{ opacity: 0, y: 150 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    <Image 
                        src="/contact.gif"
                        alt="Contact Image"
                        width={400}
                        height={400}
                        className="w-100 rounded-md opacity-80"
                    />
                </motion.div>
                <motion.form 
                    initial={{ opacity: 0, x: 150 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="lg:w-150 md:w-100 w-full flex flex-col gap-3"
                >
                    <div className="w-full flex lg:flex-row flex-col lg:gap-x-3 gap-y-3">
                        <input type="text" className="w-full border border-yellow-500 rounded-md bg-zinc-100 px-4 py-2 text-sm tracking-wider text-gray-500 outline-none" placeholder="Your Name" />
                        <input type="text" className="w-full border border-yellow-500 rounded-md bg-zinc-100 px-4 py-2 text-sm tracking-wider text-gray-500 outline-none" placeholder="Your Email" />
                    </div>
                    <input type="text" className="w-full border border-yellow-500 rounded-md bg-zinc-100 px-4 py-2 text-sm tracking-wider text-gray-500 outline-none" placeholder="Subject"/>
                    <textarea className="max-h-62.5 min-h-37.5 border border-yellow-500 rounded-md bg-zinc-100 px-4 py-2 text-sm tracking-wider text-gray-500 outline-none" placeholder="Write Me..."></textarea>
                    <input type="submit" className="w-full border border-yellow-700 rounded-md bg-yellow-600 font-light px-4 py-2 text-sm tracking-wider text-white outline-none hover:bg-yellow-500 transition-colors cursor-pointer" value="Send Message" />
                </motion.form>
            </div>
        </div>
    )
}

export default Contact