'use client';
import Heading from "./sub/Heading";
import OnlineShop from "./sub/services/OnlineShop";
import Portfolio from "./sub/services/Portfolio";
import { useEffect, useState } from "react";
import { arrowIcons } from "@/assets";
import Gallery from "./sub/services/Gallery";


const Services = () => {
    const [indexService, setIndexService] = useState(1);
    const services = [
        <Portfolio key="portfolio" />,
        <Gallery key="gallery" />,
        <OnlineShop key="shop" />,
    ];

    useEffect(() => {
        const maxIndex = services.length - 1;

        const intervalId = setInterval(() => {
            setIndexService((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 200000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div 
            id="services"
            className="min-h-screen py-20 flex flex-col items-center justify-start gap-y-10">
            <Heading title="What I Can Do For You" />
            <div className="relative group border-2 border-yellow-800 rounded-2xl">
                <div className="lg:w-250 md:w-200 sm:w-[95%] w-70 lg:h-150 md:h-125 sm:h-115 h-150 flex items-center justify-center overflow-hidden rounded-2xl">
                    {services[indexService]}
                </div>
                <div className="z-20 opacity-0 group-hover:opacity-60 w-20 h-full absolute top-0 left-0 rounded-l-2xl bg-zinc-900 transition-opacity duration-300 text-white flex items-center justify-center text-sm">
                    <span className="w-10 h-10 flex items-center justify-center border-2 rounded-full text-white hover:scale-115 transition-all duration-200 cursor-pointer" onClick={() => setIndexService(indexService === 0 ? services.length - 1 : indexService - 1)}>{arrowIcons[0]}</span>
                </div>
                <div className="z-20 opacity-0  group-hover:opacity-60 w-20 h-full absolute top-0 right-0 rounded-r-2xl bg-zinc-900 transition-opacity duration-200 text-white flex items-center justify-center text-sm">
                    <span className="w-10 h-10 flex items-center justify-center border-2 rounded-full text-white hover:scale-115 transition-all duration-200 cursor-pointer" onClick={() => setIndexService(indexService === services.length - 1 ? 0 : indexService + 1)}>{arrowIcons[1]}</span>
                </div>
            </div>
            <div className="flex items-center justify-center space-x-1">
                {services.map((_, index) => (
                    <button key={index} className={`w-4 h-4 ${indexService === index ? 'bg-yellow-500' : 'bg-zinc-800'} border-2 rounded-full border-yellow-800 cursor-pointer`} onClick={() => setIndexService(index)}></button>
                ))}
            </div>
        </div>
    )
}

export default Services