'use client';

import { PrayerProvider } from "../prayerTimes/PrayerTimeLogic/page";
import { TasksProvider } from ".././tasks/tasksLogic/taskContext/page";
import { ProjectsProvider } from "../projects/projectsLogic/page";
import { PomodoroProvider } from "../pomodoro/pomodoroBox/PomodoroBoxLogic/page";
import { HabitProvider } from "../habitTracker/habitTrackerLogic/habitsStore/page";
import { FocusProvider } from "../focusMode/focusPage/focusModeLogic/page";

export function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <ProjectsProvider>
      <TasksProvider>
        <PrayerProvider>
          <PomodoroProvider>
            <HabitProvider>
              <FocusProvider>
                {children}
              </FocusProvider>
            </HabitProvider>
          </PomodoroProvider>
        </PrayerProvider>
      </TasksProvider>
    </ProjectsProvider>
  );
}