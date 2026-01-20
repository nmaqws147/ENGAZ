'use client'
import { useTasks } from "../_tasksLogic/taskContext/page"

const EmptyPage = () => {
    const { setShowPopup, setShowTasks, tasks} = useTasks();
    
    return tasks.length === 0 ? (
        <div className="flex flex-col mt-6 md:mt-9 px-4 w-full">
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex flex-col items-center justify-center py-12 md:py-16 px-6 rounded-2xl shadow-sm border dark:border-gray-800 border-gray-100 bg-white dark:bg-gray-900 transition-colors">

                    <div className="mb-6 relative">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-linear-to-r from-emerald-100 to-emerald-50 flex items-center justify-center">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-linear-to-r from-emerald-200 to-emerald-100 flex items-center justify-center shadow-inner">
                                <svg
                                    className="w-6 h-6 md:w-8 md:h-8 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        No tasks yet
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 text-center max-w-md mb-8 md:mb-10">
                        Start organizing your day by adding your first task. Manage your to-do list, track completion, and accomplish your daily objectives.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <button
                            className="group relative inline-flex cursor-pointer items-center justify-center px-6 md:px-8 py-3 md:py-4 overflow-hidden font-medium text-white bg-linear-to-r from-emerald-500 to-emerald-600 rounded-xl hover:from-emerald-600 hover:to-emerald-700 focus:ring-4 focus:ring-emerald-300 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 active:translate-y-0"
                            onClick={() => { setShowPopup(prev => !prev); setShowTasks(prev => !prev); }}
                        >
                            <span className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>

                            <span className="relative flex items-center">
                                <svg
                                    className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-90"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    ></path>
                                </svg>
                                <span className="text-base md:text-lg font-medium">
                                    Add your first task
                                </span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <button
            className="fixed z-50 bottom-6 right-6 md:bottom-auto md:top-10 md:right-10 text-sm md:text-md px-5 py-3 md:px-6 md:py-3 cursor-pointer bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-lg shadow-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 active:scale-95"
            onClick={() => { setShowPopup(prev => !prev); setShowTasks(prev => !prev); }}
        >
            + Add Task
        </button>
    );
}
export default EmptyPage;