import useHabit from "../habitTrackerLogic/habitsStore/page";
type HabitProps = {
    submitClicked: boolean;
}
const Habit = ({submitClicked}:HabitProps) => {
    const{habits} = useHabit();
    console.log('Total habits now:', habits.length);
    return (
        <>
            {
                submitClicked && habits.map((habit,index) => (
                    <div key={index} style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
                        <h2>{habit.habitTitle}</h2>
                        <p>{habit.habitDescription}</p>
                        <div>{habit.icon}</div>
                        <div style={{backgroundColor: habit.color, width: '50px', height: '50px'}}></div>
                    </div>
                ))
            }
        </>
    );
}
export default Habit;