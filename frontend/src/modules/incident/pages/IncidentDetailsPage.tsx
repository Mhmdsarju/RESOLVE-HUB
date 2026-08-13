import { ArrowLeft, AlertCircle, ExternalLink } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import IncidentDetails from "../components/IncidentDetails";
import { useIncident } from "../hooks/useIncident";

export default function IncidentDetailsPage() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { data: incident, isLoading, isError } = useIncident(id ?? "");

  if (isLoading) {
    return (
      <div className="min-h-[60vh] space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-xl bg-[#F0E7D5]" />

          <div className="space-y-2">
            <div className="h-5 w-40 animate-pulse rounded-lg bg-[#F0E7D5]" />
            <div className="h-3 w-56 animate-pulse rounded-lg bg-[#FAF6F0]" />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="space-y-5">
            <div className="h-4 w-24 animate-pulse rounded bg-[#F0E7D5]" />
            <div className="h-8 w-3/4 animate-pulse rounded bg-[#F0E7D5]" />
            <div className="h-4 w-full animate-pulse rounded bg-[#FAF6F0]" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-[#FAF6F0]" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-64 animate-pulse rounded-3xl bg-white shadow-sm lg:col-span-2" />
          <div className="h-64 animate-pulse rounded-3xl bg-white shadow-sm" />
        </div>
      </div>
    );
  }

  if (isError || !incident) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div
          className="
            group
            w-full
            max-w-md
            rounded-3xl
            bg-white
            p-8
            text-center
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-red-50
              text-red-500
              transition-transform
              duration-300
              group-hover:scale-110
            "
          >
            <AlertCircle size={26} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#4B3932]">Incident not found</h2>

          <p className="mt-2 text-sm leading-6 text-stone-500">
            We couldn't load this incident. It may have been removed or you may not have permission
            to view it.
          </p>

          <button
            type="button"
            onClick={() => navigate("/incidents")}
            className="
              mt-6
              inline-flex
              items-center
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
            <ArrowLeft size={17} />
            Back to Incidents
          </button>
        </div>
      </div>
    );
  }

  const formattedStatus = incident.status.replace("_", " ");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => navigate("/incidents")}
          className="
            group
            inline-flex
            w-fit
            items-center
            gap-2
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
            duration-300
            hover:-translate-x-0.5
            hover:border-[#D8C9BD]
            hover:bg-[#FAF6F0]
            hover:shadow-md
          "
        >
          <ArrowLeft
            size={17}
            className="
              transition-transform
              duration-300
              group-hover:-translate-x-1
            "
          />
          Back to Incidents
        </button>

        <div className="flex items-center gap-2 text-xs text-stone-400">
          <span>Incident</span>
          <span>/</span>
          <span className="max-w-180px truncate text-stone-500">{incident.id}</span>
        </div>
      </div>

      <div
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          bg-[#4B3932]
          p-7
          shadow-lg
          transition-all
          duration-500
          hover:shadow-2xl
          sm:p-8
        "
      >
        <div
          className="
            absolute
            -right-20
            -top-20
            h-52
            w-52
            rounded-full
            bg-white/5
            transition-transform
            duration-700
            group-hover:scale-125
          "
        />

        <div
          className="
            absolute
            -bottom-24
            right-20
            h-48
            w-48
            rounded-full
            bg-white/5
            transition-transform
            duration-700
            group-hover:scale-125
          "
        />

        <div className="relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span
                  className="
                    rounded-full
                    bg-white/10
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-[#F0E7D5]
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:bg-white/20
                  "
                >
                  {incident.type}
                </span>

                <span
                  className="
                    rounded-full
                    bg-white/10
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:bg-white/20
                  "
                >
                  {incident.severity}
                </span>

                {incident.priority && (
                  <span
                    className="
                      rounded-full
                      bg-white/10
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      text-white
                      transition-all
                      duration-300
                      hover:scale-105
                      hover:bg-white/20
                    "
                  >
                    {incident.priority}
                  </span>
                )}
              </div>

              <h1
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-white
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  sm:text-4xl
                "
              >
                {incident.title}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-sm text-[#E7DDD3]">
                <span>Incident ID:</span>

                <span
                  className="max-w-[280px] truncate font-medium text-white/80"
                  title={incident.id}
                >
                  {incident.id}
                </span>

                <ExternalLink
                  size={14}
                  className="
                    opacity-60
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                />
              </div>
            </div>

            <div
              className="
                min-w-[170px]
                rounded-2xl
                border
                border-white/10
                bg-white/10
                px-5
                py-4
                backdrop-blur-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-white/20
                hover:bg-white/15
              "
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-[#E7DDD3]">
                  Current Status
                </p>

                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-[#F0E7D5]
                      opacity-60
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-[#F0E7D5]
                    "
                  />
                </span>
              </div>

              <p className="mt-2 text-lg font-bold capitalize text-white">{formattedStatus}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl transition-all duration-300 hover:shadow-md">
        <IncidentDetails incident={incident} />
      </div>
    </div>
  );
}
