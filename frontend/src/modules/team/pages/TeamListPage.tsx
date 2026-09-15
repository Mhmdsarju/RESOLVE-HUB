import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus, Search, Users } from "lucide-react";

import CreateTeamModal from "../components/CreateTeamModal";
import { useTeams } from "../hooks/useTeams";

export default function TeamListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const limit = 6;

  const { data, isLoading, isError } = useTeams({
    page,
    limit,
    search: search || undefined,
  });

  const teams = data?.items ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A78B72]">
            Organization
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#4B3932]">Teams</h1>

          <p className="mt-2 text-sm text-stone-500">Manage and access your organization teams.</p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
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
            duration-200
            hover:-translate-y-0.5
            hover:bg-[#3D302A]
            hover:shadow-lg
          "
        >
          <Plus size={18} />
          Create Team
        </button>
      </div>

      <div
        className="
          flex
          flex-col
          gap-4
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
              bg-[#FCFAF7]
              py-3
              pl-11
              pr-4
              text-sm
              text-stone-700
              outline-none
              transition-all
              duration-200
              placeholder:text-stone-400
              hover:border-[#D8C4A8]
              focus:border-[#4B3932]
              focus:bg-white
              focus:ring-4
              focus:ring-[#4B3932]/5
            "
          />
        </div>

        <div className="flex items-center gap-2 px-1 text-xs text-stone-400">
          <Users size={15} />
          <span>
            {pagination?.total ?? teams.length} {pagination?.total === 1 ? "team" : "teams"}
          </span>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="
                min-h-[240px]
                animate-pulse
                rounded-2xl
                border
                border-[#E7DDD3]
                bg-white
                p-6
              "
            >
              <div className="h-14 w-14 rounded-2xl bg-[#F0E7D5]" />
              <div className="mt-7 h-5 w-32 rounded bg-[#F0E7D5]" />
              <div className="mt-3 h-3 w-24 rounded bg-[#F5EFE7]" />
              <div className="mt-8 h-11 w-full rounded-xl bg-[#F5EFE7]" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div
          className="
            rounded-2xl
            border
            border-red-100
            bg-gradient-to-br
            from-red-50
            via-white
            to-white
            p-12
            text-center
            shadow-sm
          "
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-500">
            <Users size={24} />
          </div>

          <p className="mt-4 text-sm font-semibold text-red-600">Failed to load teams</p>

          <p className="mt-1 text-xs text-red-400">Please try again later.</p>
        </div>
      )}

      {!isLoading && !isError && teams.length === 0 && (
        <div
          className="
            rounded-2xl
            border
            border-[#E7DDD3]
            bg-gradient-to-br
            from-white
            via-white
            to-[#FAF6F0]
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
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-[#F0E7D5]
              to-[#E8D9C0]
              text-[#4B3932]
              shadow-sm
            "
          >
            <Users size={26} />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-[#4B3932]">No teams found</h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-stone-500">
            {search
              ? "No teams match your search. Try a different team name."
              : "Create your first team to get started."}
          </p>
        </div>
      )}

      {!isLoading && !isError && teams.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {teams.map((team) => (
            <div
              key={team.id}
              className="
                group
                relative
                flex
                min-h-[240px]
                flex-col
                overflow-hidden
                rounded-2xl
                border
                border-[#E7DDD3]
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#D8C4A8]
                hover:shadow-xl
              "
            >
              <div
                className="
                  absolute
                  -right-12
                  -top-12
                  h-32
                  w-32
                  rounded-full
                  bg-[#F0E7D5]
                  opacity-50
                  blur-3xl
                  transition-all
                  duration-300
                  group-hover:scale-125
                  group-hover:opacity-80
                "
              />

              <div className="relative flex items-start justify-between">
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#F0E7D5]
                    to-[#E8D9C0]
                    text-[#4B3932]
                    shadow-sm
                    transition-all
                    duration-300
                    group-hover:scale-105
                    group-hover:shadow-md
                  "
                >
                  <Users size={24} strokeWidth={1.8} />
                </div>

                <span
                  className="
                    rounded-full
                    border
                    border-[#E7DDD3]
                    bg-[#FCFAF7]
                    px-3
                    py-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-stone-500
                  "
                >
                  Team
                </span>
              </div>

              <div className="relative mt-7">
                <h3 className="truncate text-xl font-bold tracking-tight text-[#4B3932]">
                  {team.name}
                </h3>

                <p className="mt-2 text-xs text-stone-400">
                  Created {new Date(team.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="relative mt-auto pt-7">
                <Link
                  to={`/teams/${team.id}`}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-[#E7DDD3]
                    bg-[#FCFAF7]
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-[#4B3932]
                    transition-all
                    duration-200
                    group-hover:border-[#D8C4A8]
                    hover:border-[#4B3932]
                    hover:bg-[#4B3932]
                    hover:text-white
                  "
                >
                  <span>View Team</span>

                  <ArrowRight
                    size={17}
                    className="
                      transition-transform
                      duration-200
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && !isError && pagination && pagination.totalPages > 1 && (
        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-[#E7DDD3]
            pt-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p className="text-sm text-stone-500">
            Page <span className="font-semibold text-[#4B3932]">{pagination.page}</span> of{" "}
            <span className="font-semibold text-[#4B3932]">{pagination.totalPages}</span>
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={pagination.page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
                px-4
                py-2.5
                text-sm
                font-medium
                text-[#4B3932]
                shadow-sm
                transition-all
                duration-200
                hover:border-[#D8C4A8]
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
                rounded-xl
                border
                border-[#4B3932]
                bg-[#4B3932]
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:bg-[#3D302A]
                hover:shadow-md
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
