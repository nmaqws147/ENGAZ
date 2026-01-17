import PomodoroBox from "./pomodoroBox/page";
import PomodoroSettings from "./pomodoroSettings/page";
import { PomodoroProvider } from "./pomodoroBox/PomodoroBoxLogic/page";
const Pomodoro = () => {
    return (
        <>
        <PomodoroProvider>
            <PomodoroBox/>
        </PomodoroProvider>
        </>
    );
}
export default Pomodoro;