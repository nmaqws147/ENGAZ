'use client';
import { useProjects } from "../../projectsLogic/page";

// 1. لازم نعرف الـ Type بتاع الـ Props هنا
type ProjectSettingsProps = {
    projectId: string;
    onDelete: () => void;
    onEdit: () => void;
    toggle: () => void;
};

// 2. بنمرر الـ Type للـ React.FC
const ProjectSettings: React.FC<ProjectSettingsProps> = ({ onDelete , onEdit , projectId,toggle}) => {
    const {project } = useProjects();
    const projectt = project.find(p => p.id === projectId)
    if (!projectt) return null;
    return (
        <div className="relative flex">
            <svg
                className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer"
                fill="currentColor"
                viewBox="0 0 20 20"
                onClick={toggle}
            >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>

            {projectt.settingsClick && (
                <div className="absolute right-0 dark:bg-gray-700 dark:border-gray-600 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-40">
                    <div className="py-1">
                        <button
                            className="flex items-center w-full px-4 py-2 text-sm text-blue-700 dark:text-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
                            onClick={onEdit}
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </button>

                        <button
                            onClick={onDelete} // 3. استخدام الـ prop هنا
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectSettings;