  
import NextPrayer from "../prayerTimes/prayerTimesPage/NextPrayerTime/page";
import CardsUI from "./cards/page";
import TheMostImportantTasks from "./TheMostImportantTasks/page";
import ProductiveOverView from "./weeklyProductivityOverViewChart/page";

const Dashboard = () => {
  
  return (
                <div className="p-4 space-y-8 max-w-7xl mx-auto">
                  <section>
                    <CardsUI />
                  </section>

                  <section className="flex flex-col lg:flex-row gap-6 items-start justify-center text-white">
                    <div className="w-full lg:flex-1">
                      <TheMostImportantTasks />
                    </div>
                    <div className="w-full lg:w-auto flex justify-center">
                      <NextPrayer minimal={true} />
                    </div>
                  </section>
                  <section className="pt-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    <div className="bg-linear-to-b from-white/[0.02] to-transparent rounded-3xl p-1">
                        <ProductiveOverView />
                    </div>
                  </section>
                </div>
  );
};

export default Dashboard;