import { CalendarDays, ChevronRight, FileText } from "lucide-react";

import type { MonitoringProject } from "../types/monitoringProject.types";

interface MonitoringProjectCardProps {
  project: MonitoringProject;
  onClick: (project: MonitoringProject) => void;
}

export default function MonitoringProjectCard({ project, onClick }: MonitoringProjectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(project)}
      className="
        group
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-[#E7DDD3]
        bg-white
        p-5
        text-left
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#D8C9BD]
        hover:shadow-xl
        focus:outline-none
        focus:ring-2
        focus:ring-[#4B3932]/10
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#F0E7D5]
              text-[#4B3932]
              shadow-sm
              transition-all
              duration-300
              group-hover:scale-110
              group-hover:shadow-md
            "
          >
            <FileText
              size={21}
              className="
                transition-transform
                duration-300
                group-hover:rotate-3
              "
            />
          </div>

          <div className="min-w-0">
            <h3
              className="
                truncate
                text-base
                font-bold
                text-[#4B3932]
                transition-colors
                duration-200
                group-hover:text-[#3B2E29]
              "
              title={project.name}
            >
              {project.name}
            </h3>

            <p className="mt-1 text-xs font-medium text-stone-400">Monitoring Project</p>
          </div>
        </div>

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-stone-400
            transition-all
            duration-300
            group-hover:bg-[#FAF6F0]
            group-hover:text-[#4B3932]
          "
        >
          <ChevronRight
            size={18}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </div>
      </div>

      <div className="mt-5">
        <div
          className="
            rounded-xl
            bg-[#FAF6F0]
            p-4
            transition-all
            duration-300
            group-hover:bg-[#F7F0E8]
          "
        >
          <p
            className="
              line-clamp-2
              min-h-40
              text-sm
              leading-5
              text-stone-500
            "
          >
            {project.description || "No description provided."}
          </p>
        </div>
      </div>

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          border-t
          border-[#F0E7D5]
          pt-4
        "
      >
        <div className="flex items-center gap-2 text-xs text-stone-400">
          <CalendarDays
            size={14}
            className="
              transition-transform
              duration-300
              group-hover:scale-110
            "
          />

          <span>{new Date(project.createdAt).toLocaleDateString()}</span>
        </div>

        <span
          className="
            rounded-full
            border
            border-green-100
            bg-green-50
            px-2.5
            py-1
            text-[11px]
            font-semibold
            text-green-700
            transition-all
            duration-300
            group-hover:bg-green-100
          "
        >
          Active
        </span>
      </div>

      <div
        className="
          mt-4
          flex
          items-center
          justify-end
          gap-1
          text-xs
          font-medium
          text-stone-400
          transition-all
          duration-300
          group-hover:text-[#4B3932]
        "
      >
        <span>View project</span>

        <ChevronRight
          size={13}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </div>
    </button>
  );
}
