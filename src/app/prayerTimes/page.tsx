
import PrayerTimesContent from "./prayerTimesContent/page";
import { PrayerProvider } from "./PrayerTimeLogic/page";
const PrayerTimes = () => {
    return (
    <PrayerProvider>
        <div className="p-4">
          <PrayerTimesContent/>
        </div>
    </PrayerProvider>

)
}

export default PrayerTimes;
