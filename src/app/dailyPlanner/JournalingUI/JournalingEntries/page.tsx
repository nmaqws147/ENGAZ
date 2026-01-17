'use client';
import { useJournal } from "../../JournalingLogic/page";
import { Calendar, Trash2, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const JournalEntries = () => {
    const { entries, deleteEntry, loadEntry, formatDate } = useJournal();

    return (
        <div className="mt-12 max-w-4xl mx-auto px-4">
            {/* Header Section */}
            <div className="flex items-center gap-3 mb-8">
                <div className="h-8 w-1.5 bg-orange-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Past Entries</h2>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full text-sm font-medium">
                    {entries.length}
                </span>
            </div>

            {entries.length === 0 ? (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800"
                >
                    <p className="text-slate-400 dark:text-slate-500 px-4">No entries yet. Start writing your first thought!</p>
                </motion.div>
            ) : (
                /* تعديل الجريد ليكون عمود واحد في الموبايل وعمودين في الشاشات الأكبر */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center md:justify-items-start">
                    <AnimatePresence mode="popLayout"> 
                        {entries.map((entry) => (
                            <motion.div 
                                key={entry.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                whileHover={{ y: -5 }}
                                /* تعديل العرض: w-full لضمان التجاوب مع max-w لجعل المقاس متناسقاً */
                                className="group w-full max-w-sm md:w-80 relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-orange-900/10 transition-all duration-300 overflow-hidden flex flex-col"
                            >
                                {/* Orange accent bar */}
                                <div className="h-1.5 w-full bg-orange-500 transform origin-left scale-x-100 group-hover:scale-x-110 transition-transform"></div>
                                
                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                                            <Calendar size={14} className="text-orange-500" />
                                            <span className="text-xs font-semibold uppercase tracking-wider">
                                                {formatDate(entry.id)}
                                            </span>
                                        </div> 
                                        <motion.button 
                                            whileTap={{ scale: 0.8 }}
                                            className="text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
                                            onClick={() => deleteEntry(entry.id)}
                                        >
                                            <Trash2 size={16} />
                                        </motion.button>
                                    </div>

                                    {/* Content Preview */}
                                    <div 
                                        className="prose prose-sm prose-slate dark:prose-invert max-w-none line-clamp-6 overflow-hidden text-slate-600 dark:text-slate-400 mb-4"
                                        dangerouslySetInnerHTML={{ __html: entry.content }}
                                    />

                                    {/* Footer */}
                                    <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center mt-auto">
                                        <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                            <Clock size={12} />
                                            <span>Journaled</span>
                                        </div>
                                        <motion.button 
                                            whileHover={{ x: 5 }}
                                            className="text-orange-600 dark:text-orange-400 text-xs font-bold hover:underline cursor-pointer"
                                            onClick={() => loadEntry(entry.id)}
                                        >
                                            Read More & Edit →
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default JournalEntries;