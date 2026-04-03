'use client'
import { motion } from "framer-motion";
import Image from "next/image";

const Gallery = () => {
    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            
            <div className="w-full px-24 py-2 absolute top-0 rounded-t-2xl bg-cyan-950 text-white">
                <motion.div
                    initial={{ x: 400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="w-full h-full flex items-center justify-between"
                >
                    <h1 className="text-xl lg:text-2xl font-lightlg:font-semibold">Your Gallery</h1>
                    <div className="flex flex-col items-center justify-center space-y-3 md:flex-row md:space-y-0 md:space-x-8  md:justify-end">
                        <div className="group/nav">
                            <a href="#">Vector</a>
                            <div className="mx-2 mt-1 duration-500 border-b-2 opacity-0 border-white group-hover/nav:opacity-100">
                            </div>
                        </div>
                        <div className="group/nav">
                            <a href="#">Illustrations</a>
                            <div className="mx-2 mt-1 duration-500 border-b-2 opacity-0 border-white group-hover/nav:opacity-100">
                            </div>
                        </div>
                        <div className="group/nav">
                            <a href="#">Images</a>
                            <div className="mx-2 mt-1 duration-500 border-b-2 opacity-0 border-white group-hover/nav:opacity-100">
                            </div>
                        </div>
                        <div className="group/nav">
                            <a href="#">Icons</a>
                            <div className="mx-2 mt-1 duration-500 border-b-2 opacity-0 border-white group-hover/nav:opacity-100">
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="bg-white p-6 m-3 space-y-10 shadow-2xl rounded-3xl md:p-40 md:m-0">
                <div className="flex flex-col justify-between space-y-5 md:flex-row md:space-y-0">
                    <div className="flex justify-between border-b">
                        <input type="text" className="ml-6 border-none md:w-80 placeholder:font-thin focus:outline-none" placeholder="Search" />
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 text-gray-300 duration-200 hover:scale-110"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="10" cy="10" r="7" />
                                <line x1="21" y1="21" x2="15" y2="15" />
                            </svg>
                        </button>
                    </div>
                    
                    <button className="py-3 px-14 text-lg font-normal text-white bg-black border-black rounded-md shadow-2xl duration-200 hover:bg-gray-800">
                        Upload
                    </button>
                </div>

                
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3">
                    <motion.div 
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="relative group/card">
                        <Image
                            src={'/services/gallery/image1.jpg'}
                            alt={'Gallery Image 1'}
                            width={400}
                            height={400}
                            className='h-auto w-72'
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-2 px-4 text-white duration-500 bg-black opacity-0 group-hover/card:opacity-100 bg-opacity-40">
                            <div className="flex justify-between w-full">
                                <div className="font-normal">
                                    <p className="text-sm">Abstract Painting</p>
                                    <p className="text-xs">245 likes - 35 shares</p>
                                </div>
                                <div className="flex items-center hover:scale-110">
                                    <Image
                                        src={'/services/gallery/bookmark.svg'}
                                        alt={'bookmark'}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    
                    <motion.div 
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay:0.2, duration: 0.5, ease: 'easeInOut' }}
                        className="relative group/card">
                        <Image
                            src={'/services/gallery/image2.jpg'}
                            alt={'Gallery Image 2'}
                            width={400}
                            height={400}
                            className='h-auto w-72'
                        />
                        <div
                        className="absolute bottom-0 left-0 right-0 p-2 px-4 text-white duration-500 bg-black opacity-0 group-hover/card:opacity-100 bg-opacity-40"
                        >
                            <div className="flex justify-between w-full">
                                <div className="font-normal">
                                <p className="text-sm">Abstract Painting</p>
                                <p className="text-xs">245 likes - 35 Shares</p>
                                </div>
                                <div className="flex items-center hover:scale-110">
                                <Image
                                    src={'/services/gallery/bookmark.svg'}
                                    alt={'bookmark'}
                                    width={24}
                                    height={24}
                                />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    
                    <motion.div 
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5, ease: 'easeInOut' }}
                        className="relative group/card">
                        <Image
                            src={'/services/gallery/image3.jpg'}
                            alt={'Gallery Image 3'}
                            width={400}
                            height={400}
                            className='h-auto w-72'
                        />
                        <div
                        className="absolute bottom-0 left-0 right-0 p-2 px-4 text-white duration-500 bg-black opacity-0 group-hover/card:opacity-100 bg-opacity-40"
                        >
                            <div className="flex justify-between w-full">
                                <div className="font-normal">
                                <p className="text-sm">Abstract Painting</p>
                                <p className="text-xs">245 likes - 35 Shares</p>
                                </div>
                                <div className="flex items-center hover:scale-110">
                                <Image
                                    src={'/services/gallery/bookmark.svg'}
                                    alt={'bookmark'}
                                    width={24}
                                    height={24}
                                />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    
                    <motion.div 
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5, ease: 'easeInOut' }}
                        className="relative group/card">
                        <Image
                            src={'/services/gallery/image4.jpg'}
                            alt={'Gallery Image 4'}
                            width={400}
                            height={400}
                            className='h-auto w-72'
                        />
                        <div
                        className="absolute bottom-0 left-0 right-0 p-2 px-4 text-white duration-500 bg-black opacity-0 group-hover/card:opacity-100 bg-opacity-40"
                        >
                            <div className="flex justify-between w-full">
                                <div className="font-normal">
                                <p className="text-sm">Abstract Painting</p>
                                <p className="text-xs">245 likes - 35 Shares</p>
                                </div>
                                <div className="flex items-center hover:scale-110">
                                <Image
                                    src={'/services/gallery/bookmark.svg'}
                                    alt={'bookmark'}
                                    width={24}
                                    height={24}
                                />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    
                    <motion.div 
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5, ease: 'easeInOut' }}
                        className="relative group/card">
                        <Image
                            src={'/services/gallery/image5.jpg'}
                            alt={'Gallery Image 5'}
                            width={400}
                            height={400}
                            className='h-auto w-72'
                        />
                        <div
                        className="absolute bottom-0 left-0 right-0 p-2 px-4 text-white duration-500 bg-black opacity-0 group-hover/card:opacity-100 bg-opacity-40"
                        >
                            <div className="flex justify-between w-full">
                                <div className="font-normal">
                                <p className="text-sm">Abstract Painting</p>
                                <p className="text-xs">245 likes - 35 Shares</p>
                                </div>
                                <div className="flex items-center hover:scale-110">
                                <Image
                                    src={'/services/gallery/bookmark.svg'}
                                    alt={'bookmark'}
                                    width={24}
                                    height={24}
                                />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    
                    <motion.div 
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5, ease: 'easeInOut' }}
                        className="relative group/card">
                        <Image
                            src={'/services/gallery/image6.jpg'}
                            alt={'Gallery Image 6'}
                            width={400}
                            height={400}
                            className='h-auto w-72'
                        />
                        <div
                        className="absolute bottom-0 left-0 right-0 p-2 px-4 text-white duration-500 bg-black opacity-0 group-hover/card:opacity-100 bg-opacity-40"
                        >
                            <div className="flex justify-between w-full">
                                <div className="font-normal">
                                <p className="text-sm">Abstract Painting</p>
                                <p className="text-xs">245 likes - 35 Shares</p>
                                </div>
                                <div className="flex items-center hover:scale-110">
                                <Image
                                    src={'/services/gallery/bookmark.svg'}
                                    alt={'bookmark'}
                                    width={24}
                                    height={24}
                                />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Gallery;