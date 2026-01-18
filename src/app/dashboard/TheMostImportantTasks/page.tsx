'use client';
import { useTasks } from "@/app/tasks/tasksLogic/taskContext/page";
import { motion } from "framer-motion";
import { FaExclamationCircle, FaFire } from "react-icons/fa";

const TheMostImportantTasks = () => {
  const { tasks } = useTasks();

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === 'High Priority' && task.isTaskChecked === false
  );

  return (
    <section className="w-full mx-auto lg:mx-20 max-w-full sm:max-w-md rounded-3xl shadow-xl border transition-all duration-300 p-4 sm:p-6 
      bg-white border-slate-200 text-slate-800 
      dark:bg-linear-to-b dark:from-slate-800 dark:to-slate-900 dark:border-white/10 dark:text-white"> 
      <div className="flex items-center gap-2 mb-4 sm:mb-5 px-1">
        <FaFire className="text-orange-500 animate-pulse text-base sm:text-lg" />
        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.12em] sm:tracking-[0.15em] text-slate-500 dark:text-indigo-300/80">
          The Most Important Tasks
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {highPriorityTasks.length > 0 ? (
          highPriorityTasks.map((task, index) => (
            <motion.div
              key={task.id || index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-3 sm:p-4 rounded-2xl border transition-all duration-300
                bg-slate-50 border-slate-100 hover:border-red-200 hover:shadow-md
                dark:bg-white/5 dark:border-white/5 dark:hover:bg-white/10 dark:hover:border-red-500/30"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl 
                  bg-red-100 text-red-600 
                  dark:bg-red-500/20 dark:text-red-400">
                  <FaExclamationCircle className="text-lg sm:text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm md:text-base font-bold truncate 
                    text-slate-800 dark:text-slate-100">
                    {task.title}
                  </h4>
                  <div className="mt-1 flex items-center">
                    <span className="text-[8px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md tracking-tighter
                      bg-red-50 text-red-500 border border-red-100
                      dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20">
                      High Priority
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          /* Empty State */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 sm:py-12 rounded-2xl border-2 border-dashed 
              border-slate-200 dark:border-slate-800"
          >
            <div className="text-2xl sm:text-3xl mb-2">✨</div>
            <p className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm font-medium italic px-4">
              All high-priority tasks are done.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TheMostImportantTasks;