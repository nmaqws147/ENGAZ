'use client';

import { motion, AnimatePresence } from "framer-motion";
import { FaGear } from "react-icons/fa6";
import { usePomodoro } from "../pomodoroBox/PomodoroBoxLogic/page";

const PomodoroSettings = () => {
  const {
    setPomodoroSettingsShortBreak,
    setPomodoroSettingsTimer,
    setPomodoroSettingsLongBreak,
    resetSession,
    showSettings,
    setShowSettings
  } = usePomodoro();

  return (
    <div
      className="absolute top-10 right-10 z-40"
      onMouseEnter={() => setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
    >
      <motion.div
        animate={{ rotate: showSettings ? 90 : 0 }}
        transition={{ duration: 0.3 }}
        className="cursor-pointer w-fit"
      >
        <FaGear className="h-5 w-5 text-white" />
      </motion.div>
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}  
            animate={{ opacity: 1, y: 0 }}     
            exit={{ opacity: 0, y: -40 }}      
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-full right-0 mt-1 w-80 bg-white shadow-2xl rounded-xl p-6 flex flex-col gap-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Pomodoro Settings
            </h2>

            {/* Pomodoro Timer */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">
                Pomodoro Timer (minutes)
              </label>
              <input
                type="number"
                placeholder="25"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-gray-900"
                onChange={(e) =>
                  setPomodoroSettingsTimer(Number(e.target.value))
                }
              />
            </div>

            {/* Short Break */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">
                Short Break Time (minutes)
              </label>
              <input
                type="number"
                placeholder="5"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:text-gray-900"
                onChange={(e) =>
                  setPomodoroSettingsShortBreak(Number(e.target.value))
                }
              />
            </div>

            {/* Long Break */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">
                Long Break Time (minutes)
              </label>
              <input
                type="number"
                placeholder="15"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-gray-900"
                onChange={(e) =>
                  setPomodoroSettingsLongBreak(Number(e.target.value))
                }
              />
            </div>

            <button
              className="mt-4 cursor-pointer bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
              onClick={resetSession}
            >
              Save Settings
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PomodoroSettings;
