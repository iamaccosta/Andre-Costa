'use client'

import { sunIcon, moonIcon } from "@/assets"
import { useEffect, useRef, useState } from "react"
import { reactLocalStorage } from "reactjs-localstorage"
import { motion, AnimatePresence } from "framer-motion"

const Toggle = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(false)
    const mainRef = useRef(null)

    const addDarkTheme = () => {
        mainRef.current.classList.add("dark")
        setDarkTheme(true)
    }

    const removeDarkTheme = () => {
        mainRef.current.classList.remove("dark")
        setDarkTheme(false)
    }

    useEffect(() => {
        const stored    = reactLocalStorage.get("darkTheme")
        const storedVal = stored !== undefined && JSON.parse(stored)
        const systemDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches

        if (stored === undefined) {
            systemDark ? addDarkTheme() : removeDarkTheme()
        } else {
            storedVal ? addDarkTheme() : removeDarkTheme()
        }
    }, [])

    const toggle = () => {
        if (darkTheme) {
            reactLocalStorage.set("darkTheme", false)
            removeDarkTheme()
        } else {
            reactLocalStorage.set("darkTheme", true)
            addDarkTheme()
        }
    }

    return (
        <main ref={mainRef}>
            <div className="bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
                <div className="xl:max-w-300 w-full mx-auto flex justify-center sm:px-30 pl-20 pr-5 overflow-hidden">

                    {/* ── Dark mode toggle ───────────────────────────────── */}
                    <motion.button
                        onClick={toggle}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Toggle dark mode"
                        className="fixed sm:right-8 right-5 top-8 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-md hover:border-amber-400/60 dark:hover:border-amber-500/50 transition-colors duration-200 cursor-pointer"
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={darkTheme ? "sun" : "moon"}
                                initial={{ rotate: -40, opacity: 0, scale: 0.6 }}
                                animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                                exit={{    rotate:  40, opacity: 0, scale: 0.6 }}
                                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                className="text-xl text-amber-500"
                            >
                                {darkTheme ? sunIcon : moonIcon}
                            </motion.span>
                        </AnimatePresence>
                    </motion.button>

                    {children}
                </div>
            </div>
        </main>
    )
}

export default Toggle
