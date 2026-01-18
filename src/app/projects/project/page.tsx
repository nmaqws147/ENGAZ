'use client';
import { useProjects } from "../projectsLogic/page";
import { useTasks } from "@/app/tasks/tasksLogic/taskContext/page";
import ProjectSettings from "./ProjectSettings/page";

const Project = () => {
    const { project, handleDeleteProject, handleEditProject , handleToggleCheck} = useProjects();
    const { tasks } = useTasks();

    return (
        <div className="my-8 mx-10">
            {project.length > 0 && (
                <div>
                    <h1 className="text-3xl dark:text-white font-bold text-gray-800 mb-1">Projects</h1>
                    <p className="text-gray-500 dark:text-white">Manage your projects and track progress</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {project.map((item) => {
                    const projectTasks = tasks.filter(t => String(t.projectId)=== String(item.id));
                    const total = projectTasks.length;
                    const checked = projectTasks.filter(t => t.isTaskChecked).length;
                    const progressBar = total > 0 ? (checked / total) * 100 : 0;
                    const isCompleted = total > 0 && checked === total;
                    return (
                        <div 
                            key={item.id} 
                            className={`bg-white p-6 rounded-2xl dark:bg-gray-800  shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow border-t-4 
                                ${isCompleted 
                                    ? 'border-gray-400/50 dark:border-gray-500 opacity-90' 
                                    : item.priority === 'High Priority' 
                                        ? 'border-red-500' 
                                        : item.priority === 'Low Priority' 
                                            ? 'border-green-500' 
                                            : 'border-yellow-400'
                                }`}
                        >
                            {/* Header Section */}
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{item.title}</h3>
                                    <div className="text-xs text-gray-400 font-mono cursor-pointer">
                                        <ProjectSettings 
                                                    projectId = {item.id}
                                                    onDelete={() => handleDeleteProject(item.id)} 
                                                    onEdit={() => handleEditProject(item.id)} 
                                                    toggle = {() => handleToggleCheck(item.id)}
                                        /></div>
                                </div>
                                <p className="text-gray-500 text-sm dark:text-white">{item.desc}</p>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <span className="dark:text-white">Progress</span>
                                    <span className="dark:text-white">{`${Math.round(progressBar)}%`}</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-2">
                                    <div 
                                        className={`h-2 rounded-full transition-all 
                                            ${isCompleted 
                                                ? 'bg-gray-400/50 dark:bg-gray-500' 
                                                : item.priority === 'High Priority' 
                                                    ? 'bg-red-500' 
                                                    : item.priority === 'Low Priority' 
                                                        ? 'bg-green-500' 
                                                        : 'bg-yellow-400'
                                            }`}
                                        style={{ width: `${progressBar}%` }} 
                                    ></div>
                                </div>
                                
                                {/* Meta Data Section */}
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <span className="dark:text-white">Tasks</span>
                                    <span className="font-bold dark:text-white">{checked}/{total}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <span className="dark:text-white">The date</span>
                                    <span className="font-bold dark:text-white">{item.date}</span>
                                </div>
                            </div>

                            {/* Status Badges Section */}
                            <div className="flex items-center gap-2">
                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full dark:bg-gray-700 
                                    ${isCompleted 
                                        ? 'bg-gray-100 text-gray-500' 
                                        : item.priority === 'High Priority' 
                                            ? 'bg-red-50 text-red-600' 
                                            : item.priority === 'Medium Priority' 
                                                ? 'bg-yellow-50 text-yellow-500' 
                                                : 'bg-green-50 text-green-600'
                                    }`}>
                                    {item.priority}
                                </span>

                                {total === 0 ? (
                                    <span className="text-xs dark:bg-gray-700  font-medium px-2.5 py-1 rounded-full bg-gray-50 text-gray-400">
                                        No Tasks
                                    </span>
                                ) : checked === 0 ? (
                                    <span className="text-xs dark:bg-gray-700  font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                                        todo
                                    </span>
                                ) : (checked > 0 && checked < total) ? (
                                    <span className="text-xs dark:bg-gray-700  font-medium px-2.5 py-1 rounded-full bg-orange-50 text-orange-500">
                                        In Progress
                                    </span>
                                ) : (
                                    <span className="text-xs dark:bg-gray-700  font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-500">
                                        Done
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Project;