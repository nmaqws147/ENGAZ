'use client';
import useIcons from "../habitTrackerLogic/Icons/page";
import {useHabit} from "../habitTrackerLogic/habitsStore/page";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type HabitPopupProps = {
  showHabitPopup: boolean;
  setShowHabitPopup: (value: boolean | ((prev: boolean) => boolean)) => void;
  setSubmitClicked: (value: boolean | ((prev: boolean) => boolean)) => void;
  submitClicked: boolean;
};

const HabitPopup = ({ 
  showHabitPopup, 
  setShowHabitPopup, 
  setSubmitClicked, 
  submitClicked
}: HabitPopupProps) => {
  const icons = useIcons();
  const { 
    setHabitTitle, 
    setHabitDescription, 
    setIcon, 
    setColor, 
    addHabit,
    habits,
    updateHabit,
    deleteHabit
  } = useHabit();
  
  const handleSave = () => {
    addHabit();          
    setShowHabitPopup(prev => !prev); 
    setSubmitClicked(prev => !prev);
  };

  const onCancel = () => {
    setSubmitClicked(habits.length > 0 ? true : false);
    setShowHabitPopup(false);
  }

  useEffect(() => {
    setSubmitClicked(habits.length > 0);
  }, [habits]);

  return (
    <>
      {/* Popup */}
      <AnimatePresence>
        {showHabitPopup && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md">
                
                {/* Header */}
                <div className="px-6 pt-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">New Habit</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Add a habit to track</p>
                </div>

                {/* Form */}
                <div className="p-6 space-y-4">
                  <input
                    type="text"
                    placeholder="Habit name"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-0"
                    onChange={(e) => setHabitTitle(e.target.value)}
                  />
                  
                  <textarea
                    placeholder="Description (optional)"
                    className="w-full px-4 py-3 border outline-0 border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                    onChange={(e) => setHabitDescription(e.target.value)}
                  />

                  {/* Icon selector */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Icon</p>
                    <div className="flex flex-wrap gap-2">
                      {icons.flat().map((icon, i) => (
                        <button 
                          key={i} 
                          className="flex items-center justify-center cursor-pointer w-9 h-9 text-lg rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                          onClick={() => setIcon(icon.icon)}
                        >
                          {icon.icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color selector */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Color</p>
                    <div className="flex flex-wrap gap-2">
                      {['#ef4444', '#A52A2A', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#ec4899', '#f97316', '#6366f1','#000000','#F4C2C2'].map((color, i) => (
                        <button  
                          key={i} 
                          style={{backgroundColor: `${color}`}} 
                          className="w-8 h-8 cursor-pointer rounded-full" 
                          onClick={() => setColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6">
                  <div className="flex justify-end gap-3">
                    <button 
                      className="cursor-pointer px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white" 
                      onClick={onCancel}
                    >
                      Cancel
                    </button>
                    <button 
                      className="cursor-pointer px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
                      onClick={handleSave}
                    >
                      Submit
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Habits list */}
      {submitClicked && habits.length > 0 && (
        <>
          <div className="my-5 mx-5">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">Habit Tracker</h2>
            <p className="text-gray-600 dark:text-gray-400">Build and maintain positive habits</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 ml-4">
            <AnimatePresence>
            {habits.map((habit) => (
              <motion.div
                key={habit.habitId}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="p-4 rounded-lg shadow-lg dark:bg-gray-800 flex flex-col gap-4 relative group hover:shadow-xl transition-shadow duration-300"
              >

                {/* Delete button */}
                <button
                  onClick={() => {
                    setSubmitClicked(habits.length > 0 ? true : false);
                    deleteHabit(habit.habitId);
                  }}
                  className="absolute bottom-5 cursor-pointer right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                  title="Delete habit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 hover:scale-110"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>

                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl" style={{ color: habit.color }}>
                      {habit.icon}
                    </span>
                    <div className="flex flex-col">
                      <h2 className="text-lg font-semibold dark:text-white">{habit.habitTitle}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{habit.habitDescription}</p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-5">
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-semibold" style={{ color: habit.color }}>
                        {habit.countDays}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">day streak</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                        {habit.outDays}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Out</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex gap-1">
                  {habit.habitCompletion.map((completed, index) => (
                    <motion.div
                      key={index}
                      layout
                      initial={false}
                      animate={{
                        backgroundColor: completed ? habit.color : '#D1D5DB',
                        scaleY: completed ? 1.3 : 1
                      }}
                      transition={{
                        backgroundColor: { duration: 0.3 },
                        scaleY: { type: "spring", stiffness: 300, damping: 20 }
                      }}
                      className={`w-full h-2 rounded cursor-pointer hover:opacity-80 ${!completed && 'dark:bg-gray-600'}`}
                      onClick={() => {
                        const newCompletion = [...habit.habitCompletion];
                        newCompletion[index] = !newCompletion[index];

                        const lastFalse = newCompletion.lastIndexOf(false);
                        const allTrue = newCompletion.slice(lastFalse + 1);

                        updateHabit(habit.habitId, {
                          habitCompletion: newCompletion,
                          countDays: allTrue.length,
                          outDays: completed ? habit.outDays + 1 : habit.outDays - 1,
                        });
                      }}
                    />
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-row items-center justify-center gap-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex cursor-pointer rounded-lg px-4 py-2 text-white hover:shadow-md"
                    style={{ backgroundColor: habit.color }}
                    onClick={() => {
                      updateHabit(habit.habitId, {
                        habitCompletion: [...habit.habitCompletion, true],
                        countDays: habit.countDays + 1
                      });
                    }}
                  >
                    <span className="flex mr-2 items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    Done Today
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex cursor-pointer rounded-lg px-4 py-2 text-white hover:shadow-md bg-gray-500 dark:bg-gray-600"
                    onClick={() => {
                      updateHabit(habit.habitId, {
                        habitCompletion: [...habit.habitCompletion, false],
                        outDays: habit.outDays + 1,
                        countDays: 0
                      });
                    }}
                  >
                    <span className="flex mr-2 items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </span>
                    Uncompleted Today
                  </motion.button>
                </div>

              </motion.div> 
            ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </>
  );
};

export default HabitPopup;