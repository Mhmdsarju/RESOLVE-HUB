import { FolderOpen } from "lucide-react";

import MonitoringProjectCard from "./MonitoringProjectCard";

import type {  MonitoringProjectListProps} from "../types/monitoringProject.types";


export default function MonitoringProjectList({  projects,  isLoading,  isError,  onProjectClick,}: MonitoringProjectListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="
                h-52
                animate-pulse
                rounded-2xl
                bg-white
                shadow-sm
              "
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-red-100
          bg-red-50
          p-8
          text-center
        "
      >
        <p className="text-sm font-medium text-red-600">Failed to load monitoring projects.</p>

        <p className="mt-1 text-xs text-red-400">Please try again later.</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-dashed
          border-[#D8C9BD]
          bg-white
          px-6
          py-16
          text-center
          shadow-sm
        "
      >
        <div
          className="
            mx-auto
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-[#F0E7D5]
            text-[#4B3932]
          "
        >
          <FolderOpen size={25} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-[#4B3932]">No monitoring projects</h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-500">
          Create your first monitoring project to start organizing your monitoring setup.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <MonitoringProjectCard key={project.id} project={project} onClick={onProjectClick} />
      ))}
    </div>
  );
}
