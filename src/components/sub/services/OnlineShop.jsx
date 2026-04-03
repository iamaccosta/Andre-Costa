'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { storeIcon } from "@/assets";

const OnlineShop = () => {
  return (
    <div 
        className="relative w-full h-full flex flex-col items-center justify-center bg-slate-100">
        <div className="absolute z-10 top-0 w-full bg-gray-800 h-15 text-white text-xl md:text-2xl font-semibold">
            <motion.div
                initial={{ x: -400 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-full h-full flex items-center justify-center space-x-2"
            >
                <h1>Your Online Shop</h1>
                {storeIcon} 
            </motion.div>              
        </div>
        <motion.div 
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full flex items-center justify-center h-auto">
            <div className="flex flex-col p-3 m-3 space-y-10 bg-white rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:mt-10 md:p-6">
                <motion.div
                    initial={{ y: -5 }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ delay: 0.5, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <Image
                        src={'/services/shop/headphone.png'}
                        alt={'Headphone'}
                        width={400}
                        height={400}
                        className='h-auto w-40 mx-auto'
                    />
                </motion.div>

                <div className="flex flex-col">
                    <div className="flex flex-col space-y-2 text-center md:text-left">
                        <span className="mb-2 w-max self-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 md:self-start">
                            Featured Product
                        </span>
                        <div className="max-w-sm text-lg font-medium">
                            Razer Kraken Kitty Edt Gaming Headset Quartz
                        </div>

                        <div className="flex-col mb-4 space-y-3 text-center md:text-left">
                            <p className="text-sm line-through">$199.99</p>
                            <p className="text-xl font-bold">$129.99</p>
                            <p className="text-xs font-light text-gray-400">
                                In stock and ready to ship!
                            </p>
                        </div>

                        <div className="group">
                            <button className="w-full bg-blue-700 text-white border-b-8 border-b-blue-700 rounded-lg group-hover:bg-blue-700 group-hover:border-t-blue-700 group-hover:shadow-lg duration-500 transition-all">
                                <div className="px-6 py-3 bg-blue-500 rounded-lg group-hover:bg-blue-700 duration-150 text-md group-hover:translate-y-1 transition-all">
                                    Add to Cart
                                </div>
                            </button>
                        </div>

                        <div className="flex items-center space-x-3 group">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping">
                            </div>
                            <div className="text-sm">50+ pcs. in stock</div>
                        </div>

                        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-4 md:flex-row">
                            <button className="flex items-center justify-center py-3 px-5 space-x-3 border-2 border-gray-300 rounded-lg shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150">
                                <Image 
                                    src={'/services/shop/heart.png'} 
                                    alt={'Heart'} 
                                    width={8} 
                                    height={8} 
                                    className='h-auto w-8'
                                />
                                <span>Add to wishlist</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
    )
}

export default OnlineShop;