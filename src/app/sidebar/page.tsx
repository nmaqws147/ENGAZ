'use client';
import { FaRocket, FaHome, FaTasks, FaClock,FaBrain, FaFolderOpen, FaCheckCircle, FaMosque, FaPencilAlt, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import DarkModeUI from '../darkMode/darkModeUI/page';
import usePath from './pathLogic/page';

const SideBar = () => {
    const { Active, showSideBar, setShowSideBar } = usePath();

    const getLinkStyle = (path: string) => {
        const isActive = Active(path);
        const baseClasses = "mt-2 text-md transition-all duration-200 px-3 py-3 w-55 rounded-lg inline-flex items-center gap-2";
        
        if (isActive) {
            return `${baseClasses} text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400`;
        } else {
            return `${baseClasses} text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-slate-800`;
        }
    };

    return (
        <>
            <button 
                onClick={() => setShowSideBar(!showSideBar)}
                className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-indigo-600 text-white cursor-pointer"
            >
                {showSideBar ? <FaTimes /> : <FaBars />}
            </button>

            <div className={`
                bg-white dark:bg-slate-900 h-screen w-64 shadow-xl fixed lg:sticky top-0 z-40 border-r border-transparent dark:border-slate-800 transition-all duration-300
                ${showSideBar ? 'right-0' : '-right-64 lg:right-0'} 
            `}>
                
                {/* Header Section */}
                <div className="flex flex-row items-center justify-center h-20 p-4 shadow-sm gap-2 text-indigo-600 dark:text-indigo-400 border-b border-gray-50 dark:border-slate-800 z-50">
                    <FaRocket className="text-2xl font-bold"/>
                    <span className="text-2xl font-bold">ENGAZ</span>
                </div>
                
                <div className="p-4 flex flex-col justify-between h-[calc(100vh-80px)]">
                    <div className="flex flex-col">
                        <Link href="/dashboard" onClick={() => setShowSideBar(false)}>
                            <div className={getLinkStyle('/dashboard')}>
                                <FaHome/> 
                                <span>Dashboard</span>
                            </div>
                        </Link>

                        <Link href="/tasks" onClick={() => setShowSideBar(false)}>
                            <div className={getLinkStyle('/tasks')}>
                                <FaTasks/> 
                                <span>Tasks</span>
                            </div>
                        </Link> 

                        <Link href="/pomodoro" onClick={() => setShowSideBar(false)}>
                            <div className={getLinkStyle('/pomodoro')}>
                                <FaClock/> 
                                <span>Pomodoro Timer</span>
                            </div>
                        </Link> 

                        <Link href="/dailyPlanner" onClick={() => setShowSideBar(false)}>
                            <div className={getLinkStyle('/dailyPlanner')}>
                                <FaPencilAlt/> 
                                <span>Journaling</span>
                            </div>
                        </Link>

                        <Link href="/focusMode" onClick={() => setShowSideBar(false)}>
                            <div className={getLinkStyle('/focusMode')}>
                                <FaBrain/> 
                                <span>Focus Mode</span>
                            </div>
                        </Link>

                        <Link href="/projects" onClick={() => setShowSideBar(false)}>
                            <div className={getLinkStyle('/projects')}>
                                <FaFolderOpen/> 
                                <span>Projects</span>
                            </div>
                        </Link>

                        <Link href="/habitTracker" onClick={() => setShowSideBar(false)}>
                            <div className={getLinkStyle('/habitTracker')}>
                                <FaCheckCircle/> 
                                <span>Habit Tracker</span>
                            </div>
                        </Link>

                        <Link href="/prayerTimes" onClick={() => setShowSideBar(false)}>
                            <div className={getLinkStyle('/prayerTimes')}>
                                <FaMosque/> 
                                <span>Prayer Times</span>
                            </div>
                        </Link>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
                        <DarkModeUI/>
                    </div>
                </div>
            </div>

            {showSideBar && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setShowSideBar(false)}
                ></div>
            )}
        </>
    );
}

export default SideBar;