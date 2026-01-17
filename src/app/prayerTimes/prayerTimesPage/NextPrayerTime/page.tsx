'use client';
import { useEffect } from "react";
import { FaMosque, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { usePrayer } from "../../PrayerTimeLogic/page";

const NextPrayer = ({ minimal = false }) => {
  const { prayerTimesData, nextPrayer, timeLeft, setTimeLeft } = usePrayer();

  useEffect(() => {
    if (!nextPrayer) return; // تأكد من وجود الصلاة التالية قبل تشغيل التايمر
    const timer = setInterval(() => {
      const now = new Date();
      const [hours, minutes] = nextPrayer.time.split(':').map(Number);
      const prayerTime = new Date();
      prayerTime.setHours(hours, minutes, 0, 0);

      if (prayerTime < now) prayerTime.setDate(prayerTime.getDate() + 1);

      const diff = prayerTime.getTime() - now.getTime();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [nextPrayer, setTimeLeft]);

  if (!nextPrayer || !prayerTimesData) return null;

  if (minimal) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-100 mx-20 max-w-[280px] sm:max-w-sm  flex flex-col items-center justify-center gap-4 p-6 rounded-2xl shadow-xl border transition-all duration-300 
          bg-slate-50 border-slate-200 text-slate-800 
          dark:bg-linear-to-b dark:from-slate-800 dark:to-indigo-950 dark:border-white/10 dark:text-white"
      >
        <div className="p-3 sm:p-4 rounded-full mb-1 sm:mb-2 bg-indigo-100 dark:bg-white/10">
          <FaMosque className="text-3xl sm:text-4xl text-indigo-600 dark:text-indigo-300" />
        </div>
        <div className="text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] opacity-60 mb-1 dark:opacity-50">
            Next Prayer
          </p>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-none">
            {nextPrayer.name}
          </h3>
        </div>
        <div className="w-full space-y-3">
          <div className="flex items-center justify-center gap-2 text-lg sm:text-xl font-semibold text-indigo-700 dark:text-indigo-200">
            <FaClock className="text-xs sm:text-sm opacity-70" />
            <span>{nextPrayer.time}</span>
          </div>
          <div className="flex justify-center items-center flex-col py-2 px-4 rounded-xl sm:rounded-2xl border transition-all bg-white border-indigo-100 shadow-sm dark:bg-indigo-500/20 dark:backdrop-blur-sm dark:border-indigo-500/30">
            <p className="text-[9px] sm:text-[10px] uppercase opacity-50 mb-1 font-bold tracking-wider">
              Time Left
            </p>
            <p className="text-lg sm:text-xl font-mono font-bold text-indigo-600 dark:text-indigo-100 whitespace-nowrap">
              {timeLeft}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
  return (
    <>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative overflow-hidden rounded-[30px] shadow-2xl bg-linear-to-br from-teal-600 via-emerald-500 to-green-500 p-8 text-white text-center"
      >
        <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 bg-black/10 rounded-full blur-3xl" />

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaMosque className="text-8xl mx-auto mb-4 drop-shadow-lg" />
        </motion.div>

        <h2 className="text-2xl uppercase tracking-widest opacity-90 font-medium">
          Next Prayer
        </h2>

        <motion.h1
          key={nextPrayer.name}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-7xl font-black my-2 drop-shadow-md"
        >
          {nextPrayer.name}
        </motion.h1>

        <div className="flex items-center justify-center gap-3 text-3xl font-light mb-6">
          <FaClock className="text-white/80" />
          <span>{nextPrayer.time}</span>
        </div>

        <div className="inline-block bg-white/20 backdrop-blur-md px-8 py-3 rounded-full border border-white/30 shadow-inner">
          <p className="text-sm uppercase tracking-tighter opacity-80">
            Remaining Time
          </p>
          <p className="text-2xl font-mono font-bold">{timeLeft}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-10 max-w-md mx-auto">
          <div className="flex items-center gap-3 bg-black/10 p-3 rounded-xl backdrop-blur-sm">
            <FaMapMarkerAlt className="text-2xl" />
            <div className="text-left">
              <p className="text-xs opacity-70">Location</p>
              <p className="text-sm font-bold text-nowrap">Cairo, Egypt</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-black/10 p-3 rounded-xl backdrop-blur-sm">
            <FaCalendarAlt className="text-2xl" />
            <div className="text-left">
              <p className="text-xs opacity-70">Hijri Date</p>
              <p className="text-sm font-bold text-nowrap">
                {prayerTimesData.data.date.hijri.day}{" "}
                {prayerTimesData.data.date.hijri.month.en}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default NextPrayer;