
import  JournalProvider  from "./JournalingLogic/page";
import JournalEditor from "./JournalingUI/page";
import JournalEntries from "./JournalingUI/JournalingEntries/page";


const Journaling = () => {
  return (
    <>
    <JournalProvider>
        <JournalEditor/>
        <JournalEntries/>
    </JournalProvider>
    </>
  );
};

export default Journaling;