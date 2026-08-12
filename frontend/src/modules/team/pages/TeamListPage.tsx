import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Users } from "lucide-react";

import CreateTeamModal from "../components/CreateTeamModal";
import { useTeams } from "../hooks/useTeams";

export default function TeamListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const limit = 5;

  const { data, isLoading, isError } = useTeams({ page, limit, search: search || undefined });

  const teams = data?.items ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4B3932]">Teams</h1>

          <p className="mt-2 text-stone-500">Manage your organization teams.</p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="
            flex
            items-center
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
          Create Team
        </button>
      </div>

      <div className="relative max-w-md">
        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-stone-400
          "
        />

        <input
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search teams..."
          className="
            w-full
            rounded-xl
            border
            border-[#E7DDD3]
            bg-white
            py-3
            pl-11
            pr-4
            text-sm
            outline-none
            transition
            focus:border-[#4B3932]
          "
        />
      </div>

      {isLoading && (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-stone-500">Loading teams...</p>
        </div>
      )}

      {isError && (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-red-500">Failed to load teams.</p>
        </div>
      )}

      {!isLoading && !isError && teams.length === 0 && (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
          <div
            className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-[#F0E7D5]
                text-[#4B3932]
              "
          >
            <Users size={24} />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-[#4B3932]">No teams found</h2>

          <p className="mt-2 text-sm text-stone-500">Create your first team to get started.</p>
        </div>
      )}

      {!isLoading && !isError && teams.length > 0 && (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="divide-y divide-[#E7DDD3]">
            {teams.map((team) => (
              <div
                key={team.id}
                className="
                    flex
                    items-center
                    justify-between
                    px-6
                    py-5
                    transition
                    hover:bg-[#FAF6F0]
                  "
              >
                <div className="flex items-center gap-4">
                  <div
                    className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#F0E7D5]
                        text-[#4B3932]
                      "
                  >
                    <Users size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#4B3932]">{team.name}</h3>

                    <p className="mt-1 text-xs text-stone-500">
                      Created {new Date(team.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/teams/${team.id}`}
                  className="
                      rounded-lg
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-[#4B3932]
                      transition
                      hover:bg-[#F0E7D5]
                    "
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && !isError && pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-stone-500">
            Page {pagination.page} of {pagination.totalPages}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={pagination.page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="
                  rounded-lg
                  border
                  border-[#E7DDD3]
                  px-4
                  py-2
                  text-sm
                  transition
                  hover:bg-[#FAF6F0]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
            >
              Previous
            </button>

            <button
              type="button"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="
                  rounded-lg
                  border
                  border-[#E7DDD3]
                  px-4
                  py-2
                  text-sm
                  transition
                  hover:bg-[#FAF6F0]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
            >
              Next
            </button>
          </div>
        </div>
      )}

      <CreateTeamModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  );
}
