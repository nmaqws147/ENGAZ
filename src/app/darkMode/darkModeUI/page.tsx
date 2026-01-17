'use client';
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import useDarkMode from "../darkModeLogic/page";

const DarkModeUI = () => {
    const {handleDarkMode,darkMode} = useDarkMode();

    return (
        <div className="flex items-center justify-center p-4">
            <motion.button
                layout
                onClick={handleDarkMode}
                className={`
                    relative w-16 h-9 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-500
                    ${darkMode ? "bg-slate-700 justify-end" : "bg-orange-100 justify-start"}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* الدائرة المتحركة (Switch Handle) */}
                <motion.div
                    layout
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                    }}
                    className={`
                        w-7 h-7 rounded-full shadow-md flex items-center justify-center overflow-hidden
                        ${darkMode ? "bg-slate-900" : "bg-white"}
                    `}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {darkMode ? (
                            <motion.div
                                key="moon"
                                initial={{ y: 20, opacity: 0, rotate: 40 }}
                                animate={{ y: 0, opacity: 1, rotate: 0 }}
                                exit={{ y: -20, opacity: 0, rotate: -40 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Moon size={16} className="text-blue-400 fill-blue-400" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sun"
                                initial={{ y: 20, opacity: 0, rotate: 40 }}
                                animate={{ y: 0, opacity: 1, rotate: 0 }}
                                exit={{ y: -20, opacity: 0, rotate: -40 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Sun size={16} className="text-orange-500 fill-orange-500" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* خلفية تجميلية خفيفة */}
                <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
                     <Sun size={10} className={`${darkMode ? 'opacity-20' : 'opacity-0'} text-white`} />
                     <Moon size={10} className={`${darkMode ? 'opacity-0' : 'opacity-20'} text-slate-500`} />
                </div>
            </motion.button>
        </div>
    );
};

export default DarkModeUI;