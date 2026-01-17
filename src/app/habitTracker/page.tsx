'use client';
import EmptyPage from "./emptyPage/page";
import HabitPopup from "./habitPopup/page";
import { HabitProvider } from "./habitTrackerLogic/habitsStore/page";
import { useState } from "react";
const HabitTracker = () => {
  const [showHabitPopup,setShowHabitPopup] = useState(false);
  const [submitClicked,setSubmitClicked] = useState<boolean>(false);
  console.log(submitClicked);
  console.log(showHabitPopup);
  return (
   <>
   <HabitProvider>
   <EmptyPage setShowHabitPopup={setShowHabitPopup} submitClicked={submitClicked} setSubmitClicked={setSubmitClicked}/>
   <HabitPopup showHabitPopup={showHabitPopup} 
   setShowHabitPopup={setShowHabitPopup} 
   setSubmitClicked={setSubmitClicked} 
   submitClicked={submitClicked}
    />
  </HabitProvider>
   </>
  );
}

export default HabitTracker;