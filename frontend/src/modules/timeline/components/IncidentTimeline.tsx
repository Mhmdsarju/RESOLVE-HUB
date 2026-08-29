import { Clock3 } from "lucide-react";

import { useIncidentTimeline } from "../hooks/useIncidentTimeline";

interface IncidentTimelineProps {
  incidentId: string;
}

export default function IncidentTimeline({ incidentId }: IncidentTimelineProps) {
  const { data: timelineEvents, isLoading, isError } = useIncidentTimeline(incidentId);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-[#E7DDD3] bg-white p-5">
        <p className="text-sm text-stone-500">Loading timeline...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-[#E7DDD3] bg-white p-5">
        <p className="text-sm text-red-500">Failed to load incident timeline.</p>
      </div>
    );
  }

  if (!timelineEvents?.length) {
    return (
      <div className="rounded-2xl border border-[#E7DDD3] bg-white p-5">
        <div className="flex items-center gap-2">
          <Clock3 size={18} className="text-[#4B3932]" />

          <h2 className="text-lg font-bold text-[#4B3932]">Timeline</h2>
        </div>

        <p className="mt-4 text-sm text-stone-500">No timeline events yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E7DDD3] bg-white p-5">
      <div className="flex items-center gap-2">
        <Clock3 size={18} className="text-[#4B3932]" />

        <h2 className="text-lg font-bold text-[#4B3932]">Timeline</h2>
      </div>

      <div className="mt-5 space-y-5">
        {timelineEvents.map((event) => (
          <div key={event.id} className="relative flex gap-4">
            <div className="flex shrink-0 flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-[#4B3932]" />

              <div className="mt-1 h-full w-px bg-[#E7DDD3]" />
            </div>

            <div className="min-w-0 pb-2">
              <p className="text-sm font-semibold text-[#4B3932]">{event.message}</p>

              <p className="mt-1 text-xs text-stone-400">
                {new Date(event.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
