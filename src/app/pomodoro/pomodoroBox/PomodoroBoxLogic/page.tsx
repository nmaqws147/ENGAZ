'use client';
import React, { createContext, useContext, useState, useRef, ReactNode, useEffect , useMemo} from "react";
import { PomodoroContextType , SessionHistory , TimerMode } from "./PomodoroBoxType/page";

const today = new Date().toISOString().split("T")[0];
const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

const getTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export default function PomodoroProvider({ children }: { children: ReactNode }) {
  const pomodoroSound = useRef<HTMLAudioElement | null>(null);
  const pomodoroTimer = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null); 

  const [pomodoroSettingsTimer, setPomodoroSettingsTimer] = useState(() => {
    if (typeof window !== 'undefined') return Number(localStorage.getItem('pomodoroTimer')) || 25;
    return 25;
  });

  const [sessionsCompleted, setSessionsCompleted] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedDate = localStorage.getItem("sessionsDate");
      if (savedDate === today) {
        return Number(localStorage.getItem("sessionsCompleted")) || 0;
      }
    }
    return 0;
  });


  const [mode,setMode] = useState<TimerMode>('pomodoro');

  const [pomodoroSettingsShortBreak, setPomodoroSettingsShortBreak] = useState(5);

  const [pomodoroSettingsLongBreak, setPomodoroSettingsLongBreak] = useState(15);
  

  const [longBreakTime, setLongBreakTime] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedDate = localStorage.getItem("sessionsDate");
      if (savedDate === today) {
        return Number(localStorage.getItem("longBreakTime")) || 4;
      }
    }
    return 4;
  });

  const [pomodoroStart, setPomodoroStart] = useState(false);
  const [showSettings , setShowSettings] = useState(false);

  const [totalSeconds, setTotalSeconds] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedProgress = localStorage.getItem('currentSeconds');
      return savedProgress ? Number(savedProgress) : (Number(localStorage.getItem('pomodoroTimer')) || 25) * 60;
    }
    return 25 * 60;
  });

  const [weeklySessionsChart, setWeeklySessionsChart] = useState<SessionHistory[]>(() => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem("weeklySessions");
        return saved ? JSON.parse(saved) : [];
    }
    return [];
});

  useEffect(() => {
    if (weeklySessionsChart.length > 0) {
        localStorage.setItem("weeklySessions", JSON.stringify(weeklySessionsChart));
    }
}, [weeklySessionsChart]);

  useEffect(() => { localStorage.setItem('pomodoroTimer', pomodoroSettingsTimer.toString()); }, [pomodoroSettingsTimer]);
  useEffect(() => { localStorage.setItem('shortBreak', pomodoroSettingsShortBreak.toString()); }, [pomodoroSettingsShortBreak]);
  useEffect(() => { localStorage.setItem('longBreak', pomodoroSettingsLongBreak.toString()); }, [pomodoroSettingsLongBreak]);
  useEffect(() => { localStorage.setItem('currentSeconds', totalSeconds.toString()); }, [totalSeconds]);
  
  useEffect(() => {
    const savedDate = localStorage.getItem("sessionsDate");
    if (savedDate !== today) {
      setSessionsCompleted(0);
      setLongBreakTime(4);
      localStorage.setItem("sessionsDate", today);
      localStorage.setItem("sessionsCompleted", "0");
      localStorage.setItem("longBreakTime", "4");
    } else {
      localStorage.setItem("sessionsCompleted", sessionsCompleted.toString());
      localStorage.setItem("longBreakTime", longBreakTime.toString());
    }
  }, [sessionsCompleted, longBreakTime]);

  useEffect(() => { pomodoroSound.current = new Audio("sounds/bell-notification-337658.mp3"); }, [pomodoroSettingsTimer]);

    const startSession = () => {
    if (!pomodoroStart) {
        const currentSettings = mode === 'pomodoro' ? pomodoroSettingsTimer : mode === 'short-break' ? pomodoroSettingsShortBreak : pomodoroSettingsLongBreak;
        
        const newStartTime = Date.now() - (currentSettings * 60 - totalSeconds) * 1000;
        
        startTimeRef.current = newStartTime;
        localStorage.setItem("pomodoroStartTime", newStartTime.toString());
        setPomodoroStart(true); 
    } else {
        // Pause
        setPomodoroStart(false);
        startTimeRef.current = null;
        localStorage.removeItem("pomodoroStartTime");
        if (pomodoroTimer.current) clearInterval(pomodoroTimer.current);
    }
};


 useEffect(() => {
    if (!pomodoroStart) return;

    const savedStart = localStorage.getItem("pomodoroStartTime");
    if (savedStart) startTimeRef.current = Number(savedStart);

    if (pomodoroTimer.current) clearInterval(pomodoroTimer.current);

    pomodoroTimer.current = setInterval(() => {
    const currentInitial = mode === 'pomodoro' ? pomodoroSettingsTimer : mode === 'short-break' ? pomodoroSettingsShortBreak : pomodoroSettingsLongBreak;
    
    const elapsed = Math.floor((Date.now() - (startTimeRef.current || Date.now())) / 1000);
    const remaining = (currentInitial * 60) - elapsed;

    if (remaining >= 0) setTotalSeconds(remaining);

    if (remaining <= 0) {
        setTotalSeconds(remaining);
        pomodoroSound.current?.play();
        if (pomodoroTimer.current) clearInterval(pomodoroTimer.current);
        setPomodoroStart(false); 
        localStorage.removeItem("pomodoroStartTime");

        const currentToday = new Date().toISOString().split('T')[0];

        if (mode === 'pomodoro') {
            setSessionsCompleted(prev => prev + 1);

            setWeeklySessionsChart(prev => {
  const currentToday = new Date().toISOString().split('T')[0];
  const dayIndex = prev.findIndex(item => item.date === currentToday);

  if (dayIndex !== -1) {
    const updated = [...prev]; 
    const currentVal = updated[dayIndex].sessions || 0; 
    
    updated[dayIndex] = { 
      ...updated[dayIndex], 
      sessions: currentVal + 1 
    };
    return updated;
  } else {
    return [...prev, { date: currentToday, sessions: 1 }].slice(-7);
  }
});
            console.log(weeklySessionsChart);

            if ((sessionsCompleted + 1) % 4 === 0) { 
                setMode('long-break');
                setTotalSeconds(pomodoroSettingsLongBreak * 60);
            } else {
                setMode('short-break');
                setTotalSeconds(pomodoroSettingsShortBreak * 60);
            }
        } else {
            setMode('pomodoro');
            setTotalSeconds(pomodoroSettingsTimer * 60);
        }
    }
}, 1000);

    return () => {
        if (pomodoroTimer.current) clearInterval(pomodoroTimer.current);
    };
}, [pomodoroStart, mode]); 
  const resetSession = () => {
    setPomodoroStart(false);
    if (pomodoroTimer.current) {
      clearInterval(pomodoroTimer.current);
      pomodoroTimer.current = null;
    }
    startTimeRef.current = null;
    localStorage.removeItem("pomodoroStartTime");

    let originalSeconds = 0;
    if(mode === 'pomodoro') originalSeconds = pomodoroSettingsTimer * 60;
    else if(mode === 'short-break') originalSeconds = pomodoroSettingsShortBreak * 60;
    else originalSeconds = pomodoroSettingsLongBreak * 60;

    setTotalSeconds(originalSeconds);
    setShowSettings(false);
    localStorage.setItem('currentSeconds', originalSeconds.toString());
  };

  const cardsObject = useMemo(() => [
  {
    id: 1, 
    name: 'Sessions Today', 
    role: sessionsCompleted,
    sessionsCompleted: sessionsCompleted 
  },
  {
    id: 2, 
    name: 'Long break time', 
    role: `${sessionsCompleted} out of ${sessionsCompleted === longBreakTime ? setLongBreakTime(prev => prev + 4) : longBreakTime}`,
    sessionsCompleted: sessionsCompleted
  },
], [sessionsCompleted, longBreakTime]);

  return (
    <PomodoroContext.Provider
      value={{
        pomodoroStart,
        startSession,
        resetSession,
        totalSeconds,
        getTime,
        pomodoroSettingsTimer,
        pomodoroSettingsShortBreak,
        pomodoroSettingsLongBreak,
        setPomodoroSettingsTimer,
        setPomodoroSettingsShortBreak,
        setPomodoroSettingsLongBreak,
        mode,
        setMode,
        setTotalSeconds,
        showSettings,
        setShowSettings,
        cardsObject,
        sessionsCompleted,
        weeklySessionsChart
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (!context) throw new Error("usePomodoroContext must be used within a PomodoroProvider");
  return context;
};