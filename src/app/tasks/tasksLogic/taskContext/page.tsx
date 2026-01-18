'use client';
import { createContext, useContext, useMemo, ReactNode } from "react";
import { useProjects } from "@/app/projects/projectsLogic/page";
import { useTaskState } from "../taskStates/page";
import { useTaskActions } from "../taskActions/page";
import { TasksContextType, tasksType } from "../../tasksType/page";

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const useTasks = (): TasksContextType => {
    const context = useContext(TasksContext);
    if (!context) throw new Error('useTasks must be used within TasksProvider');
    return context;
};

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { selectedProjectId } = useProjects();
    
    const state = useTaskState();
    
    const actions = useTaskActions(state, selectedProjectId);

    const tasksByCategory = useMemo(() => {
        return state.tasks.reduce((acc, task) => {
            const cat = task.category.toLowerCase();
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(task);
            return acc;
        }, {} as Record<string, tasksType[]>);
    }, [state.tasks]);

    const filterTasks = (category: string) => {
        if (category === 'All') {
            state.setFilteredTasks(state.tasks);
        } else {
            const filtered = state.tasks.filter(task => task.category === category);
            state.setFilteredTasks(filtered);
        }
    };

    const activeCategory = state.filteredTasks.length === state.tasks.length
        ? 'All'
        : state.filteredTasks[0]?.category;

    const value = {
    ...state,
    ...actions,
    tasksByCategory,
    filterTasks,
    activeCategory
} as unknown as TasksContextType;

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    );
};