import EmptyPage from "./emptyPage/page";
import ProjectsPopup from "./projectsPopup/page";
import Project from "./project/page";
import  ProjectsProvider  from "./projectsLogic/page";
import { TasksProvider } from "@/app/tasks/_tasksLogic/taskContext/page";
const Projects = () => {
    return (
        <div>
        <ProjectsProvider>
            <TasksProvider>
            <EmptyPage/>
            <ProjectsPopup/>
            <Project/>
            </TasksProvider>
        </ProjectsProvider>
        </div>
    )
}
export default Projects;