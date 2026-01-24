'use client';
import { useTasks } from "../../_tasksLogic/taskContext/page"

type TaskSettingsProps = {
    taskId: string;
    onDelete: () => void;
    onEdit: () => void;
    onToggle: () => void;
}

const TaskSettings: React.FC<TaskSettingsProps> = ({ onDelete, taskId, onEdit, onToggle }) => {
    const { tasks } = useTasks();
    const task = tasks.find(t => t.id === taskId);
    if (!task) return null;
    return (
        <>
                <div  className="relative flex">   
                    <svg 
                        className="w-5 h-5 text-gray-500  hover:text-gray-700 cursor-pointer" 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        onClick={() => {
                            onToggle()
                        }
                        }
                    >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                    
                    {/* القائمة المنبثقة */}
                    {task.settingsClick && (
                        <div className="absolute dark:bg-gray-800 right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 dark:border-gray-800">
                            <div className="py-1">
                                {/* زر التعديل */}
                                <button 
                                    onClick={() => {
                                        onEdit();
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm dark:text-blue-400  text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </button>
                                <button 
                                    onClick={() => {
                                        onDelete();
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm dark:text-red-400 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
        </>
    );
}

export default TaskSettings;