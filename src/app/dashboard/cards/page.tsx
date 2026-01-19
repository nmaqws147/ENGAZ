'use client';

import {useCards} from "./cardsLogic/page";
import { motion } from "framer-motion";

const CardsUI = () => {
    const { dashboardStats,containerVariants,itemVariants,statsConfig} = useCards();
    if (!dashboardStats) return null;

    

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 w-full"
        >
            {statsConfig.map((stat, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className={`relative overflow-hidden group p-5 rounded-3xl  transition-all duration-400 border-l-4 ${stat.borderColor}
                               bg-white shadow-sm hover:shadow-xl
                               dark:bg-slate-900 dark:hover:border-white/20 hover:border-gray-300 `}
                >
                    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${stat.bgColor}`} />

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className={`p-3 rounded-2xl ${stat.bgColor} ${stat.color} text-xl`}>
                                {stat.icon}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                {stat.title}
                            </span>
                        </div>

                        <div>
                            <div className="flex items-baseline gap-1">
                                <h3 className="text-3xl font-black text-slate-800 dark:text-white">
                                    {stat.value}
                                </h3>
                                {stat.title === "Focus Hours" && <span className="text-xs font-bold text-slate-400">hrs</span>}
                                {stat.title === "Best Habit" && <span className="text-xs font-bold text-slate-400">days</span>}
                            </div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 truncate">
                                {stat.label}
                            </p>
                        </div>
                    </div>
                    <div className={`absolute bottom-0 left-0 h-1 transition-all duration-500 w-0 group-hover:w-full ${stat.bgColor.replace('/10', '')}`} />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default CardsUI;