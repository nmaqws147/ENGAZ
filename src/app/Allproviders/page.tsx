'use client';

import  PrayerProvider  from "../prayerTimes/PrayerTimeLogic/page";
import  {TasksProvider}  from ".././tasks/_tasksLogic/taskContext/page";
import  ProjectsProvider  from "../projects/projectsLogic/page";
import  PomodoroProvider  from "../pomodoro/pomodoroBox/PomodoroBoxLogic/page";
import { HabitProvider } from "../habitTracker/habitTrackerLogic/habitsStore/page";
import { FocusProvider } from "../focusMode/focusPage/focusModeLogic/page";
import JournalProvider from "../dailyPlanner/JournalingLogic/page";

export default function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <ProjectsProvider>
      <TasksProvider>
        <PrayerProvider>
          <PomodoroProvider>
            <HabitProvider>
              <FocusProvider>
                <JournalProvider>
                {children}
                </JournalProvider>
              </FocusProvider>
            </HabitProvider>
          </PomodoroProvider>
        </PrayerProvider>
      </TasksProvider>
    </ProjectsProvider>
  );
}