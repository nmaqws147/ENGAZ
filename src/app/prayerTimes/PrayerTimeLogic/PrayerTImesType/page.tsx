
import React from "react"; // السطر ده هو السر

type GregorianDate = {
  date: string; // "09-01-2026"
  day: string;  // "09"
  designation: {
    abbreviated: string; // "AD"
    expanded: string;    // "Anno Domini"
  };
  format: string;        // "DD-MM-YYYY"
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
  date: string; // "20-07-1447"
  day: string;
  designation: {
    abbreviated: string; // "AH"
    expanded: string;    // "Anno Hegirae"
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
  readable: string;   // "09 Jan 2026"
  timestamp: string;  // "1767934800"
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
  offset: Record<string, number>; // Asr, Fajr, etc.
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
    // استعملنا React.ReactNode بدل JSX.Element عشان نريح الدماغ
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