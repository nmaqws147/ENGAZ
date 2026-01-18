 export type tasksType = {
    id: string,
    title: string,
    description: string,
    date: string,
    priority: string,
    category: string,
    isTaskChecked: boolean,
    settingsClick: boolean,
    projectId: string,
    itemId: string,    
}

 export type TasksContextType = {
    showPopup: boolean;
    setShowPopup: (value: boolean | ((prev: boolean) => boolean)) => void;
    setShowTasks: (value: boolean | ((prev: boolean) => boolean)) => void;
    setCategory: (value: string | ((prev: string) => string)) => void;
    setTitle: (value: string | ((prev: string) => string)) => void;
    setDescription: (value: string | ((prev: string) => string)) => void;
    setDate: (value: string | ((prev: string) => string)) => void;
    setPriority: (value: string | ((prev: string) => string)) => void;
    setIsTaskChecked: (value: boolean | ((prev: boolean) => boolean)) => void;
    settingsClick: boolean;
    title: string;
    category: string;
    description: string;
    date: string;
    priority: string;
    isTaskChecked: boolean;
    tasks: tasksType[];
    showTasks: boolean;
    setTasks: (value: tasksType[] | ((prev: tasksType[]) => tasksType[])) => void;
    handleSaveTask: () => void; 
    handleTaskCheck: (taskId: string, checked: boolean) => void;
    handleDeleteTask: (taskId: string) => void;
    handleEditTask: (taskId: string) => void;
    handleToggleCheck: (taskId: string) => void;
    moveTask: (taskId: string, checked: boolean) => void;
    filterTasks: (category: string) => void;
    setFilteredTasks: (value: tasksType[] | ((prev: tasksType[]) => tasksType[])) => void;
    filteredTasks: tasksType[];
    activeCategory: string | undefined;
    tasksByCategory: Record<string, tasksType[]>;
    tasksAudio: React.RefObject<HTMLAudioElement | null>;
    setEditingTaskId: (value: string | ((prev: string) => string)) => void;
    setItemId: (value: string | ((prev: string) => string)) => void;
    editingTaskId: string;
}
