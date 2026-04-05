'use client';
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const colorOptions = [
    { label: "Quartz Pink", value: "pink",  hex: "#f9a8d4", path: "/services/shop/razer-kraken-kitty-pink.png" },
    { label: "Midnight",    value: "black", hex: "#1e1e2e", path: "/services/shop/razer-kraken-kitty-black.png" },
    { label: "Arctic White",value: "white", hex: "#e5e7eb", path: "/services/shop/razer-kraken-kitty-white.png" },
];

const StarIcon = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

const HeartIcon = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const TruckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
);

const OnlineShop = () => {
    const [selectedColor, setSelectedColor] = useState("pink");
    const [quantity, setQuantity]           = useState(1);
    const [wishlisted, setWishlisted]       = useState(false);
    const [cartState, setCartState]         = useState("idle"); // idle | adding | added

    const handleAddToCart = () => {
        if (cartState !== "idle") return;
        setCartState("adding");
        setTimeout(() => setCartState("added"), 600);
        setTimeout(() => setCartState("idle"), 2400);
    };

    return (
        <div
            className="w-full h-full flex flex-col overflow-hidden rounded-2xl"
            style={{ background: "linear-gradient(145deg, #0f0a1e 0%, #130d24 55%, #0a0f1e 100%)" }}
        >
            {/* Header breadcrumb */}
            <motion.div
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/8 shrink-0"
            >
                <div className="flex items-center gap-2">
                    <span className="text-white/20 text-xs">Home</span>
                    <span className="text-white/15 text-xs">/</span>
                    <span className="text-white/20 text-xs">Audio</span>
                    <span className="text-white/15 text-xs">/</span>
                    <span className="text-white/55 text-xs">Headsets</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/25 text-xs border border-white/8 rounded-lg px-3 py-1.5">
                    <CartIcon />
                    <span>{cartState === "added" ? quantity : 0} items</span>
                </div>
            </motion.div>

            {/* Main content */}
            <div className="flex-1 overflow-y-auto flex flex-col md:flex-row min-h-0">

                {/* Left — Product image */}
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="md:w-2/5 flex items-center justify-center p-8 relative shrink-0"
                >
                    {/* Ambient glow */}
                    <div
                        className="absolute w-52 h-52 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(ellipse, rgba(244,114,182,0.13) 0%, transparent 70%)" }}
                    />

                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10"
                    >
                        <Image
                            src={colorOptions.find(c => c.value === selectedColor)?.path || "/services/shop/headphone.png"}
                            alt="Razer Kraken Kitty Edition"
                            width={280}
                            height={280}
                            className="w-40 md:w-52 h-auto drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Discount badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.45, duration: 0.3 }}
                        className="absolute top-5 right-5 bg-rose-500 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                    >
                        −35%
                    </motion.div>
                </motion.div>

                {/* Right — Product details */}
                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    className="md:w-3/5 flex flex-col justify-center px-5 pb-6 md:pl-2 md:pr-7 md:py-6 gap-4"
                >
                    {/* Badge */}
                    <span className="w-fit bg-violet-500/20 text-violet-300 border border-violet-500/30 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full">
                        Featured Product
                    </span>

                    {/* Title */}
                    <div>
                        <h2 className="text-white font-semibold text-base md:text-lg leading-snug tracking-tight">
                            Razer Kraken Kitty Edition
                        </h2>
                        <p className="text-white/35 text-sm mt-0.5">Gaming Headset · Quartz</p>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-2">
                        <div className="flex text-amber-400 gap-0.5">
                            {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= 4} />)}
                        </div>
                        <span className="text-white/30 text-xs">4.0 · 128 reviews</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                        <span className="text-white font-bold text-2xl">$129.99</span>
                        <span className="text-white/25 text-sm line-through">$199.99</span>
                    </div>

                    {/* Color selector */}
                    <div>
                        <p className="text-white/30 text-xs mb-2 uppercase tracking-widest">
                            Color — <span className="text-white/55">{colorOptions.find(c => c.value === selectedColor)?.label}</span>
                        </p>
                        <div className="flex gap-2">
                            {colorOptions.map(color => (
                                <button
                                    key={color.value}
                                    onClick={() => setSelectedColor(color.value)}
                                    title={color.label}
                                    className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                                        selectedColor === color.value
                                            ? "border-white/60 scale-110"
                                            : "border-white/10 hover:border-white/30"
                                    }`}
                                    style={{ backgroundColor: color.hex }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div>
                        <p className="text-white/30 text-xs mb-2 uppercase tracking-widest">Quantity</p>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="w-7 h-7 rounded-lg bg-white/8 hover:bg-white/15 border border-white/10 text-white/60 transition-colors duration-150 flex items-center justify-center text-base leading-none"
                            >−</button>
                            <span className="text-white font-medium text-sm w-4 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => Math.min(10, q + 1))}
                                className="w-7 h-7 rounded-lg bg-white/8 hover:bg-white/15 border border-white/10 text-white/60 transition-colors duration-150 flex items-center justify-center text-base leading-none"
                            >+</button>
                            <span className="flex items-center gap-1.5 text-emerald-400 text-xs ml-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                                50+ in stock
                            </span>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleAddToCart}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                                cartState === "added"
                                    ? "bg-emerald-500 text-white scale-[0.98]"
                                    : cartState === "adding"
                                    ? "bg-violet-400 text-white"
                                    : "bg-violet-500 hover:bg-violet-400 active:scale-[0.97] text-white"
                            }`}
                        >
                            <AnimatePresence mode="wait">
                                {cartState === "added" ? (
                                    <motion.span key="done"
                                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                                        className="flex items-center gap-2"
                                    >
                                        ✓ Added to Cart
                                    </motion.span>
                                ) : (
                                    <motion.span key="add"
                                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                                        className="flex items-center gap-2"
                                    >
                                        <CartIcon /> Add to Cart
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>

                        <button
                            onClick={() => setWishlisted(w => !w)}
                            className={`w-11 flex items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 ${
                                wishlisted
                                    ? "bg-rose-500/20 border-rose-500/40 text-rose-400"
                                    : "bg-white/5 border-white/10 text-white/35 hover:text-white/60 hover:border-white/20"
                            }`}
                        >
                            <HeartIcon filled={wishlisted} />
                        </button>
                    </div>

                    {/* Trust badges */}
                    <div className="flex gap-5 pt-3 border-t border-white/8">
                        <span className="flex items-center gap-1.5 text-white/22 text-[11px]">
                            <TruckIcon /> Free shipping
                        </span>
                        <span className="flex items-center gap-1.5 text-white/22 text-[11px]">
                            <ShieldIcon /> 2-year warranty
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OnlineShop;