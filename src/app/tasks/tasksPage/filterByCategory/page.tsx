'use client';
import React, { useEffect } from 'react';
import { useTasks } from "../../_tasksLogic/taskContext/page"

const FilterByCategoryPage = () => {
    const {
        tasks,
        tasksByCategory,
        filterTasks,
        setFilteredTasks,
        activeCategory
    } = useTasks();

    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);

    return (
        <div className="mt-6 mb-8 px-4 md:px-7">
            <div className="grid grid-cols-2 md:flex md:flex-row gap-3 md:gap-4 justify-center">

                <button
                    className={`p-4 w-full md:w-[200px] lg:w-[250px] bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-pointer transition-all
                    ${activeCategory === 'All' ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => filterTasks('All')}
                >
                    <div className="font-bold text-xl md:text-2xl dark:text-white">{tasks.length}</div>
                    <span className="text-sm md:text-base dark:text-gray-400">All</span>
                </button>

                <button
                    className={`p-4 w-full md:w-[200px] lg:w-[250px] bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-pointer transition-all
                    ${activeCategory === 'Work' ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => filterTasks('Work')}
                >
                    <div className="font-bold text-xl md:text-2xl text-green-600 dark:text-green-400">{tasksByCategory.work?.length || 0}</div>
                    <span className="text-sm md:text-base dark:text-gray-400">Work</span>
                </button>

                <button
                    className={`p-4 w-full md:w-[200px] lg:w-[250px] bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-pointer transition-all
                    ${activeCategory === 'Personal' ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => filterTasks('Personal')}
                >
                    <div className="font-bold text-xl md:text-2xl text-purple-600 dark:text-purple-400">{tasksByCategory.personal?.length || 0}</div>
                    <span className="text-sm md:text-base dark:text-gray-400">Personal</span>
                </button>

                <button
                    className={`p-4 w-full md:w-[200px] lg:w-[250px] bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-pointer transition-all
                    ${activeCategory === 'Study' ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => filterTasks('Study')}
                >
                    <div className="font-bold text-xl md:text-2xl text-blue-600 dark:text-blue-400">{tasksByCategory.study?.length || 0}</div>
                    <span className="text-sm md:text-base dark:text-gray-400">Study</span>
                </button>

            </div>
        </div>
    );
};

export default FilterByCategoryPage;