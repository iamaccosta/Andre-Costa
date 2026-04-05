'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const categories = ["All", "Vector", "Illustrations", "Images", "Icons"];

const galleryItems = [
    { id: 1, src: "/services/gallery/image1.jpg", title: "Abstract Painting", likes: 245, shares: 35, category: "Illustrations" },
    { id: 2, src: "/services/gallery/image2.jpg", title: "Geometric Form",    likes: 189, shares: 22, category: "Vector"        },
    { id: 3, src: "/services/gallery/image3.jpg", title: "Color Study",       likes: 312, shares: 48, category: "Images"        },
    { id: 4, src: "/services/gallery/image4.jpg", title: "Light & Shadow",    likes: 97,  shares: 14, category: "Images"        },
    { id: 5, src: "/services/gallery/image5.jpg", title: "UI Kit",            likes: 421, shares: 67, category: "Icons"         },
    { id: 6, src: "/services/gallery/image6.jpg", title: "Texture Series",    likes: 158, shares: 29, category: "Illustrations" },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
    hidden:  { opacity: 0, y: 28, scale: 0.97 },
    visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] } },
    exit:    { opacity: 0, scale: 0.95,         transition: { duration: 0.15 } },
};

const BookmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
);

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
);

const GalleryCard = ({ item }) => {
    const [bookmarked, setBookmarked] = useState(false);

    return (
        <motion.div variants={cardVariants} className="group relative overflow-hidden rounded-xl cursor-pointer">
            <div className="relative aspect-square overflow-hidden bg-cyan-950/40">
                <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/90 via-cyan-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card footer on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-white text-xs font-semibold leading-snug">{item.title}</p>
                            <div className="flex items-center gap-2.5 mt-1">
                                <span className="flex items-center gap-1 text-cyan-300/80 text-xs">
                                    <HeartIcon /> {item.likes}
                                </span>
                                <span className="flex items-center gap-1 text-cyan-300/80 text-xs">
                                    <ShareIcon /> {item.shares}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={e => { e.stopPropagation(); setBookmarked(b => !b); }}
                            className={`w-7 h-7 flex items-center justify-center rounded-full border transition-all duration-200 ${
                                bookmarked
                                    ? "bg-cyan-400 border-cyan-400 text-cyan-950"
                                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                            }`}
                        >
                            <BookmarkIcon />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");

    const filtered = galleryItems.filter(item => {
        const matchesCategory = activeCategory === "All" || item.category === activeCategory;
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div
            className="w-full h-full flex flex-col overflow-hidden rounded-2xl"
            style={{ background: "linear-gradient(145deg, #0a1628 0%, #0c1f3a 55%, #071220 100%)" }}
        >
            {/* Header */}
            <motion.div
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/8 flex-shrink-0 gap-3"
            >
                <div className="flex-shrink-0">
                    <h1 className="text-white text-lg font-semibold tracking-tight">Your Gallery</h1>
                    <p className="text-cyan-400/50 text-xs mt-0.5">{galleryItems.length} assets</p>
                </div>

                {/* Search */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 min-w-0 flex-1 max-w-40 focus-within:border-cyan-500/40 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 text-cyan-400/40 flex-shrink-0" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="bg-transparent text-white text-xs placeholder-white/20 focus:outline-none w-full"
                    />
                </div>

                {/* Upload */}
                <button className="flex items-center gap-1.5 px-3 py-2 bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-cyan-950 text-xs font-semibold rounded-lg transition-all duration-200 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" /><polyline points="5 12 12 5 19 12" />
                    </svg>
                    Upload
                </button>
            </motion.div>

            {/* Category pills */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12, duration: 0.3 }}
                className="flex items-center gap-1 px-5 py-3 flex-shrink-0"
            >
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`relative px-3 py-1.5 text-xs rounded-full font-medium transition-colors duration-200 ${
                            activeCategory === cat ? "text-cyan-950" : "text-white/40 hover:text-white/70"
                        }`}
                    >
                        {activeCategory === cat && (
                            <motion.div
                                layoutId="categoryPill"
                                className="absolute inset-0 bg-cyan-400 rounded-full"
                                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                            />
                        )}
                        <span className="relative z-10">{cat}</span>
                    </button>
                ))}
            </motion.div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto px-5 pb-5">
                <AnimatePresence mode="wait">
                    {filtered.length > 0 ? (
                        <motion.div
                            key={activeCategory + search}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, transition: { duration: 0.12 } }}
                            className="grid grid-cols-2 md:grid-cols-3 gap-3"
                        >
                            {filtered.map(item => (
                                <GalleryCard key={item.id} item={item} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center h-40 text-white/20"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                            <p className="text-sm mt-3">No assets found</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Gallery;