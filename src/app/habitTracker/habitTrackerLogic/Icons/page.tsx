
import { FaBullseye,FaCode,FaBook,FaDumbbell,FaGamepad   ,FaMosque, FaTint,  FaRunning, FaBed, FaGuitar, FaPalette, FaPen, FaBrain, FaPrayingHands } from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";
type Icon = {
    id: number;
    icon: string;
    label: string;
    component: React.ReactElement
};

const useIcons = ():Icon[][] => {
    const icons = [
    { id: 1, icon: "🎯", label: 'Goal', component: <FaBullseye /> },
    { id: 2, icon: "📚", label: 'Reading', component: <FaBook /> },
    { id: 3, icon: "💧", label: 'Hydration', component: <FaTint /> },
    { id: 4, icon: "🏃‍♂️", label: 'Exercise', component: <FaRunning /> },
    { id: 5, icon: "😴", label: 'Sleep', component: <FaBed /> },
    { id: 6, icon: "🧘‍♂️", label: 'Meditation', component: <GiMeditation /> },
    { id: 7, icon: "🎨", label: 'Art', component: <FaPalette /> },
    { id: 8, icon: "🎸", label: 'Music', component: <FaGuitar /> },
    { id: 9, icon: "🧠", label: 'Learning', component: <FaBrain /> },
    { id: 10, icon: "🙏", label: 'Spirituality', component: <FaPrayingHands /> },
    { id: 11, icon: "✏️", label: 'Writing', component: <FaPen /> },
    { id: 12, icon: "🕌", label: 'Mosque', component: <FaMosque /> },
    { id: 13, icon: "🏋️‍♂️", label: 'Workout', component: <FaDumbbell /> },
    { id: 14, icon: "💻", label: 'Coding', component: <FaCode /> },
    { id: 15, icon: "🎮", label: 'Gaming', component: <FaGamepad /> },
    { id: 15, icon: "🍽️", label: 'Gaming', component: <FaGamepad /> },
    { id: 15, icon: "☕", label: 'Gaming', component: <FaGamepad /> },
    ];
    return [icons];
}
export default useIcons;