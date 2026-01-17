
type TimerMode = 'pomodoro' | 'short-break' | 'long-break';
type PomodoroContextType = {
  pomodoroStart: boolean;
  totalSeconds: number;
  pomodoroSettingsTimer: number;
  pomodoroSettingsShortBreak: number;
  pomodoroSettingsLongBreak: number;
  startSession: () => void;
  resetSession: () => void;
  getTime: (totalSeconds: number) => string;
  setPomodoroSettingsTimer: React.Dispatch<React.SetStateAction<number>>;
  setPomodoroSettingsShortBreak: React.Dispatch<React.SetStateAction<number>>;
  setPomodoroSettingsLongBreak: React.Dispatch<React.SetStateAction<number>>;
  mode: TimerMode;
  setMode: React.Dispatch<React.SetStateAction<TimerMode>>;
  setTotalSeconds: React.Dispatch<React.SetStateAction<number>>
  showSettings: boolean;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  cardsObject: {
    id: number;
    name: string;
    role: number | string;
}[]
  sessionsCompleted: number;
  weeklySessionsChart: SessionHistory[];
}
 type SessionHistory = {
  date: string;
  sessions: number;
}