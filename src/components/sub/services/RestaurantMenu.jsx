'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuData = {
    Starters: [
        {
            name: "Burrata & Heirloom Tomato",
            description: "Creamy burrata, vine-ripened heirloom tomatoes, aged balsamic, fresh basil oil",
            price: "18",
            tag: "Chef's Pick",
        },
        {
            name: "Seared Scallops",
            description: "Pan-seared diver scallops, cauliflower purée, crispy capers, lemon beurre blanc",
            price: "24",
            tag: null,
        },
        {
            name: "Foie Gras Torchon",
            description: "House-cured foie gras, brioche toast, fig compote, Maldon sea salt",
            price: "32",
            tag: "Seasonal",
        },
        {
            name: "Wild Mushroom Velouté",
            description: "Truffle-infused mushroom broth, crème fraîche, chives, sourdough croutons",
            price: "16",
            tag: null,
        },
    ],
    Mains: [
        {
            name: "Dry-Aged Ribeye",
            description: "28-day dry-aged prime ribeye, bone marrow butter, roasted garlic jus, watercress",
            price: "68",
            tag: "Signature",
        },
        {
            name: "Butter-Poached Lobster",
            description: "Maine lobster tail, saffron risotto, tarragon emulsion, micro herbs",
            price: "74",
            tag: null,
        },
        {
            name: "Roasted Duck Breast",
            description: "Magret duck breast, cherry & port reduction, celery root purée, crispy confit leg",
            price: "52",
            tag: "Chef's Pick",
        },
        {
            name: "Black Truffle Gnocchi",
            description: "Hand-rolled potato gnocchi, Périgord truffle, aged Parmesan, toasted pine nuts",
            price: "44",
            tag: "Vegetarian",
        },
    ],
    Desserts: [
        {
            name: "Valrhona Chocolate Fondant",
            description: "Warm 70% dark chocolate heart, Tahitian vanilla ice cream, cocoa soil",
            price: "16",
            tag: "Signature",
        },
        {
            name: "Tarte Tatin",
            description: "Caramelised apple tart, calvados crème anglaise, candied walnut",
            price: "14",
            tag: null,
        },
        {
            name: "Crème Brûlée",
            description: "Classic Madagascan vanilla custard, caramelised sugar crust, shortbread",
            price: "12",
            tag: null,
        },
        {
            name: "Cheese Selection",
            description: "Three artisan cheeses, honeycomb, quince paste, artisanal crackers",
            price: "22",
            tag: "Seasonal",
        },
    ],
};

const tagColors = {
    "Chef's Pick": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Seasonal: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Signature: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    Vegetarian: "bg-lime-500/20 text-lime-400 border-lime-500/30",
};

const categories = Object.keys(menuData);

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
    exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
};

const MenuItem = ({ item }) => (
    <motion.div
        variants={itemVariants}
        className="group relative flex items-start justify-between gap-6 py-6 border-b border-white/8 last:border-0"
    >
        {/* Hover accent line */}
        <div className="absolute left-0 top-0 h-full w-0.5 bg-amber-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-full" />

        <div className="flex-1 pl-4">
            <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                <span
                    className="font-serif text-lg text-stone-100 group-hover:text-amber-300 transition-colors duration-200 tracking-wide"
                    style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                    {item.name}
                </span>
                {item.tag && (
                    <span className={`text-[10px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-full border ${tagColors[item.tag]}`}>
                        {item.tag}
                    </span>
                )}
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
                {item.description}
            </p>
        </div>

        <div className="shrink-0 text-right pt-0.5">
            <span
                className="text-amber-400 font-light text-lg tracking-wider"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
                ${item.price}
            </span>
        </div>
    </motion.div>
);

const RestaurantMenu = () => {
    const [activeCategory, setActiveCategory] = useState("Starters");

    return (
        <div
            className="w-full h-full flex flex-col overflow-hidden rounded-2xl relative"
            style={{
                background: "linear-gradient(160deg, #1a1410 0%, #0f0d0a 50%, #13100c 100%)",
            }}
        >
            {/* Grain texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Ambient top glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(217,119,6,0.12) 0%, transparent 70%)" }}
            />

            {/* Header */}
            <div className="relative z-10 flex flex-col items-center pt-8 pb-5 px-6">
                <p className="text-amber-500/70 text-[10px] tracking-[0.35em] uppercase mb-2">
                    Est. 2019 · Fine Dining
                </p>
                <h1
                    className="text-stone-100 text-4xl md:text-5xl text-center leading-none mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, letterSpacing: "0.02em" }}
                >
                    Le Menu
                </h1>
                <div className="flex items-center gap-3 mt-3">
                    <div className="h-px w-16 bg-linear-to-r from-transparent to-amber-600/60" />
                    <span className="text-amber-600/80 text-xs">✦</span>
                    <div className="h-px w-16 bg-linear-to-l from-transparent to-amber-600/60" />
                </div>
            </div>

            {/* Category Tabs */}
            <div className="relative z-10 flex items-center justify-center gap-1 px-6 mb-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className="relative px-4 py-2 text-xs tracking-widest uppercase transition-colors duration-200"
                    >
                        <span className={activeCategory === cat ? "text-amber-400" : "text-stone-500 hover:text-stone-300"}>
                            {cat}
                        </span>
                        {activeCategory === cat && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-px bg-amber-400"
                                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-white/8 mb-1" />

            {/* Menu Items */}
            <div className="relative z-10 flex-1 overflow-y-auto px-6 py-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {menuData[activeCategory].map((item) => (
                            <MenuItem key={item.name} item={item} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-center py-4 border-t border-white/8">
                <span className="text-stone-600 text-[10px] tracking-widest uppercase">
                    All prices in USD · Gratuity not included
                </span>
            </div>
        </div>
    );
};

export default RestaurantMenu;