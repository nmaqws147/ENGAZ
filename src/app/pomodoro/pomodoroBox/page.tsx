'use client';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaUndo } from 'react-icons/fa';
import PomodoroSettings from '../pomodoroSettings/page';
import { usePomodoro } from './PomodoroBoxLogic/page';

const PomodoroBox = () => {
  const {
    pomodoroStart,
    startSession,
    totalSeconds,
    mode,
    getTime,
    resetSession,
    setMode,
    pomodoroSettingsLongBreak,
    pomodoroSettingsTimer,
    setTotalSeconds,
    pomodoroSettingsShortBreak,
    cardsObject,
  } = usePomodoro();

  const getBgColor = () => {
    if (mode === 'short-break') return '#0ea5e9';
    if (mode === 'long-break') return '#22c55e';
    return '#FF6347';
  };

  return (
    <div className="flex justify-center transition-colors duration-500 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          backgroundColor: getBgColor(),
          borderColor:
            mode === 'short-break'
              ? 'rgba(7, 89, 133, 0.7)'
              : mode === 'long-break'
              ? 'rgba(21, 128, 61, 0.7)'
              : 'rgba(185, 28, 28, 0.7)'
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="
          relative
          w-full
          max-w-[650px]
          min-h-[600px]
          rounded-[30px] md:rounded-[40px]
          shadow-[0_25px_60px_rgba(0,0,0,0.25)]
          flex
          flex-col
          items-center
          gap-8
          p-5 md:p-7
          border-b-10px
          mt-3
          dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)]
        "
      >
        <PomodoroSettings />

        {/* Mode Buttons - جعلها تلتف في الشاشات الصغيرة */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <button
            className={`${mode === 'pomodoro' ? 'bg-white/35' : 'bg-white/15'} backdrop-blur-sm cursor-pointer text-white font-semibold p-3 rounded-2xl hover:bg-white/35 transition text-sm md:text-base`}
            onClick={() => {
              setMode('pomodoro');
              setTotalSeconds(pomodoroSettingsTimer * 60);
            }}
          >
            Pomodoro
          </button>

          <button
            className={`${mode === 'short-break' ? 'bg-white/35' : 'bg-white/15'} cursor-pointer backdrop-blur-sm text-white font-semibold p-3 rounded-2xl hover:bg-white/25 transition text-sm md:text-base`}
            onClick={() => {
              setMode('short-break');
              setTotalSeconds(pomodoroSettingsShortBreak * 60);
            }}
          >
            Short Break
          </button>

          <button
            className={`${mode === 'long-break' ? 'bg-white/35' : 'bg-white/15'} cursor-pointer backdrop-blur-sm text-white font-semibold p-3 rounded-2xl hover:bg-white/25 transition text-sm md:text-base`}
            onClick={() => {
              setMode('long-break');
              setTotalSeconds(pomodoroSettingsLongBreak * 60);
            }}
          >
            Long Break
          </button>
        </div>

        {/* Mode Text */}
        <span className="bg-white/15 backdrop-blur-sm text-white font-semibold p-3 rounded-2xl text-center text-sm md:text-base  ">
          {mode === 'pomodoro'
            ? 'Work session'
            : mode === 'short-break'
            ? 'Take a short break, breathe, and reset.'
            : 'You have earned it — relax and recharge for the next round.'}
        </span>

        {/* Icon */}
        <motion.div
          key={mode}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-6xl md:text-7xl"
        >
          {mode === 'short-break' ? '🧊' : mode === 'long-break' ? '🌴' : '🍅'}
        </motion.div>

        {/* Timer */}
        <motion.div className="text-white text-6xl md:text-7xl font-extrabold">
          {getTime(totalSeconds)}
        </motion.div>

        {/* Controls */}
        <div className="flex gap-4">
          <button
            className={`flex items-center gap-2 bg-white dark:bg-slate-100 ${
              mode === 'short-break'
                ? 'text-sky-500'
                : mode === 'long-break'
                ? 'text-green-500'
                : 'text-[#FF6347]'
            } font-bold py-3 px-4 md:py-4 md:px-5 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform text-sm md:text-base`}
            onClick={startSession}
          >
            {pomodoroStart ? <FaPause /> : <FaPlay />}
            {pomodoroStart ? 'Pause' : 'Start'}
          </button>

          <button
            className="flex cursor-pointer items-center gap-2 bg-white/15 dark:bg-black/20 backdrop-blur-sm text-white font-semibold p-3 md:p-4 rounded-2xl hover:bg-white/25 transition text-sm md:text-base"
            onClick={resetSession}
          >
            <FaUndo />
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 w-full mt-auto">
          {cardsObject.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white/25 dark:bg-black/20 rounded-2xl shadow-lg p-4 md:p-5 flex flex-col justify-center items-center gap-2"
            >
              <p className="text-white/80 text-base md:text-lg font-bold">{card.role}</p>
              <h3 className="text-base md:text-lg font-bold text-white text-center">{card.name}</h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PomodoroBox;