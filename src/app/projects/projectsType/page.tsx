type ProjectsContextType = {
  showProjectsPopup: boolean;
  setShowProjectsPopup: (value: boolean | ((prev: boolean) => boolean)) => void;
  setTitle: (value: string | ((prev: string) => string)) => void;
  setDesc: (value: string | ((prev: string) => string)) => void;
  setDate: (value: string | ((prev: string) => string)) => void;
  setPriority: (value: string | ((prev: string) => string)) => void;
  project: Project[];
  handleSavedProject: () => void; 
  setSelectedProjectId: (value: string | ((prev: string) => string)) => void;
  selectedProjectId: string;
  setProject: React.Dispatch<React.SetStateAction<Project[]>>
  setOnToggle: (value: boolean | ((prev: boolean) => boolean)) => void;
  onToggle: boolean;
  handleDeleteProject: (projectId: string) => void; 
  handleEditProject: (projectId: string) => void; 
  handleToggleCheck: (projectId: string) => void; 
};
type Project = {
    id: string;
    title: string;
    desc: string;
    priority: string;
    date: string;
    createdAt: Date;
    settingsClick: boolean;
}
type Task = {
  id: string;
  title: string;
  projectId: string | null;
  completed: boolean;
};