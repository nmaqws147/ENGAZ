'use client';
import { Save, Calendar, Bold, List, Image as ImageIcon, Clock, Heading, Quote } from 'lucide-react';
import { useJournal } from '../JournalingLogic/page';
import { EditorContent } from '@tiptap/react';
import { motion } from 'framer-motion';

const JournalEditor = () => {
    const { editor, addImage, mounted, handleSave } = useJournal();

    if (!mounted || !editor) return null;

    return (
        <div className="min-h-screen bg-orange-50 dark:bg-slate-950 py-10 px-4 transition-colors duration-500">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="max-w-4xl mx-auto"
            >
                <div className="flex items-center justify-between mb-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4"
                    >
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Personal Journal</h1>
                            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs mt-0.5">
                                <Clock size={12} className="animate-pulse" />
                                <span>Ready to write</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex cursor-pointer items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-orange-200 dark:shadow-none active:scale-95"
                        onClick={handleSave}
                    >
                        <Save size={18} />
                        <span>Save Entry</span>
                    </motion.button>
                </div>

                {/* Editor Surface */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-orange-100 dark:border-slate-800 overflow-hidden transition-colors"
                >
                    {/* Custom Toolbar */}
                    <div className="flex items-center flex-wrap gap-1.5 px-6 py-3 bg-orange-50/80 dark:bg-slate-800/50 border-b border-orange-100 dark:border-slate-800 backdrop-blur-md">
                        {[
                            { icon: <Heading size={15} />, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: 'heading' },
                            { icon: <Bold size={18} />, action: () => editor.chain().focus().toggleBold().run(), active: 'bold' },
                            { icon: <Quote size={18} />, action: () => editor.chain().focus().toggleBlockquote().run(), active: 'blockquote' },
                        ].map((btn, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ backgroundColor: "rgba(255, 165, 0, 0.1)" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={btn.action}
                                className={`p-2 rounded-lg transition-all ${editor.isActive(btn.active, btn.active === 'heading' ? { level: 2 } : {}) 
                                    ? 'bg-white dark:bg-slate-700 shadow-sm text-orange-500 dark:text-orange-400' 
                                    : 'text-orange-400 dark:text-slate-500 hover:text-orange-600 dark:hover:text-orange-400'}`}
                            >
                                {btn.icon}
                            </motion.button>
                        ))}

                        <div className="h-5 w-2 bg-orange-200 dark:bg-slate-700 mx-2" />

                        <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={addImage}
                            className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-orange-400 dark:text-slate-500 hover:text-orange-500 dark:hover:text-orange-400 transition-all shadow-sm"
                            title="Upload Image"
                        >
                            <ImageIcon size={18} />
                        </motion.button>

                        <motion.button 
                            whileHover={{ rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={`p-2 rounded-lg transition-all ${editor.isActive('bulletList') ? 'bg-white dark:bg-slate-700 shadow-sm text-orange-500 dark:text-orange-400' : 'text-orange-400 dark:text-slate-500'}`}
                        >
                            <List size={18} />
                        </motion.button>
                    </div>

                    {/* Writing Area */}
                    <div className="relative dark:text-slate-200">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute top-8 left-12 flex items-center gap-2 text-orange-500 dark:text-orange-400 font-bold text-[10px] uppercase tracking-[0.2em] pointer-events-none z-10"
                        >
                            <Calendar size={14} />
                            <span className='flex gap-4'>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </motion.div>
                        <EditorContent editor={editor} className="prose-slate dark:prose-invert max-w-none" />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default JournalEditor;