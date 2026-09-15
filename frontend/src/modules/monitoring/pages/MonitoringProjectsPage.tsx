import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderKanban, Plus, Search, RefreshCw } from "lucide-react";

import MonitoringProjectList from "../components/MonitoringProjectList";
import CreateMonitoringProjectModal from "../components/CreateMonitoringProjectModal";

import { useMonitoringProjects } from "../hooks/useMonitoringProjects";

import type { MonitoringProject } from "../types/monitoringProject.types";

const DEFAULT_PARAMS = {
  page: 1,
  limit: 9,
};

export default function MonitoringProjectsPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useMonitoringProjects({
    page,
    limit: DEFAULT_PARAMS.limit,
  });

  const filteredProjects = useMemo(() => {
    const projects = data?.data ?? [];

    const query = search.trim().toLowerCase();

    if (!query) {
      return projects;
    }

    return projects.filter(
      (project: MonitoringProject) =>
        project.name.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query),
    );
  }, [data?.data, search]);

  const handleProjectClick = (project: MonitoringProject) => {
    navigate(`/monitoring/${project.id}`);
  };

  const handlePreviousPage = () => {
    if (page <= 1) {
      return;
    }

    setPage((current) => current - 1);
  };

  const handleNextPage = () => {
    if (!data || page >= data.totalPages) {
      return;
    }

    setPage((current) => current + 1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[#F0E7D5]
              text-[#4B3932]
              shadow-sm
            "
          >
            <FolderKanban size={23} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#4B3932]">Monitoring Projects</h1>

            <p className="mt-1 text-sm text-stone-500">
              Organize and manage your monitoring projects.
            </p>
          </div>
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
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#3B2E29]
            hover:shadow-lg
          "
        >
          <Plus size={18} />
          Create Project
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          className="
            rounded-2xl
            border
            border-[#E7DDD3]
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-md
          "
        >
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
            Total Projects
          </p>

          <p className="mt-2 text-2xl font-bold text-[#4B3932]">{data?.total ?? 0}</p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-[#E7DDD3]
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-md
          "
        >
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">Current Page</p>

          <p className="mt-2 text-2xl font-bold text-[#4B3932]">{data?.page ?? page}</p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-[#E7DDD3]
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-md
          "
        >
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">Total Pages</p>

          <p className="mt-2 text-2xl font-bold text-[#4B3932]">{data?.totalPages ?? 0}</p>
        </div>
      </div>

      <div
        className="
          flex
          flex-col
          gap-3
          rounded-2xl
          border
          border-[#E7DDD3]
          bg-white
          p-4
          shadow-sm
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="relative w-full sm:max-w-md">
          <Search
            size={18}
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-stone-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search projects..."
            className="
              w-full
              rounded-xl
              border
              border-[#E7DDD3]
              bg-[#FAF6F0]
              py-2.5
              pl-10
              pr-4
              text-sm
              text-[#4B3932]
              outline-none
              transition-all
              duration-200
              placeholder:text-stone-400
              hover:border-[#D8C9BD]
              focus:border-[#4B3932]
              focus:bg-white
              focus:ring-2
              focus:ring-[#4B3932]/10
            "
          />
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isLoading}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#E7DDD3]
            px-4
            py-2.5
            text-sm
            font-medium
            text-[#4B3932]
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-[#FAF6F0]
            hover:shadow-sm
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <MonitoringProjectList
        projects={filteredProjects}
        isLoading={isLoading}
        isError={isError}
        onProjectClick={handleProjectClick}
      />

      {!isLoading && !isError && data && data.totalPages > 1 && (
        <div
          className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-[#E7DDD3]
              bg-white
              px-5
              py-4
              shadow-sm
            "
        >
          <p className="text-sm text-stone-500">
            Page <span className="font-semibold text-[#4B3932]">{page}</span> of{" "}
            <span className="font-semibold text-[#4B3932]">{data.totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePreviousPage}
              disabled={page <= 1}
              className="
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-[#4B3932]
                  transition-all
                  duration-200
                  hover:bg-[#FAF6F0]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
            >
              Previous
            </button>

            <button
              type="button"
              onClick={handleNextPage}
              disabled={page >= data.totalPages}
              className="
                  rounded-xl
                  bg-[#4B3932]
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  transition-all
                  duration-200
                  hover:bg-[#3B2E29]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
            >
              Next
            </button>
          </div>
        </div>
      )}

      <CreateMonitoringProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
