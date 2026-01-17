'use client';
import PrayerTimesPage from "../prayerTimesPage/page";
import NextPrayer from "../prayerTimesPage/NextPrayerTime/page";
import { usePrayer } from "../PrayerTimeLogic/page";
import Loader from "../prayerTimesPage/Loader/page";
const PrayerTimesContent = () => {
    const {prayerTimesData,nextPrayer} = usePrayer();
      if (!prayerTimesData || !prayerTimesData.data || !nextPrayer) {
    return <Loader />;
  }
    return (
        <div className="p-4">
            <NextPrayer/>
            <PrayerTimesPage/>
        </div>
)
}

export default PrayerTimesContent;
