
import FocusPage from "./focusPage/page";
import { FocusProvider } from "./focusPage/focusModeLogic/page";
const focusMode = () => {
    return (
        <>
    <FocusProvider>
        <FocusPage />
    </FocusProvider>
        </>
    );
}

export default focusMode;