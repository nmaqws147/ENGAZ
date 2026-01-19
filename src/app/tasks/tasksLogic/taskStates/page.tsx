'use client';
import { useState, useEffect, useRef } from "react";
import { tasksType } from "../../tasksType/page";
export const useTaskState = () => {
    const tasksAudio = useRef<HTMLAudioElement | null>(null);
    const [itemId, setItemId] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState("");
    const [category, setCategory] = useState("Personal");
    const [isTaskChecked, setIsTaskChecked] = useState<boolean>(false);
    const [settingsClick, setSettingsClick] = useState<boolean>(false);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

    const [showTasks, setShowTasks] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem("showTasks");
                return stored ? JSON.parse(stored) : true;
            } catch { return true; }
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
                } catch (error) { return []; }
            }
        }
        return [];
    });

    const [filteredTasks, setFilteredTasks] = useState(tasks);

    useEffect(() => {
        localStorage.setItem("showTasks", JSON.stringify(showTasks));
    }, [showTasks]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        tasksAudio.current = new Audio("/sounds/new-notification-09-352705.mp3");
    }, []);

    return {
        tasksAudio, itemId, setItemId, showPopup, setShowPopup,
        title, setTitle, description, setDescription, date, setDate,
        priority, setPriority, category, setCategory, isTaskChecked, setIsTaskChecked,
        settingsClick, setSettingsClick, editingTaskId, setEditingTaskId,
        tasks, setTasks, filteredTasks, setFilteredTasks, showTasks, setShowTasks
    };
};