'use client';
import { usePrayer } from "../PrayerTimeLogic/page";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const PrayerTimesPage = () => {
    const { prayerCards, Fajr, Dhuhr, Asr, Isha } = usePrayer();

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 max-w-5xl mx-auto space-y-8"
        >
            {/* شبكة مواقيت الصلاة بتأثير Hover متطور */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {prayerCards.map((pray, index) => {
                    if (pray.name === "Isha") return null;
                    return (
                        <motion.div
                            key={pray.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ 
                                y: -10, 
                                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" 
                            }}
                            className={`p-6 rounded-2xl text-white relative overflow-hidden group cursor-pointer ${
                                pray.time === Fajr ? 'bg-linear-to-b from-blue-500 to-indigo-600' : 
                                pray.time === Dhuhr ? 'bg-linear-to-b from-orange-400 to-yellow-500' : 
                                pray.time === Asr ? 'bg-linear-to-b from-red-400 to-orange-600' : 
                                'bg-linear-to-b from-purple-600 to-pink-600'
                            }`}
                        >
                            <motion.div 
                                className="absolute right-[-10%] top-[-10%] text-6xl opacity-10 group-hover:rotate-12 transition-transform"
                            >
                                {pray.icon}
                            </motion.div>
                            <div className="text-3xl mb-3">{pray.icon}</div>
                            <h3 className="text-lg font-semibold opacity-90">{pray.name}</h3>
                            <p className="text-2xl font-bold">{pray.time}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* كارت صلاة العشاء المميز */}
            <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-slate-900 rounded-2xl p-6 text-white flex items-center justify-between border border-slate-700 shadow-xl"
            >
                <div className="flex items-center gap-6">
                    <div className="bg-indigo-500/20 p-4 rounded-full">
                        <FaStar className="text-4xl text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Isha Prayer</h3>
                        <p className="text-indigo-300">Nightfall Prayer Time</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-4xl font-mono font-black">{Isha}</p>
                    <p className="text-xs opacity-50 uppercase tracking-widest">PM</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PrayerTimesPage;
