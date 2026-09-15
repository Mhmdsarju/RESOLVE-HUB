import { AlertCircle } from "lucide-react";

import IncidentCard from "./IncidentCard";

import type { Incident } from "../types/incident.types";

interface IncidentListProps {
  incidents: Incident[];
  isLoading?: boolean;
  isError?: boolean;
  onIncidentClick?: (incident: Incident) => void;
}

export default function IncidentList({  incidents,  isLoading = false,  isError = false,  onIncidentClick,}: IncidentListProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-stone-500">Loading incidents...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertCircle size={22} />
        </div>

        <p className="mt-4 font-medium text-[#4B3932]">Failed to load incidents</p>

        <p className="mt-1 text-sm text-stone-500">
          Something went wrong while fetching incidents.
        </p>
      </div>
    );
  }

  if (incidents.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F0E7D5] text-[#4B3932]">
          <AlertCircle size={22} />
        </div>

        <p className="mt-4 font-medium text-[#4B3932]">No incidents found</p>

        <p className="mt-1 text-sm text-stone-500">
          There are no incidents matching the current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {incidents.map((incident) => (
        <IncidentCard
          key={incident.id}
          incident={incident}
          onClick={() => onIncidentClick?.(incident)}
        />
      ))}
    </div>
  );
}
