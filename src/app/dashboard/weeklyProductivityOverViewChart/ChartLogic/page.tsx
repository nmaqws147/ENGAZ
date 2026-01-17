'use client';
import { useMemo , useState} from "react";
import { usePomodoro } from "@/app/pomodoro/pomodoroBox/PomodoroBoxLogic/page";
import { useFocus } from "@/app/focusMode/focusPage/focusModeLogic/page";
const useChart = () => {
    const { weeklySessionsChart } = usePomodoro();
    const { weeklyFocusChart } = useFocus();
    const [isMounted, setIsMounted] = useState(false);
     const combinedData = useMemo(() => {
            const last7Days = [...Array(7)].map((_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - i);
                return d.toISOString().split('T')[0];
            }).reverse();
    
            return last7Days.map(dateStr => {
                const pomoDay = weeklySessionsChart?.find(p => p.date === dateStr);
                const focusDay = weeklyFocusChart?.find(f => f.date === dateStr);
                const dateObj = new Date(dateStr);
                
                return {
                    date: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
                    sessions: Number(pomoDay?.sessions || 0),
                    focusHours: focusDay ? Number((focusDay.totalSeconds / 3600).toFixed(2)) : 0,
                };
            });
        }, [weeklySessionsChart, weeklyFocusChart]);
    return{combinedData,isMounted,setIsMounted}
}
export default useChart;