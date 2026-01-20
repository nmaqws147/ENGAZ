import EmptyPage from "./emptyPage/page";
import TasksPopup from "./tasksPopup/page";
import TasksPage from "./tasksPage/page";
import { TasksProvider } from "@/app/tasks/_tasksLogic/taskContext/page";
import  ProjectsProvider  from "../projects/projectsLogic/page";
const Tasks = () => {
    return (
    <ProjectsProvider>
        <TasksProvider>
        <div className="bg-gray-50 dark:bg-black">
            <EmptyPage/>
            <TasksPage/>
            <TasksPopup/>   
        </div>
        </TasksProvider>
    </ProjectsProvider>
    )
}
export default Tasks;