'use client';
import FilterByCategoryPage from "./filterByCategory/page";
import TaskSettings from "./taskSettings/page";
import { useTasks } from "../_tasksLogic/taskContext/page"
import { motion, AnimatePresence } from "framer-motion";
const TasksPage = () => {
  const {tasks,showTasks,handleTaskCheck,handleDeleteTask,handleEditTask,handleToggleCheck, moveTask,filteredTasks,} = useTasks();
  if (tasks.length === 0) return null;
  return (
    showTasks && (
      <>
        {tasks.length > 0 && (
          <div>
            <div className="my-5 mx-5">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-1 transition-colors">
                Task Management
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Organize and track your tasks efficiently
              </p>
            </div>
            <FilterByCategoryPage />
          </div>
        )}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md dark:shadow-2xl p-6 w-[calc(100%-2.5rem)] max-w-4xl mx-auto my-2 transition-colors">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map(task => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.9, 
                  transition: { duration: 0.2 }, 
                  position: 'absolute'
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  mass: 0.9,
                }}
                className={`
                  flex items-start gap-4 p-4 mb-3 w-full 
                  bg-gray-50 dark:bg-gray-800/50 rounded-md border-l-4 transition-colors
                  ${task.isTaskChecked
                    ? 'border-gray-400/50 dark:border-gray-600'
                    : task.priority === 'High Priority'
                    ? 'border-red-500'
                    : task.priority === 'Medium Priority'
                    ? 'border-yellow-500'
                    : 'border-green-500'
                  }
                `}
              >
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6 appearance-none border-2 border-gray-300 dark:border-gray-600 rounded-md checked:bg-emerald-600 checked:border-emerald-600 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:ring-offset-2 dark:focus:ring-offset-gray-800 relative cursor-pointer transition-all duration-200 ease-in-out after:content-['✓'] after:absolute after:text-white after:text-sm after:font-bold after:hidden checked:after:block after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2"
                    checked={task.isTaskChecked}
                    onChange={(e) => {
                      const newValue = e.target.checked;
                      handleTaskCheck(task.id, newValue);
                    }}
                    onClick={() =>
                      moveTask(task.id, !task.isTaskChecked)
                    }
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className={`text-lg font-bold transition-colors ${task.isTaskChecked ? 'text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-white'}`}>
                      {task.title}
                    </h3>
                    <TaskSettings
                      taskId={task.id}
                      onDelete={() => handleDeleteTask(task.id)}
                      onEdit={() => handleEditTask(task.id)}
                      onToggle={() => handleToggleCheck(task.id)}
                    />
                  </div>
                  <p className={`mt-1 text-sm transition-colors ${task.isTaskChecked ? 'text-gray-400 dark:text-gray-600' : 'text-gray-600 dark:text-gray-300'}`}>
                    {task.description}
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                    <span>{task.date}</span>            
                    <div className={`px-2 py-1 text-xs rounded-sm transition-colors duration-300 
                      ${task.isTaskChecked 
                        ? 'text-gray-400 bg-gray-200/50 dark:bg-gray-800 dark:text-gray-700' 
                        : task.category === 'Work' 
                          ? 'text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400' 
                          : task.category === 'Personal' 
                            ? 'text-purple-700 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400' 
                            : 'text-blue-700 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400'}`}> 
                      {task.category} 
                    </div>
                    <div className="flex items-center gap-1"> 
                      <span className={`px-2 py-1 text-xs rounded-sm transition-colors duration-300 
                        ${task.isTaskChecked 
                          ? 'text-gray-400 bg-gray-200/50 dark:bg-gray-800 dark:text-gray-700' 
                          : task.priority === 'High Priority' 
                            ? 'text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400' 
                            : task.priority === 'Medium Priority' 
                              ? 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400' 
                              : 'text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400' }`}> 
                        {task.priority} 
                      </span> 
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </>
    )
  );
};
export default TasksPage;