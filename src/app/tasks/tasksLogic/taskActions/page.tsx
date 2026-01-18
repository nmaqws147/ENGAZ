import { Dispatch, SetStateAction, RefObject } from "react";
import { tasksType } from "../../tasksType/page";

type TaskState = {
    tasks: tasksType[];
    setTasks: Dispatch<SetStateAction<tasksType[]>>;
    setTitle: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    setDate: Dispatch<SetStateAction<string>>;
    setPriority: Dispatch<SetStateAction<string>>;
    setCategory: Dispatch<SetStateAction<string>>;
    setEditingTaskId: Dispatch<SetStateAction<string | null>>;
    setShowPopup: Dispatch<SetStateAction<boolean>>;
    setItemId: Dispatch<SetStateAction<string>>;
    tasksAudio: RefObject<HTMLAudioElement | null>;
    title: string;
    description: string;
    date: string;
    priority: string;
    category: string;
    editingTaskId: string | null;
    itemId: string;
}

export const useTaskActions = (state: TaskState, selectedProjectId: string) => {
    const { 
        tasks, setTasks, setTitle, setDescription, setDate, setPriority, 
        setCategory, setEditingTaskId, setShowPopup, setItemId, tasksAudio,
        title, description, date, priority, category, editingTaskId, itemId 
    } = state;

    const handleTaskCheck = (taskId: string, checked: boolean) => {
        setTasks((prev) => prev.map(task => 
            task.id === taskId ? { ...task, isTaskChecked: checked } : task
        ));
    };

    const handleDeleteTask = (taskId: string) => {
        setTasks((prev) => {
            const newTasks = prev.filter(task => task.id !== taskId);
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            return newTasks;
        });
    };

    const handleEditTask = (taskId: string) => {
        const editTask = tasks.find((task) => task.id === taskId);
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
    };

    const handleSaveTask = () => {
        if (title && description && date && priority && category) {
            const targetProjectId = editingTaskId !== null ? itemId : selectedProjectId;
            if (editingTaskId !== null) {
                setTasks((prev) =>
                    prev.map(task =>
                        task.id === editingTaskId
                            ? { ...task, title, description, date, priority, category, projectId: targetProjectId }
                            : task
                    )
                );
            } else {
                const newTask: tasksType = {
                    id: Date.now().toString(),
                    title, description, date, projectId: targetProjectId,
                    priority, category, isTaskChecked: false, settingsClick: false, itemId,
                };
                setTasks((prev) => [newTask, ...prev]);
            }
            setTitle(''); setDescription(''); setDate('');
            setPriority('Medium Priority'); setCategory('');
            setEditingTaskId(null); setShowPopup(false); setItemId("");
        }
    };

    const handleToggleCheck = (taskId: string) => {
        setTasks((prev) => prev.map(task =>
            task.id === taskId ? { ...task, settingsClick: !task.settingsClick } : { ...task, settingsClick: false }
        ));
    };

    const moveTask = (taskId: string, checked: boolean) => {
        const indexOfElement = tasks.findIndex((t) => t.id === taskId);
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

    return { handleTaskCheck, handleDeleteTask, handleEditTask, handleSaveTask, handleToggleCheck, moveTask };
};