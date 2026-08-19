import { ArrowLeft, CalendarDays, CheckCircle2, Globe, Settings2, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useIntegration } from "../hooks/useIntegration";

import { useMonitoringProjects } from "@/modules/monitoring/hooks/useMonitoringProjects";

// import type { IntegrationType } from "../types/integration.types";
import { SHORT_INTEGRATION_TYPES } from "../constants/integration.constant";

const integrationConfig = SHORT_INTEGRATION_TYPES;

export default function IntegrationDetailsPage() {
  const navigate = useNavigate();

  const { projectId, integrationId } = useParams<{ projectId: string; integrationId: string }>();

  const { data: integration, isLoading, isError } = useIntegration(integrationId ?? "");

  const { data: projectsData, isLoading: isProjectsLoading } = useMonitoringProjects({
    page: 1,
    limit: 10,
  });

  const projects = projectsData?.data ?? [];

  const project = projects.find((item) => item.id === projectId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-40 animate-pulse rounded-xl bg-[#F0E7D5]" />

        <div className="h-64 animate-pulse rounded-3xl bg-white shadow-sm" />

        <div className="grid gap-5 md:grid-cols-2">
          <div className="h-32 animate-pulse rounded-2xl bg-white shadow-sm" />
          <div className="h-32 animate-pulse rounded-2xl bg-white shadow-sm" />
        </div>

        <div className="h-80 animate-pulse rounded-2xl bg-white shadow-sm" />

        <div className="h-48 animate-pulse rounded-2xl bg-white shadow-sm" />
      </div>
    );
  }

  if (isError || !integration) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div
          className="
            group
            w-full
            max-w-md
            rounded-3xl
            border
            border-red-100
            bg-white
            p-8
            text-center
            shadow-lg
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
            <XCircle size={25} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#4B3932]">Integration not found</h2>

          <p className="mt-2 text-sm leading-6 text-stone-500">
            We couldn't load this integration.
          </p>

          <button
            type="button"
            onClick={() => navigate(projectId ? `/monitoring/${projectId}` : "/monitoring")}
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
              active:translate-y-0
            "
          >
            <ArrowLeft size={17} />
            Back to Project
          </button>
        </div>
      </div>
    );
  }

  const config = integrationConfig[integration.type];

  const Icon = config.icon;

  const configEntries = Object.entries(integration.config ?? {});

  return (
    <div className="space-y-7">
      <div>
        <button
          type="button"
          onClick={() => navigate(projectId ? `/monitoring/${projectId}` : "/monitoring")}
          className="
            group
            inline-flex
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
            hover:-translate-y-0.5
            hover:border-[#D8C9BD]
            hover:bg-[#FAF6F0]
            hover:shadow-md
            active:translate-y-0
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
          Back to Project
        </button>
      </div>

      <section
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
          hover:-translate-y-1
          hover:shadow-2xl
          sm:p-8
        "
      >
        <div
          className="
            absolute
            -right-20
            -top-24
            h-64
            w-64
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
            -bottom-28
            right-28
            h-56
            w-56
            rounded-full
            bg-white/5
            transition-transform
            duration-700
            group-hover:-translate-y-5
            group-hover:scale-110
          "
        />

        <div className="relative">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/10
                  text-[#F0E7D5]
                  shadow-sm
                  backdrop-blur-sm
                  transition-all
                  duration-500
                  group-hover:scale-110
                  group-hover:bg-white/15
                  group-hover:shadow-lg
                "
              >
                <Icon
                  size={26}
                  className="
                    transition-transform
                    duration-500
                    group-hover:rotate-6
                  "
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-[#E7DDD3]">{config.label}</p>

                <h1
                  className="
                    mt-1
                    truncate
                    text-3xl
                    font-bold
                    text-white
                    transition-colors
                    duration-300
                    group-hover:text-[#F0E7D5]
                  "
                >
                  {integration.name}
                </h1>

                <p className="mt-2 text-sm text-[#E7DDD3]">{config.description}</p>
              </div>
            </div>

            <div
              className={`
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                px-4
                py-2
                text-sm
                font-semibold
                shadow-sm
                transition-all
                duration-300
                hover:scale-105
                ${
                  integration.isActive
                    ? "bg-green-400/10 text-green-200 hover:bg-green-400/20"
                    : "bg-white/10 text-[#E7DDD3] hover:bg-white/15"
                }
              `}
            >
              {integration.isActive ? <CheckCircle2 size={16} /> : <XCircle size={16} />}

              {integration.isActive ? "Active" : "Inactive"}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <div
          className="
            group
            rounded-2xl
            border
            border-[#E7DDD3]
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[#D8C9BD]
            hover:bg-[#FFFEFC]
            hover:shadow-lg
          "
        >
          <div className="flex items-center gap-3">
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
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:shadow-sm
              "
            >
              <Settings2
                size={18}
                className="
                  transition-transform
                  duration-300
                  group-hover:rotate-6
                "
              />
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Integration Type</p>

              <p
                className="
                  mt-1
                  text-lg
                  font-bold
                  text-[#4B3932]
                  transition-colors
                  duration-200
                  group-hover:text-[#3B2E29]
                "
              >
                {config.label}
              </p>

              <p className="mt-1 text-sm text-stone-500">{config.description}</p>
            </div>
          </div>
        </div>

        <div
          className="
            group
            rounded-2xl
            border
            border-[#E7DDD3]
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[#D8C9BD]
            hover:bg-[#FFFEFC]
            hover:shadow-lg
          "
        >
          <div className="flex items-center gap-3">
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
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:shadow-sm
              "
            >
              <CalendarDays
                size={18}
                className="
                  transition-transform
                  duration-300
                  group-hover:rotate-6
                "
              />
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Created</p>

              <p
                className="
                  mt-1
                  text-sm
                  font-bold
                  text-[#4B3932]
                  transition-colors
                  duration-200
                  group-hover:text-[#3B2E29]
                "
              >
                {new Date(integration.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section
        className="
          group
          rounded-2xl
          border
          border-[#E7DDD3]
          bg-white
          p-6
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[#D8C9BD]
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
              text-[#4B3932]
              transition-all
              duration-300
              group-hover:scale-110
            "
          >
            <Globe
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:rotate-6
              "
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#4B3932]">Configuration</h2>

            <p className="mt-1 text-sm text-stone-500">Integration configuration values.</p>
          </div>
        </div>

        {configEntries.length === 0 ? (
          <div
            className="
              mt-5
              rounded-xl
              border
              border-dashed
              border-[#D8C9BD]
              bg-[#FAF6F0]
              p-5
              transition-all
              duration-300
              hover:border-[#BFAEA1]
              hover:bg-[#F7F0E8]
            "
          >
            <p className="text-sm text-stone-500">No configuration provided.</p>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {configEntries.map(([key, value]) => (
              <div
                key={key}
                className="
                  group/config
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  bg-[#FAF6F0]
                  p-4
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#D8C9BD]
                  hover:bg-white
                  hover:shadow-sm
                "
              >
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-stone-400
                    transition-colors
                    duration-200
                    group-hover/config:text-[#4B3932]
                  "
                >
                  {key}
                </p>

                <p
                  className="
                    mt-2
                    break-all
                    text-sm
                    font-medium
                    text-[#4B3932]
                  "
                >
                  {typeof value === "object" ? JSON.stringify(value) : String(value)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section
        className="
          group
          rounded-2xl
          border
          border-[#E7DDD3]
          bg-white
          p-6
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[#D8C9BD]
          hover:shadow-lg
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-bold
              text-[#4B3932]
              transition-colors
              duration-200
              group-hover:text-[#3B2E29]
            "
          >
            Integration Information
          </h2>

          <p className="mt-1 text-sm text-stone-500">Connection details for this integration.</p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div
            className="
              group/info
              rounded-xl
              bg-[#FAF6F0]
              p-4
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-white
              hover:shadow-sm
            "
          >
            <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
              Integration
            </p>

            <p
              className="
                mt-1
                truncate
                text-sm
                font-semibold
                text-[#4B3932]
                transition-colors
                duration-200
                group-hover/info:text-[#3B2E29]
              "
              title={integration.name}
            >
              {integration.name}
            </p>
          </div>

          <div
            className="
              group/info
              rounded-xl
              bg-[#FAF6F0]
              p-4
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-white
              hover:shadow-sm
            "
          >
            <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
              Monitoring Project
            </p>

            <p
              className="
                mt-1
                truncate
                text-sm
                font-semibold
                text-[#4B3932]
                transition-colors
                duration-200
                group-hover/info:text-[#3B2E29]
              "
              title={project?.name ?? "Project unavailable"}
            >
              {isProjectsLoading ? "Loading..." : (project?.name ?? "Project unavailable")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
