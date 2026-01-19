'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export default function ProjectsProvider  ({ children }: { children: ReactNode })  {
  const [showProjectsPopup, setShowProjectsPopup] = useState(false);
  const [editingProjectId,setEditingProjectId] = useState("");
  const [onToggle,setOnToggle] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [settingsClick, setSettingsClick] = useState<boolean>(false);
  const [priority, setPriority] = useState("Medium Priority");
  const [date, setDate] = useState("");
  // 1. استرجاع البيانات من localStorage عند تحميل الصفحة لأول مرة
  const [project, setProject] = useState<Project[]>(() => {
    if (typeof window !== 'undefined') {
      const savedProjects = localStorage.getItem("my_projects");
      return savedProjects ? JSON.parse(savedProjects) : [];
    }
    return [];
  });
  
  useEffect(() => {
    localStorage.setItem("my_projects", JSON.stringify(project));
  }, [project]);

  const handleEditProject = (projectId: string) => {
        const editProject = project.find(item => item.id === projectId);
        if (editProject) {
            setTitle(editProject.title);
            setDesc(editProject.desc);
            setDate(editProject.date);
            setPriority(editProject.priority);
            setEditingProjectId(projectId); 
            setShowProjectsPopup(true);
        }
    }
  
  const handleSavedProject = () => {
  if (title.trim() && desc.trim()) {
    if (editingProjectId !== "") {
      setProject(prev =>
        prev.map(item =>
          item.id === editingProjectId
            ? { ...item, title, desc, priority, date } // تحديث البيانات
            : item
        )
      );
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        title,
        desc,
        priority,
        date,
        createdAt: new Date(),
        settingsClick: false,
      };
      setProject(prev => [...prev, newProject]);
    }

    // 3. تنظيف الحقول وإغلاق البوب أب
    setTitle("");
    setDesc("");
    setPriority("Medium Priority");
    setDate("");
    setEditingProjectId(""); // مهم جداً تصفر الـ ID بعد الحفظ
    setShowProjectsPopup(false);
  } else {
    alert("Please fill in the title and description");
  }
};
  
    const [selectedProjectId,setSelectedProjectId] = useState("");


    const handleDeleteProject = (projectId: string) => {
         setProject(prev => {
        const newProjects = prev.filter(task => task.id !== projectId);
        localStorage.setItem('my_projects', JSON.stringify(newProjects)); 
        return newProjects;
    });
    }
    const handleToggleCheck = (projectId: string) => {
    setProject(prev =>
        prev.map(p =>
            p.id === projectId 
                ? { ...p, settingsClick: !p.settingsClick} 
                : { ...p, settingsClick: false }  
        )
    );
}
  return (
    <ProjectsContext.Provider 
      value={{ 
        project, 
        handleSavedProject, 
        showProjectsPopup, 
        setShowProjectsPopup, 
        setTitle, 
        setDate, 
        setDesc, 
        setPriority,
        setSelectedProjectId,
        selectedProjectId,
        setProject,
        setOnToggle,
        onToggle,
        handleDeleteProject,
        handleEditProject,
        handleToggleCheck
     }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};