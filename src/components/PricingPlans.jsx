'use client'

import Heading from "./sub/Heading"
import { pricingPlans, checkIcon } from "@/assets"
import { motion } from "framer-motion"

const PricingPlans = () => {
    return (
        <div 
            id="pricing"
            className="py-20">
            <Heading title="Pricing Plans" />
            <div className="h-full flex lg:flex-row flex-col items-center justify-beetween gap-8">
                { pricingPlans.map((plan, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 200 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{scale: 1.05}}
                        transition={{ duration: 0.5, delay: i * 0.2, scale: { duration: 0.15 } }}
                        key={i}
                        className={`w-67.5 flex flex-col gap-y-6 p-6 border border-red-400 rounded-xl text-gray-600 transition-colors ${
                            i === 1 ? "lg:w-92.5 md:w-[320px] bg-white dark:bg-zinc-600" : "lg:w-87.5 md:w-75 bg-zinc-50 dark:bg-zinc-700"
                        }`}
                    >
                        <h1 className="lg:text-3xl text-lg font-light tracking-wide text-center dark:text-white">{plan.title}</h1>
                        <span className="lg:text-2xl text-xl text-center dark:text-white">{plan.pricing}</span>
                        <ul className="flex flex-col gap-y-2">
                            { plan.features.map((feature, j) => (
                                <div 
                                    key={j}
                                    className="flex items-center gap-x-3"
                                >
                                    <span className={`text-2xl ${
                                        i === 1 ? "text-red-300" : "text-yellow-500"
                                    }`}>{checkIcon}</span>
                                    <li className="text-[15px] font-light tracking-wide dark:text-white">{feature}</li>
                                </div>    
                            ))}  
                        </ul>
                        <p className="text-sm font-light text-center dark:text-gray-200">Ideal for:<span className="font-semibold"> {plan.recommended}</span></p>            
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default PricingPlans