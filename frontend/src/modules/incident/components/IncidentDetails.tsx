import { CalendarDays, FileText, Users, Clock3 } from "lucide-react";

import type { Incident } from "../types/incident.types";

import IncidentStatusSelect from "./IncidentStatusSelect";
import AssignIncidentTeam from "./AssignIncidentTeam";

interface IncidentDetailsProps {
  incident: Incident;
}

const severityStyles = {
  LOW: "bg-green-100 text-green-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-orange-100 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700",
} as const;

const priorityStyles = {
  P1: "bg-red-100 text-red-700",
  P2: "bg-orange-100 text-orange-700",
  P3: "bg-yellow-100 text-yellow-700",
  P4: "bg-stone-100 text-stone-700",
} as const;

export default function IncidentDetails({ incident }: IncidentDetailsProps) {
  return (
    <div className="space-y-6">
      <div
        className="
          group
          rounded-2xl
          bg-white
          p-6
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-lg
        "
      >
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  transition-all
                  duration-200
                  hover:scale-105
                  ${severityStyles[incident.severity]}
                `}
              >
                {incident.severity}
              </span>

              {incident.priority && (
                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    transition-all
                    duration-200
                    hover:scale-105
                    ${priorityStyles[incident.priority]}
                  `}
                >
                  {incident.priority}
                </span>
              )}

              <span
                className="
                  rounded-full
                  bg-[#F0E7D5]
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-[#4B3932]
                  transition-all
                  duration-200
                  hover:scale-105
                  hover:bg-[#E7DDD3]
                "
              >
                {incident.type}
              </span>
            </div>

            <h1
              className="
                mt-4
                text-2xl
                font-bold
                text-[#4B3932]
                transition-transform
                duration-300
                group-hover:translate-x-0.5
              "
            >
              {incident.title}
            </h1>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-stone-400">Incident ID:</span>

              <span
                className="
                  max-w-[320px]
                  truncate
                  text-sm
                  font-medium
                  text-stone-500
                "
                title={incident.id}
              >
                {incident.id}
              </span>
            </div>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-[#E7DDD3]
              bg-[#FAF6F0]
              p-2
              transition-all
              duration-300
              hover:border-[#D8C9BD]
              hover:bg-[#F0E7D5]
            "
          >
            <IncidentStatusSelect incident={incident} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div
          className="
            group
            rounded-2xl
            bg-white
            p-6
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
            lg:col-span-2
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#F0E7D5]
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <FileText size={19} className="text-[#4B3932]" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#4B3932]">Description</h2>

              <p className="text-xs text-stone-400">Incident details and context</p>
            </div>
          </div>

          <div
            className="
              mt-5
              rounded-xl
              border
              border-transparent
              bg-[#FAF6F0]
              p-5
              transition-all
              duration-300
              group-hover:border-[#E7DDD3]
              group-hover:bg-[#F7F0E8]
            "
          >
            <p className="whitespace-pre-wrap text-sm leading-7 text-stone-600">
              {incident.description || "No description provided."}
            </p>
          </div>
        </div>

        <div
          className="
            group
            rounded-2xl
            bg-white
            p-6
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#F0E7D5]
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <Users size={19} className="text-[#4B3932]" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#4B3932]">Team</h2>

              <p className="text-xs text-stone-400">Assigned response team</p>
            </div>
          </div>

          <div className="mt-4">
            <AssignIncidentTeam incident={incident} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          className="
            group
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[#F0E7D5]
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <CalendarDays size={16} className="text-[#4B3932]" />
            </div>

            <span className="text-xs font-medium text-stone-500">Created</span>
          </div>

          <p className="mt-4 text-sm font-semibold text-[#4B3932]">
            {new Date(incident.createdAt).toLocaleString()}
          </p>
        </div>

        <div
          className="
            group
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[#F0E7D5]
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <FileText size={16} className="text-[#4B3932]" />
            </div>

            <span className="text-xs font-medium text-stone-500">Incident Type</span>
          </div>

          <p className="mt-4 text-sm font-semibold text-[#4B3932]">{incident.type}</p>
        </div>

        <div
          className="
            group
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[#F0E7D5]
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <Clock3 size={16} className="text-[#4B3932]" />
            </div>

            <span className="text-xs font-medium text-stone-500">Last Updated</span>
          </div>

          <p className="mt-4 text-sm font-semibold text-[#4B3932]">
            {new Date(incident.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
