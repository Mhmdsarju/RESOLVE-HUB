import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import IncidentFilters from "../components/IncidentFilters";
import IncidentList from "../components/IncidentList";
import IncidentPagination from "../components/IncidentPagination";
import CreateIncidentModal from "../components/CreateIncidentModal";
import { useIncidentStats } from "../hooks/useInsidentStats";
import { useIncidents } from "../hooks/useIncidents";
import IncidentStats from "../components/IncidentStats";

import type { GetIncidentsParams, Incident } from "../types/incident.types";

const DEFAULT_FILTERS: GetIncidentsParams = {
  page: 1,
  limit: 3,
};

export default function IncidentListPage() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<GetIncidentsParams>(DEFAULT_FILTERS);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isLoading, isError } = useIncidents(filters);
  const { data: stats, isLoading: isStatsLoading } = useIncidentStats();

  const incidents = data?.data ?? [];

  const handleFilterChange = (newFilters: GetIncidentsParams) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handlePageChange = (page: number) => {
    setFilters((current) => ({
      ...current,
      page,
    }));
  };

  const handleIncidentClick = (incident: Incident) => {
    navigate(`/incidents/${incident.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#4B3932]">Incidents</h1>

          <p className="mt-1 text-sm text-stone-500">
            Monitor and manage incidents across your organization.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#4B3932]
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#3B2E29]
          "
        >
          <Plus size={18} />
          Create Incident
        </button>
      </div>

      <IncidentStats stats={stats} isLoading={isStatsLoading} />

      <IncidentFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      <IncidentList
        incidents={incidents}
        isLoading={isLoading}
        isError={isError}
        onIncidentClick={handleIncidentClick}
      />

      {data && (
        <IncidentPagination
          page={data.page}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <CreateIncidentModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}
