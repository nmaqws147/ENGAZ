export type FocusContextType =  {
    seconds: number;
    startSession: boolean;
    rainSoundOn: boolean;
    wavesSoundOn: boolean;
    windSoundOn: boolean;
    focusSounds: (type: string) => void;
    startSessionHandler: () => void;
    resetSession: () => void;
    formatTime: (total: number) => string;
    weeklyFocusChart: focusChart[];
}

export type focusChart = {
    date: string;
    totalSeconds: number;
}

export default function FocusTypePage() {
    return null;
}