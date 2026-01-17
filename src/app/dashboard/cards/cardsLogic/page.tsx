'use client';
import { useTasks } from "@/app/tasks/tasksLogic/page";
import { usePomodoro } from "@/app/pomodoro/pomodoroBox/PomodoroBoxLogic/page";
import { useFocus } from "@/app/focusMode/focusPage/focusModeLogic/page";
import { useHabit } from "@/app/habitTracker/habitTrackerLogic/habitsStore/page";
import { FaTasks, FaHourglassHalf, FaFire, FaCheckCircle } from 'react-icons/fa';


const useCards = () => {
    const { tasks } = useTasks();
    const { seconds } = useFocus();
    const { sessionsCompleted } = usePomodoro();
    const { habits } = useHabit();

    // active tasks

    const activeTasksCount = tasks.filter(task => !task.isTaskChecked).length;

    // focus hours

    const totalFocusHours = (seconds / 3600).toFixed(1); 

    // calculate habits day streak
    const topHabit = habits.length > 0 
        ? habits.reduce((prev, current) => (current.countDays > prev.countDays ? current : prev), habits[0])
        : { habitTitle: "No Habits Yet", countDays: 0 };

        // sessions per day


    const totalSessionsDone = sessionsCompleted;


    const dashboardStats = {
        activeTasksCount,
        totalFocusHours,
        topHabit: {
            title: topHabit.habitTitle,
            streak: topHabit.countDays
        },
        totalSessionsDone
    };

    const statsConfig = [
            {
                title: "Active Tasks",
                value: dashboardStats.activeTasksCount,
                label: "Tasks to do",
                icon: <FaTasks />,
                borderColor: "border-blue-500",
                color: "text-blue-500",
                bgColor: "bg-blue-500/10",
            },
            {
                title: "Focus Hours",
                value: dashboardStats.totalFocusHours,
                label: "Hours studied",
                icon: <FaHourglassHalf />,
                borderColor: "border-emerald-500",
                color: "text-emerald-500",
                bgColor: "bg-emerald-500/10",
            },
            {
                title: "Best Habit",
                value: dashboardStats.topHabit.streak,
                label: dashboardStats.topHabit.title,
                icon: <FaFire />,
                borderColor: "border-orange-500",
                color: "text-orange-500",
                bgColor: "bg-orange-500/10",
            },
           {
    title: "Sessions",
    value: dashboardStats.totalSessionsDone,
    label: "Sessions Completed",
    icon: <FaCheckCircle />,
    borderColor: "border-[#f43f5e]", 
    color: "text-[#f43f5e]", 
    bgColor: "bg-[#f43f5e]/10", 
}
        ];
    
        const containerVariants = {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
            }
        };
    
        const itemVariants = {
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
        };

    return { dashboardStats,containerVariants,itemVariants,statsConfig };
}

export default useCards;