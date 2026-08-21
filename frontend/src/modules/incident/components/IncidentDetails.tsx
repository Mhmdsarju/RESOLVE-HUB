import { CalendarDays, Clock3, FileText, Users } from "lucide-react";

import type { Incident } from "../types/incident.types";

import IncidentStatusSelect from "./IncidentStatusSelect";
import AssignIncidentTeam from "./AssignIncidentTeam";

interface IncidentDetailsProps {
  incident: Incident;
}

export default function IncidentDetails({ incident }: IncidentDetailsProps) {
  return (
    <div className="space-y-6">
      <div
        className="
          rounded-2xl
          bg-white
          p-5
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:shadow-md
        "
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">Status</p>

            <p className="mt-1 text-sm text-stone-500">Update incident status</p>
          </div>

          <div
            className="
              rounded-xl
              border
              border-[#E7DDD3]
              bg-[#FAF6F0]
              p-1.5
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
