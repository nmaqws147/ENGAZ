'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ... (نفس التعريفات للـ HabitType والـ HabitContextType بدون تغيير)
type HabitType = {
    habitTitle: string;
    habitDescription: string;
    icon: string;
    color: string;
    habitId: number;
    countDays: number;
    outDays: number;
    habitCompletion: boolean[];
};

interface HabitContextType {
    habits: HabitType[];
    habitTitle: string;
    setHabitTitle: (val: string) => void;
    habitDescription: string;
    setHabitDescription: (val: string) => void;
    icon: string;
    setIcon: (val: string) => void;
    color: string;
    setColor: (val: string) => void;
    addHabit: () => void;
    updateHabit: (habitId: number, updates: Partial<HabitType>) => void;
    deleteHabit: (habitId: number) => void;
    clearLocalStorage: () => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);
const LOCAL_STORAGE_KEY = 'habits-data';

// 1. تأكد من أن الـ Provider هو Named Export (موجود بالفعل)
export const HabitProvider = ({ children }: { children: ReactNode }) => {
    const [habits, setHabits] = useState<HabitType[]>([]);
    const [isLoaded, setIsLoaded] = useState(false); 
    const [habitTitle, setHabitTitle] = useState('');
    const [habitDescription, setHabitDescription] = useState('');
    const [icon, setIcon] = useState('📝');
    const [color, setColor] = useState('#4CAF50');

    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                setHabits(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse habits", e);
            }
        }
        setIsLoaded(true); 
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(habits));
        }
    }, [habits, isLoaded]);

    const addHabit = () => {
        if (habitTitle && habitDescription) {
            const newHabit: HabitType = {
                habitId: Date.now(),
                habitTitle,
                habitDescription,
                icon,
                color,
                countDays: 0,
                outDays: 0,
                habitCompletion: [],
            };
            setHabits(prev => [newHabit, ...prev]); 
            setHabitTitle('');
            setHabitDescription('');
            setIcon('📝');
            setColor('#4CAF50');
        }
    };

    const updateHabit = (habitId: number, updates: Partial<HabitType>) => {
        setHabits(prev => prev.map(h => h.habitId === habitId ? { ...h, ...updates } : h));
    };

    const deleteHabit = (habitId: number) => {
        setHabits(prev => prev.filter(h => h.habitId !== habitId));
    };

    const clearLocalStorage = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setHabits([]);
    };

    return (
        <HabitContext.Provider value={{
            habits, habitTitle, setHabitTitle, habitDescription, setHabitDescription,
            icon, setIcon, color, setColor, addHabit, updateHabit, deleteHabit, 
            clearLocalStorage
        }}>
            {children}
        </HabitContext.Provider>
    );
};

// 2. الـ Hook هو أيضاً Named Export
export const useHabit = () => {
    const context = useContext(HabitContext);
    if (!context) throw new Error('useHabitContext must be used within a HabitProvider');
    return context;
};
export default function HabitsLogicPage() {
    return null;
}