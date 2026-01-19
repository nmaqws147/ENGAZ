import React from "react"; 

type GregorianDate = {
  date: string; 
  day: string;  
  designation: {
    abbreviated: string; 
    expanded: string;    
  };
  format: string;        
  lunarSighting: boolean;
  month: {
    number: number;
    en: string;
  };
  weekday: {
    en: string;
  };
  year: string;
};

type HijriDate = {
  adjustedHolidays: unknown[];
  date: string; 
  day: string;
  designation: {
    abbreviated: string; 
    expanded: string;    
  };
  format: string;
  holidays: unknown[];
  method: string;
  
  month: {
    number: number;
    en: string;
    ar: string;
    days: number;
  };
  weekday: {
    en: string;
    ar: string;
  };
  year: string;
};

type DateInfo = {
  readable: string;   
  timestamp: string;  
  gregorian: GregorianDate;
  hijri: HijriDate;
};

type Timings = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Sunset: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
};

type Meta = {
  latitude: number;
  longitude: number;
  timezone: string;
  method: {
    id: number;
    name: string;
    params: Record<string, unknown>;
    location: Record<string, unknown>;
  };
  latitudeAdjustmentMethod: string;
  midnightMode: string;
  offset: Record<string, number>; 
  school: string;
};

export type PrayerTimesResponse = {
  code: number;
  status: string;
  data: {
    date: DateInfo;
    timings: Timings;
    meta: Meta;
  };
};

export type PrayerContextType = {
    prayerTimesData: PrayerTimesResponse | null;
    prayerCards: { name: string; time: string; icon: React.ReactNode }[];
    nextPrayer: { name: string; time: string; icon: React.ReactNode } | null;
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
    timeLeft: string;
    setTimeLeft: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
}

export default function PrayerTypePage() {
    return null;
}