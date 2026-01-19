'use client';
import { FaBrain, FaCloudRain, FaPlay, FaWater, FaWind, FaPause, FaUndo } from "react-icons/fa";
import { useFocus } from "./focusModeLogic/page";
import { motion } from "framer-motion"; 

const FocusPage = () => {
    const { focusSounds, rainSoundOn, wavesSoundOn, windSoundOn, startSessionHandler, startSession, formatTime, seconds, resetSession } = useFocus();

    return (
        <div className=" bg-slate-50 dark:bg-gray-900"> 
            <div className="flex p-5 font-sans justify-center items-center">
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 100, 
                        damping: 15,
                        duration: 0.8 
                    }}
                    className="flex flex-col items-center justify-center bg-linear-to-tr from-[#6366f1] via-[#8b5cf6] to-[#a855f7] rounded-[2.5rem] shadow-[0_20px_50px_rgba(99,102,241,0.3)]  md:min-w-[500px] py-10 px-15 text-white text-center relative overflow-hidden"
                > 
                    <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

                    <motion.div 
                        className="absolute right-8 top-8"
                        whileHover={{ rotate: -180, scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={resetSession}
                    >
                        <FaUndo className="text-xl cursor-pointer opacity-70 hover:opacity-100 transition-opacity"/>
                    </motion.div>

                    <motion.div 
                        animate={{ 
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                        className="flex justify-center p-5 bg-white/10 backdrop-blur-md rounded-3xl shadow-xl mb-4"
                    >
                        <FaBrain className="text-6xl text-white" />
                    </motion.div>
                    
                    <h2 className="text-3xl font-bold mb-2 tracking-tight">Enter Focus Mode</h2>
                    <p className="text-indigo-100 font-medium text-sm mb-10 opacity-90">
                        distraction-free environment with ambient sounds
                    </p>

                    <div className="text-7xl font-mono font-black mb-10 tracking-tighter drop-shadow-md">
                        <span>{formatTime(seconds)}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 w-full mb-10">
                        {[
                            { id: "rain", icon: <FaCloudRain />, label: "Rain", active: rainSoundOn },
                            { id: "waves", icon: <FaWater />, label: "Waves", active: wavesSoundOn },
                            { id: "wind", icon: <FaWind />, label: "Wind", active: windSoundOn }
                        ].map((btn) => (
                            <motion.button 
                                key={btn.id}
                                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                className={`${btn.active ? 'bg-white text-indigo-600 shadow-lg ring-4 ring-white/20' : 'bg-white/20 text-white'} p-4 cursor-pointer w-full h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 font-bold border border-white/10`}
                                onClick={() => focusSounds(btn.id)}
                            >
                                <span className="text-xl">{btn.icon}</span>
                                <span className="text-xs uppercase tracking-widest">{btn.label}</span>
                                {btn.active && (
                                    <motion.div layoutId="activeGlow" className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse" />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-3 bg-white text-indigo-600 px-12 py-4 rounded-2xl cursor-pointer font-black text-lg hover:bg-gray-50 transition-all shadow-xl border-b-4 border-indigo-200"
                        onClick={startSessionHandler}
                    >
                        {startSession ? <FaPause className="text-sm" /> : <FaPlay className="text-sm" />}
                        {startSession ? "PAUSE SESSION" : "START FOCUS"}
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}

export default FocusPage;