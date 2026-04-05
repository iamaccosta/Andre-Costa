'use client';
import { useEffect, useMemo, useState, useCallback } from "react";
import Heading from "./sub/Heading";
import OnlineShop from "./sub/services/OnlineShop";
import Portfolio from "./sub/services/Portfolio";
import Gallery from "./sub/services/Gallery";
import { arrowIcons } from "@/assets";
import RestaurantMenu from "./sub/services/RestaurantMenu";
import BusinessWebsite from "./sub/services/BusinessWebsite";

const Services = () => {
    const [indexService, setIndexService] = useState(0);

    const services = useMemo(() => [
        <Portfolio key="portfolio" />,
        <Gallery key="gallery" />,
        <OnlineShop key="shop" />,
        <RestaurantMenu key="menu" />,
        <BusinessWebsite key="business" />,
    ], []);

    const prev = useCallback(() =>
        setIndexService(i => (i === 0 ? services.length - 1 : i - 1)),
    [services.length]);

    const next = useCallback(() =>
        setIndexService(i => (i === services.length - 1 ? 0 : i + 1)),
    [services.length]);

    useEffect(() => {
        const id = setInterval(next, 50000);
        return () => clearInterval(id);
    }, [next]);

    return (
        <div id="services" className="min-h-screen py-20 flex flex-col items-center justify-start gap-y-10">
            <Heading title="What I Can Do For You" />
            <div className="relative group border-2 border-yellow-800 rounded-2xl">
                <div className="lg:w-250 md:w-200 sm:w-[95%] w-70 lg:h-150 md:h-125 sm:h-115 h-150 flex items-center justify-center overflow-hidden rounded-2xl">
                    {services[indexService]}
                </div>
            </div>
            <div className="flex items-center justify-center space-x-1">
                {services.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setIndexService(index)}
                        className={`w-4 h-4 border-2 rounded-full border-yellow-800 transition-colors duration-200 cursor-pointer ${indexService === index ? 'bg-yellow-500' : 'bg-zinc-800'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Services;