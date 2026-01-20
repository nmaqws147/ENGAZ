'use client';
import { useHabit } from "../habitTrackerLogic/habitsStore/page";
import Habit from "../habit/page";
type habitPopupProps = {
  setShowHabitPopup: (value: boolean | ((prev: boolean) => boolean)) => void;
  setSubmitClicked?: (value: boolean | ((prev: boolean) => boolean)) => void;
  submitClicked?: boolean;
}
const EmptyPage = ({ setShowHabitPopup, submitClicked, setSubmitClicked }: habitPopupProps) => {
  const {habits} = useHabit();
  console.log(submitClicked);
  return (
    <>
      {habits.length === 0 ? (
        <div className="flex flex-col mt-9 ml-9">
          <div className="w-full max-w-4xءl">
            <div className="flex flex-col items-center justify-center py-16 px-6 from-gray-50 to-indigo-50 rounded-2xl shadow-sm border border-gray-100">

              {/* Icon */}
              <div className="mb-6 relative">
                <div className="w-24 h-24 rounded-full from-indigo-100 to-indigo-50 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full from-indigo-200 to-indigo-100 flex items-center justify-center shadow-inner">
                    <svg
                      className="w-8 h-8 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Text */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                No habits yet
              </h2>
              <p className="text-gray-500 text-center max-w-md mb-10">
                Start building your routine by adding your first habit. Track
                progress, build consistency, and achieve your goals.
              </p>

              {/* Button */}
              <button
                onClick={() => setShowHabitPopup((prev) => !prev)}
                className="group relative inline-flex cursor-pointer items-center justify-center px-8 py-4 overflow-hidden font-medium text-white bg-linear-to-r from-indigo-500 to-indigo-600 rounded-xl hover:from-indigo-600 hover:to-indigo-700 focus:ring-4 focus:ring-indigo-300 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 active:translate-y-0"
              >
                <span className="absolute top-0 left-0 w-full h-full from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>

                <span className="relative flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  <span className="text-lg font-medium">
                    Add your first habit
                  </span>
                </span>

                <span className="absolute top-0 left-0 w-8 h-full bg-white opacity-10 -skew-x-12 transform -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700 ease-in-out"></span>
              </button>
            </div>
          </div>
        </div>
      ):(
        <button
  onClick={
    () => {
      setShowHabitPopup(prev => !prev);
      if (setSubmitClicked) {
        setSubmitClicked(false);
      }
    }
  }
  className="fixed  text-md top-10 right-10 px-6 py-3 cursor-pointer bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
>
  + Add Habit
</button>
      )}
    </>
  );
};

export default EmptyPage;
