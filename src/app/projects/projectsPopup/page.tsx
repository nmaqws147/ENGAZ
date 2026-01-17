'use client'
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "../projectsLogic/page";

const ProjectsPopup = () => {
    const { showProjectsPopup , setShowProjectsPopup,setTitle,setDesc,setDate,setPriority,handleSavedProject} = useProjects();

    return (
        <AnimatePresence>
            {showProjectsPopup && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 dark:bg-black/60 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />

                    {/* Popup Container */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-md overflow-hidden border dark:border-slate-800 transition-colors duration-300">
                            
                            {/* Header */}
                            <div className="px-6 pt-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">New Project</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Add a Project to complete</p>
                            </div>

                            {/* Form UI */}
                            <div className="p-6 space-y-4">
                                <input
                                    type="text"
                                    placeholder="Project title"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                
                                <textarea
                                    placeholder="Project description"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none outline-none transition-colors"
                                    onChange={(e) => setDesc(e.target.value)}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Due Date</p>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors [color-scheme:light] dark:[color-scheme:dark]"
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>
                                    
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Priority</p>
                                        <select 
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white dark:bg-slate-800 dark:text-white transition-colors"
                                            onChange={(e) => setPriority(e.target.value)}
                                        >
                                            <option className="dark:bg-slate-800">...</option>
                                            <option className="dark:bg-slate-800">Low Priority</option>
                                            <option className="dark:bg-slate-800">Medium Priority</option>
                                            <option className="dark:bg-slate-800">High Priority</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-6 bg-gray-50 dark:bg-slate-800/50 flex justify-end gap-3 border-t dark:border-slate-800">
                                <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white cursor-pointer font-medium transition-colors"
                                onClick={() => setShowProjectsPopup(false)}
                                >
                                    Cancel
                                </button>
                                <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg cursor-pointer font-medium shadow-sm transition-all active:scale-95"
                                onClick={handleSavedProject}
                                >
                                    Create Project
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default ProjectsPopup;