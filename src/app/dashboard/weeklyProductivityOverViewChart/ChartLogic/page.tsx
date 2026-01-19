'use client';
import { useMemo, useState, useEffect } from "react"; // أضفنا useEffect
import { usePomodoro } from "@/app/pomodoro/pomodoroBox/PomodoroBoxLogic/page";
import { useFocus } from "@/app/focusMode/focusPage/focusModeLogic/page";

interface PomoSession {
    date: string;
    sessions: number;
}

interface FocusSession {
    date: string;
    totalSeconds: number;
}
export const useChart = () => {
    const { weeklySessionsChart } = usePomodoro() as { weeklySessionsChart: PomoSession[] };
    const { weeklyFocusChart } = useFocus() as { weeklyFocusChart: FocusSession[] };
    const [isMounted, setIsMounted] = useState(false);

    // تحديث حالة الـ Mounted لحل مشكلة الـ Hydration لاحقاً
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const combinedData = useMemo(() => {
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        return last7Days.map(dateStr => {
            // هنا قمنا بتعريف النوع (p: PomoSession) لحل خطأ الـ any
            const pomoDay = weeklySessionsChart?.find((p: PomoSession) => p.date === dateStr);
            const focusDay = weeklyFocusChart?.find((f: FocusSession) => f.date === dateStr);
            const dateObj = new Date(dateStr);

            return {
                date: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
                sessions: Number(pomoDay?.sessions || 0),
                focusHours: focusDay ? Number((focusDay.totalSeconds / 3600).toFixed(2)) : 0,
            };
        });
    }, [weeklySessionsChart, weeklyFocusChart]);

    return { combinedData, isMounted, setIsMounted };
}

// 3. الـ Default Export الإجباري لـ Next.js
export default function ChartLogicPage() {
    return null;
}