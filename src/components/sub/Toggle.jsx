'use client'
import { sunIcon, moonIcon } from "@/assets";
import { useEffect, useRef, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { motion } from "framer-motion";

const Toggle = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(false);
    const mainRef = useRef(null);

    const addDarkTheme = () => {
        mainRef.current.classList.add("dark");
        setDarkTheme(true);
    }

    const removeDarkTheme = () => {
        mainRef.current.classList.remove("dark");
        setDarkTheme(false);
    }

    useEffect(() => {
        const darkTheme = reactLocalStorage.get("darkTheme");
        const darkThemeParsed = darkTheme !== undefined && JSON.parse(darkTheme);

        const systemTheme = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
        
        if(darkTheme === undefined) {
            systemTheme ? addDarkTheme() : removeDarkTheme();
        } else {
            darkThemeParsed ? addDarkTheme() : removeDarkTheme();
        }
    }, []);
    return (
        <main ref={mainRef}>
            <div className="bg-zinc-50 dark:bg-zinc-800">
                <div className="xl:max-w-300 w-full mx-auto flex justify-center sm:px-30 pl-20 pr-5 overflow-hidden">
                    <button 
                        className="fixed sm:right-14 right-10 top-10 text-yellow-600 hover:text-yellow-500 hover:cursor-pointer"
                        onClick={() => {
                            if(darkTheme) {
                                reactLocalStorage.set("darkTheme", false);
                                removeDarkTheme();
                            } else {
                                reactLocalStorage.set("darkTheme", true);
                                addDarkTheme();
                            }
                        }}
                    >
                        <motion.span 
                            animate={{
                                scale: darkTheme ? 0 : 1,
                            }}
                            className="absolute block rounded-full p-1 text-4xl z-40"
                        >{moonIcon}
                        </motion.span>
                        <motion.span
                            animate={{
                                scale: darkTheme ? 1 : 0,
                            }} 
                            className="absolute block rounded-full p-1 text-4xl z-40"
                        >{sunIcon}
                        </motion.span>
                    </button>
                    {children}
                </div>
            </div>
        </main>
    );
};

export default Toggle;  