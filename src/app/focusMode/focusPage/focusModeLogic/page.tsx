'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react";
import { FocusContextType,focusChart} from "./focusTypes/page";

const FocusContext = createContext<FocusContextType | undefined>(undefined);

// Custom Hook
export const useFocus = (): FocusContextType => {
    const context = useContext(FocusContext);
    if (!context) {
        throw new Error('useFocus must be used within FocusProvider');
    }
    return context;
};

// Provider
export const FocusProvider = ({ children }: { children: ReactNode }) => {
    const [rainSoundOn, setRainSoundOn] = useState(false);
    const [wavesSoundOn, setWavesSoundOn] = useState(false);
    const [windSoundOn, setWindSoundOn] = useState(false);
    const [startSession, setStartSession] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const startTimeRef = useRef<number | null>(null);

    const [seconds, setSeconds] = useState<number>(0);
    const [weeklyFocusChart, setWeeklyFocusChart] = useState<focusChart[]>(() => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem("weeklyFocusChart");
        return saved ? JSON.parse(saved) : [];
    }
    return [];
});
    
    useEffect(() => {
    localStorage.setItem("weeklyFocusChart", JSON.stringify(weeklyFocusChart));
}, [weeklyFocusChart]);

    console.log(weeklyFocusChart);

    const rainAudio = useRef<HTMLAudioElement | null>(null);
    const wavesAudio = useRef<HTMLAudioElement | null>(null);
    const windAudio = useRef<HTMLAudioElement | null>(null);
    const myTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        rainAudio.current = new Audio("/sounds/calming-rain-257596.mp3");
        wavesAudio.current = new Audio("/sounds/soothing-ocean-waves-372489.mp3");
        windAudio.current = new Audio("/sounds/wind-blowing-sfx-01-423673 (1).mp3");

        [rainAudio, wavesAudio, windAudio].forEach(ref => {
            if (ref.current) ref.current.loop = true;
        });
    }, []);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; 
        const savedSec = localStorage.getItem("focusSeconds");
        const savedStart = localStorage.getItem("focusStartTime");
        const savedDate = localStorage.getItem("focusDate");
        if (savedDate !== today) {
            setSeconds(0);
            localStorage.removeItem("focusSeconds");
            localStorage.removeItem("focusStartTime");
            localStorage.setItem("focusDate", today);
        } else {
            if (savedSec) setSeconds(parseInt(savedSec));

            if (savedStart) {
                const start = Number(savedStart);
                if (start > 0) { 
                    startTimeRef.current = start;
                    setStartSession(true);

                    myTimer.current = setInterval(() => {
                        if (!startTimeRef.current) return;
                        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
                        setSeconds(elapsed);
                        setWeeklyFocusChart(prev => {
        const dayIndex = prev.findIndex(item => item.date === today);

        if (dayIndex !== -1) {
            const updated = [...prev];
            updated[dayIndex] = { ...updated[dayIndex], totalSeconds: elapsed };
            return updated;
        } else {
            return [...prev, { date: today, totalSeconds: elapsed }].slice(-7);
        }
    });
                    }, 1000);
                }
            }
        }
        setIsLoaded(true); 
    }, []);


    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("focusSeconds", seconds.toString());
        }
    }, [seconds, isLoaded]);

    const focusSounds = (soundType: string) => {
        [rainAudio, wavesAudio, windAudio].forEach(ref => ref.current?.pause());

        if (soundType === "rain") {
            if (rainSoundOn) setRainSoundOn(false);
            else {
                rainAudio.current?.play().catch(() => {});
                setRainSoundOn(true);
                setWavesSoundOn(false);
                setWindSoundOn(false);
            }
        } else if (soundType === "waves") {
            if (wavesSoundOn) setWavesSoundOn(false);
            else {
                wavesAudio.current?.play().catch(() => {});
                setWavesSoundOn(true);
                setRainSoundOn(false);
                setWindSoundOn(false);
            }
        } else if (soundType === "wind") {
            if (windSoundOn) setWindSoundOn(false);
            else {
                windAudio.current?.play().catch(() => {});
                setWindSoundOn(true);
                setRainSoundOn(false);
                setWavesSoundOn(false);
            }
        }
    };

    const startSessionHandler = () => {
        if (!startSession) {
            if (!startTimeRef.current) {
                startTimeRef.current = Date.now() - (seconds * 1000);
                localStorage.setItem("focusStartTime", startTimeRef.current.toString());
            }

            setStartSession(true);

            myTimer.current = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTimeRef.current!) / 1000);
                setSeconds(elapsed);
            }, 1000);

        } else {
            setStartSession(false);
            if (myTimer.current) clearInterval(myTimer.current);
            myTimer.current = null;
            startTimeRef.current = null;
            localStorage.removeItem("focusStartTime"); 
        }
    };

    const resetSession = () => {
        setStartSession(false);
        if (myTimer.current) clearInterval(myTimer.current);
        myTimer.current = null;

        setSeconds(0);
        startTimeRef.current = null;
        localStorage.removeItem("focusSeconds");
        localStorage.removeItem("focusStartTime");
    };

    const formatTime = (total: number) => {
        const h = Math.floor(total / 3600).toString().padStart(2, '0');
        const m = Math.floor((total % 3600) / 60).toString().padStart(2, '0');
        const s = (total % 60).toString().padStart(2, '0');
        return `${h} : ${m} : ${s}`;
    };

    const value = {
        seconds,
        startSession,
        rainSoundOn,
        wavesSoundOn,
        windSoundOn,
        focusSounds,
        startSessionHandler,
        resetSession,
        formatTime,
        weeklyFocusChart
    };

    return (
        <FocusContext.Provider value={value}>
            {children}
        </FocusContext.Provider>
    );
};

export default FocusContext;