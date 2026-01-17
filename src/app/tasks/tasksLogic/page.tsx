'use client';
import { useProjects } from "@/app/projects/projectsLogic/page";
import { createContext, useContext, useState, ReactNode, useEffect , useMemo, useRef} from "react";

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const useTasks = (): TasksContextType => {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error('useTasks must be used within TasksProvider');
    }
    return context;
};

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: ReactNode }) => {
    const {selectedProjectId} = useProjects();
    const tasksAudio = useRef<HTMLAudioElement | null>(null);
    const [itemId,setItemId] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState("");
    const [category, setCategory] = useState("Personal");
    const [isTaskChecked, setIsTaskChecked] = useState<boolean>(false);
    const [settingsClick, setSettingsClick] = useState<boolean>(false);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null); // ⭐ أضفنا state للتعديل
    const [showTasks, setShowTasks] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
        try {
            const stored = localStorage.getItem("showTasks");
            return stored ? JSON.parse(stored) : true; // default true
        } catch {
            return true;
        }
    }
    return true;
});
    const [tasks, setTasks] = useState<tasksType[]>(() => {
    if (typeof window !== 'undefined') {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            try {
                const parsed = JSON.parse(storedTasks);
                return parsed.map((task: tasksType) => ({
                    ...task,
                    settingsClick: task.settingsClick || false
                }));
            } catch (error) {
                console.error("Error parsing tasks:", error);
                return [];
            }
        }
    }
    return [];
});
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    useEffect(() => {
    try {
        localStorage.setItem("showTasks", JSON.stringify(showTasks));
    } catch (error) {
        console.error("Error saving showTasks:", error);
    }
}, [showTasks]);

    useEffect(() => {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
        console.error("Error saving tasks:", error);
    }
}, [tasks]);
    useEffect(() => {
        tasksAudio.current = new Audio("/sounds/new-notification-09-352705.mp3")
    },[])
    const handleTaskCheck = (taskId: string, checked: boolean) => {
        setTasks(prev => prev.map(task => 
            task.id === taskId 
                ? { ...task, isTaskChecked: checked }
                : task
        ));
    }

    const handleDeleteTask = (taskId: string) => {
         setTasks(prev => {
        const newTasks = prev.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(newTasks)); // تحديث مباشر
        return newTasks;
    });
    }

    const handleEditTask = (taskId: string) => {
        const editTask = tasks.find(task => task.id === taskId);
        if (editTask) {
            setTitle(editTask.title);
            setDescription(editTask.description);
            setDate(editTask.date);
            setPriority(editTask.priority);
            setCategory(editTask.category);
            setEditingTaskId(taskId); 
            setShowPopup(true);
            setItemId(editTask.projectId);
        }
    }
    const handleSaveTask = () => {
  if (title && description && date && priority && category) {
    const targetProjectId = editingTaskId !== null ? itemId : selectedProjectId;
    if (editingTaskId !== null) {
        console.log("Adding task to project:", itemId);
        console.log(tasks);
      setTasks(prev =>
        prev.map(task =>
          task.id === editingTaskId
            ? { ...task, title, description, date, priority, category,projectId: targetProjectId}
            : task
        )
      );
    } else {

      const newTask: tasksType = {
        id: Date.now().toString(),
        title,
        description,
        date,
        projectId: targetProjectId,
        priority,
        category,
        isTaskChecked: false,
        settingsClick: false,
        itemId,

      };

      setTasks(prev => [newTask, ...prev]);
    }
    setTitle('');
    setDescription('');
    setDate('');
    setPriority('Medium Priority');
    setCategory('');
    setEditingTaskId(null);
    setShowPopup(false);
    setItemId("");
  }
};

    const handleToggleCheck = (taskId: string) => {
    setTasks(prevTasks =>
        prevTasks.map(task =>
            task.id === taskId 
                ? { ...task, settingsClick: !task.settingsClick} 
                : { ...task, settingsClick: false }  
        )
    );
}
    const moveTask = (taskId: string, checked: boolean) => {
    const indexOfElement = tasks.findIndex(t => t.id === taskId);
    if (indexOfElement === -1) return;
    const newTasks = [...tasks];
    const [task] = newTasks.splice(indexOfElement, 1);
    if (checked) {
        tasksAudio.current?.play();
        newTasks.push(task);
    } else {
        newTasks.unshift(task);
    }
    setTasks(newTasks);
};

    const tasksByCategory = useMemo(() => {
    return tasks.reduce((acc, task) => {
        const cat = task.category.toLowerCase(); // تحويل لصغير لتجنب أخطاء الكتابة
        if (!acc[cat]) {
            acc[cat] = [];
        }
        acc[cat].push(task);
        return acc;
    }, {} as Record<string, tasksType[]>);
}, [tasks]);
    const filterTasks = (category: string) => {
            if (category === 'All') {
                setFilteredTasks(tasks);
            } else {
                const filtered = tasks.filter(task => task.category === category);
                setFilteredTasks(filtered);
            }
        };
   
        const activeCategory =
        filteredTasks.length === tasks.length
            ? 'All'
            : filteredTasks[0]?.category;
    const value: TasksContextType = {showPopup,tasksAudio,setShowPopup,title,setTitle,description,setDescription,date,setDate,priority,setPriority,category,setCategory,setTasks,tasks,handleSaveTask,handleTaskCheck, handleDeleteTask,handleEditTask,showTasks,setShowTasks, setIsTaskChecked,isTaskChecked,settingsClick,handleToggleCheck,moveTask,tasksByCategory,filterTasks,setFilteredTasks,filteredTasks,activeCategory};
    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    );
};
export default TasksContext;