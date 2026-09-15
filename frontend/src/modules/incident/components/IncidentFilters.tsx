import type {
  GetIncidentsParams,
  IncidentPriority,
  IncidentSeverity,
  IncidentStatus,
} from "../types/incident.types";

interface IncidentFiltersProps {
  filters: GetIncidentsParams;
  onChange: (filters: GetIncidentsParams) => void;
  onReset: () => void;
}

export default function IncidentFilters({ filters, onChange, onReset }: IncidentFiltersProps) {
  const handleChange = (key: keyof GetIncidentsParams, value: string) => {
    onChange({
      ...filters,
      page: 1,
      [key]: value || undefined,
    });
  };

  const hasFilters =
    Boolean(filters.status) ||
    Boolean(filters.priority) ||
    Boolean(filters.severity) ||
    Boolean(filters.assignedTeamId);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label
            htmlFor="incident-status"
            className="mb-2 block text-sm font-medium text-[#4B3932]"
          >
            Status
          </label>

          <select
            id="incident-status"
            value={filters.status ?? ""}
            onChange={(event) => handleChange("status", event.target.value as IncidentStatus)}
            className="
              w-full
              rounded-xl
              border
              border-[#E7DDD3]
              bg-white
              px-4
              py-3
              text-sm
              text-[#4B3932]
              outline-none
              focus:border-[#4B3932]
            "
          >
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

        <div className="flex-1">
          <label
            htmlFor="incident-priority"
            className="mb-2 block text-sm font-medium text-[#4B3932]"
          >
            Priority
          </label>

          <select
            id="incident-priority"
            value={filters.priority ?? ""}
            onChange={(event) => handleChange("priority", event.target.value as IncidentPriority)}
            className="
              w-full
              rounded-xl
              border
              border-[#E7DDD3]
              bg-white
              px-4
              py-3
              text-sm
              text-[#4B3932]
              outline-none
              focus:border-[#4B3932]
            "
          >
            <option value="">All Priorities</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
            <option value="P4">P4</option>
          </select>
        </div>

        <div className="flex-1">
          <label
            htmlFor="incident-severity"
            className="mb-2 block text-sm font-medium text-[#4B3932]"
          >
            Severity
          </label>

          <select
            id="incident-severity"
            value={filters.severity ?? ""}
            onChange={(event) => handleChange("severity", event.target.value as IncidentSeverity)}
            className="
              w-full
              rounded-xl
              border
              border-[#E7DDD3]
              bg-white
              px-4
              py-3
              text-sm
              text-[#4B3932]
              outline-none
              focus:border-[#4B3932]
            "
          >
            <option value="">All Severities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="incident-team" className="mb-2 block text-sm font-medium text-[#4B3932]">
            Team
          </label>

          <select
            id="incident-team"
            value={filters.assignedTeamId ?? ""}
            onChange={(event) => handleChange("assignedTeamId", event.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-[#E7DDD3]
              bg-white
              px-4
              py-3
              text-sm
              text-[#4B3932]
              outline-none
              focus:border-[#4B3932]
            "
          >
            <option value="">All Teams</option>
          </select>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="
              rounded-xl
              border
              border-[#E7DDD3]
              px-5
              py-3
              text-sm
              font-semibold
              text-[#4B3932]
              transition
              hover:bg-[#FAF6F0]
            "
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
