'use client'
import { motion, AnimatePresence } from "framer-motion";
import { useTasks } from "../tasksLogic/taskContext/page"
import { useProjects } from "@/app/projects/projectsLogic/page";

const TasksPopup = () => {
    const {showPopup,setShowPopup,setTitle,setDescription,setDate,setPriority,setShowTasks,handleSaveTask,setCategory} = useTasks();
    const {project,setSelectedProjectId} = useProjects();

    return(
        <AnimatePresence>
        { showPopup &&
            <>
                {/* Overlay */}
                <motion.div 
                    className="fixed inset-0 bg-black/40 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                />

                {/* Popup */}
                <motion.div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md transition-colors">
                        
                        {/* Header */}
                        <div className="px-6 pt-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">New Task</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Add a task to complete</p>
                        </div>

                        {/* Form */}
                        <div className="p-6 space-y-4">
                            <input
                                type="text"
                                placeholder="Task title"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-0"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            
                            <textarea
                                placeholder="Task description"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 h-24 resize-none outline-0"
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Due Date</p>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-0"
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                                
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Priority</p>
                                    <select 
                                        className= "w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-0"
                                        onChange={(e) => setPriority(e.target.value)}
                                    >
                                        <option className="dark:bg-gray-800">...</option>
                                        <option className="dark:bg-gray-800">Low Priority</option>
                                        <option className="dark:bg-gray-800">Medium Priority</option>
                                        <option className="dark:bg-gray-800">High Priority</option>
                                    </select>
                                </div>

                                <div className="col-span-2">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Project</p>
                                    <select 
                                        className= "w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-0"
                                        onChange={(e) => setSelectedProjectId(e.target.value)}
                                    >
                                        <option value="" className="dark:bg-gray-800">Select project</option>
                                        {
                                            project.map(item => {
                                                return (
                                                    <option key={item.id} value={item.id} className="dark:bg-gray-800">
                                                        {item.title}
                                                    </option>
                                                        )
                                                })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                                <div className="flex flex-wrap gap-2">
                                    <button className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm cursor-pointer"
                                    onClick={() => setCategory("Work")}>
                                        Work
                                    </button>
                                    <button className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm cursor-pointer"
                                    onClick={() => setCategory("Personal")}>
                                        Personal
                                    </button>
                                    <button className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm cursor-pointer"
                                    onClick={() => setCategory("Study")}>
                                        Study
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6">
                            <div className="flex justify-end gap-3">
                                <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white cursor-pointer transition-colors"
                                onClick={() => {
                                    setShowTasks(true);
                                    setShowPopup(false)
                                }}>
                                    Cancel
                                </button>
                                <button className="px-4 py-2 bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg cursor-pointer transition-colors"
                                onClick={() => {
                                    handleSaveTask();
                                    setShowTasks(true);
                                    setShowPopup(false);
                                }}>
                                    Add Task
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </>
        }
        </AnimatePresence>
    )
}
export default TasksPopup;