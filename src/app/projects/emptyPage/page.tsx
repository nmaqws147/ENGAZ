'use client';
import { useProjects } from "../projectsLogic/page";

const ProjectsContainer = () => {
  const { project, setShowProjectsPopup } = useProjects();

  return (
    <>
      {project.length === 0 ? (
        /* الحالة الأولى: لو مفيش مشاريع (Empty Page) */
        <div className="flex flex-col mt-9 ml-9">
          <div className="w-full max-w-4xl">
            <div className="flex flex-col items-center justify-center py-16 px-6 bg-linear-to-br from-gray-50 to-indigo-50 rounded-2xl shadow-sm border border-gray-100">
              <div className="mb-6 relative">
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-200 to-blue-100 flex items-center justify-center shadow-inner">
                    <svg
                      className="w-8 h-8 text-blue-600"
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

              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                No Projects yet
              </h2>
              <p className="text-gray-500 text-center max-w-md mb-10">
                Bring your ideas to life by creating your first project. Organize
                your tasks, collaborate with your team, and turn your vision into
                reality.
              </p>

              <button
                className="group relative inline-flex cursor-pointer items-center justify-center px-8 py-4 overflow-hidden font-medium text-white bg-linear-to-br from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 active:translate-y-0"
                onClick={() => setShowProjectsPopup((prev) => !prev)}
              >
                <span className="relative flex items-center">
                  <svg className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-lg font-medium">Add your first Project</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* الحالة الثانية: لو فيه مشاريع (List View + Fixed Button) */
        <div className="relative">
          {/* الزرار الـ Fixed اللي فوق على اليمين */}
          <button
            onClick={() => setShowProjectsPopup(true)}
            className="fixed top-10 right-10 z-40 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all active:scale-95 font-medium cursor-pointer"
          >
            + Add Project
          </button>
        </div>
      )}
    </>
  );
};

export default ProjectsContainer;