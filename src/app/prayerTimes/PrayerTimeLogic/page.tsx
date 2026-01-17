'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { PrayerContextType , PrayerTimesResponse} from "./PrayerTImesType/page";
import { FaSun, FaMoon, FaCloudSun } from "react-icons/fa";

const PrayerContext = createContext<PrayerContextType|null>(null);

export const PrayerProvider = ({ children }: { children: ReactNode }) => {
  const [prayerTimesData, setPrayerTimesData] = useState<PrayerTimesResponse|null>(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    async function getPrayerTimes() {
      try {
        const res = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=3");
        const data = await res.json();
        setPrayerTimesData(data);
      } catch (err) { console.error(err); }
    }
    getPrayerTimes();
  }, []);

  if (!prayerTimesData || !prayerTimesData.data) {
    return (
      <PrayerContext.Provider 
        value={{ 
          loading: true,
          prayerTimesData: null,
          prayerCards: [],
          nextPrayer: null,
          timeLeft: "",
          setTimeLeft: () => {},
          Fajr: "", Dhuhr: "", Asr: "", Maghrib: "", Isha: "" 
        }}
      >
        {children}
      </PrayerContext.Provider>
    );
  }

  const { timings } = prayerTimesData.data;
  const { Fajr, Dhuhr, Asr, Maghrib, Isha } = timings;
  const prayerCards = [
    { name: "Fajr", time: Fajr, icon: <FaCloudSun /> },
    { name: "Dhuhr", time: Dhuhr, icon: <FaSun /> },
    { name: "Asr", time: Asr, icon: <FaCloudSun /> },
    { name: "Maghrib", time: Maghrib, icon: <FaMoon /> },
    { name: "Isha", time: Isha, icon: <FaMoon /> },
  ];

  const now = new Date();
  const nextPrayer = prayerCards.find(pray => {
    const [h, m] = pray.time.split(":").map(Number);
    const prayTime = new Date();
    prayTime.setHours(h, m, 0, 0); 
    return prayTime > now;          
  }) || prayerCards[0];

  return (
    <PrayerContext.Provider value={{ prayerTimesData, timeLeft , setTimeLeft,  prayerCards, nextPrayer, Fajr, Dhuhr, Asr, Maghrib, Isha, loading: false }}>
      {children}
    </PrayerContext.Provider>
  );
};

export const usePrayer = () => {
    const context = useContext(PrayerContext);
    
    // لو حد نادى الـ hook بره الـ Provider هيطلعلة error واضح
    if (!context) {
        throw new Error("usePrayer must be used within a PrayerProvider");
    }
    
    return context; // هنا TypeScript هيفهم إن المسترجع دايماً PrayerContextType ومش null
};