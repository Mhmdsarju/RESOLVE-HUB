import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileJson,
  Loader2,
  Radio,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAlert } from "../hooks/useAlert";
import { useResolveAlert } from "../hooks/useResolveAlert";

import { useMonitoringProjects } from "@/modules/monitoring/hooks/useMonitoringProjects";
import { useIntegration } from "@/modules/integration/hooks/useIntegration";
import { useIncident } from "@/modules/incident/hooks/useIncident";

export default function AlertDetailsPage() {
  const navigate = useNavigate();

  const { projectId, alertId } = useParams<{ projectId: string; alertId: string }>();

  const [isResolving, setIsResolving] = useState(false);

  const { data: alert, isLoading, isError, refetch } = useAlert(alertId ?? "");

  const resolveMutation = useResolveAlert();

  const { data: projectsData, isLoading: isProjectsLoading } = useMonitoringProjects({
    page: 1,
    limit: 100,
  });

  const { data: integration, isLoading: isIntegrationLoading } = useIntegration(
    alert?.integrationId ?? "",
  );

  const { data: incident, isLoading: isIncidentLoading } = useIncident(alert?.incidentId ?? "");

  const projects = projectsData?.data ?? [];

  const project = projects.find((item) => item.id === projectId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-36 animate-pulse rounded-xl bg-[#F0E7D5]" />

        <div className="h-56 animate-pulse rounded-3xl bg-white shadow-sm" />

        <div className="grid gap-5 md:grid-cols-2">
          <div className="h-28 animate-pulse rounded-2xl bg-white shadow-sm" />
          <div className="h-28 animate-pulse rounded-2xl bg-white shadow-sm" />
        </div>

        <div className="h-80 animate-pulse rounded-2xl bg-white shadow-sm" />

        <div className="h-72 animate-pulse rounded-2xl bg-white shadow-sm" />
      </div>
    );
  }

  if (isError || !alert) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div
          className="
            w-full
            max-w-md
            rounded-3xl
            bg-white
            p-8
            text-center
            shadow-lg
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
            "
          >
            <AlertCircle size={25} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#4B3932]">Alert not found</h2>

          <p className="mt-2 text-sm leading-6 text-stone-500">
            We couldn't load this alert. It may have been removed or you may not have permission to
            view it.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => refetch()}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                text-[#4B3932]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#FAF6F0]
                hover:shadow-md
              "
            >
              <RefreshCw size={16} />
              Retry
            </button>

            <button
              type="button"
              onClick={() => navigate(projectId ? `/monitoring/${projectId}` : "/monitoring")}
              className="
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
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#3B2E29]
                hover:shadow-lg
              "
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    if (projectId) {
      navigate(`/monitoring/${projectId}`);
      return;
    }

    navigate("/monitoring");
  };

  const handleResolve = () => {
    if (!alert.id || !projectId || alert.status === "RESOLVED") {
      return;
    }

    setIsResolving(true);

    resolveMutation.mutate(
      {
        id: alert.id,
        projectId,
      },
      {
        onSettled: () => {
          setIsResolving(false);
        },
      },
    );
  };

  const handleIncidentClick = () => {
    if (!alert.incidentId) {
      return;
    }

    navigate(`/incidents/${alert.incidentId}`);
  };

  const isResolved = alert.status === "RESOLVED";

  const projectName = isProjectsLoading ? "Loading..." : (project?.name ?? "Monitoring Project");

  const integrationName = !alert.integrationId
    ? "Manual Alert"
    : isIntegrationLoading
      ? "Loading..."
      : (integration?.name ?? "Integration");

  const incidentName = !alert.incidentId
    ? "Not Linked"
    : isIncidentLoading
      ? "Loading..."
      : (incident?.title ?? "Incident");

  const createdByName = alert.createdBy ? "User" : "System";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="
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
            hover:-translate-y-0.5
            hover:bg-[#FAF6F0]
            hover:shadow-md
          "
        >
          <ArrowLeft size={17} />
          Back to Project
        </button>

        {!isResolved && (
          <button
            type="button"
            onClick={handleResolve}
            disabled={isResolving || resolveMutation.isPending}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-green-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-green-700
              hover:shadow-lg
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isResolving || resolveMutation.isPending ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <CheckCircle2 size={17} />
            )}

            {isResolving || resolveMutation.isPending ? "Resolving..." : "Resolve Alert"}
          </button>
        )}
      </div>

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-[#4B3932]
          p-7
          shadow-lg
          transition-all
          duration-300
          hover:shadow-xl
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
          "
        />

        <div className="relative">
          <div className="flex items-start gap-4">
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
                backdrop-blur-sm
              "
            >
              <AlertCircle size={27} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-white/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-[#F0E7D5]
                  "
                >
                  Alert
                </span>

                <span
                  className={`
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${isResolved ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                  `}
                >
                  <span
                    className={`
                      h-1.5
                      w-1.5
                      rounded-full
                      ${isResolved ? "bg-green-500" : "bg-red-500"}
                    `}
                  />

                  {alert.status}
                </span>
              </div>

              <h1
                className="
                  mt-4
                  wrap-break-words
                  text-3xl
                  font-bold
                  tracking-tight
                  text-white
                  sm:text-4xl
                "
              >
                {alert.title}
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#E7DDD3]">
                {alert.message || "No message provided."}
              </p>
            </div>
          </div>
        </div>
      </div>

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
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <Radio size={18} />
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Source</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">{alert.source}</p>
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
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <Clock3 size={18} />
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Created</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                {new Date(alert.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="
          rounded-2xl
          border
          border-[#E7DDD3]
          bg-white
          p-6
          shadow-sm
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
            "
          >
            <FileJson size={19} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#4B3932]">Alert Information</h2>

            <p className="text-xs text-stone-400">Details associated with this alert</p>
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-[#FAF6F0] p-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-stone-400">Monitoring Project</p>

              <p
                className="
                  mt-1
                  truncate
                  text-sm
                  font-semibold
                  text-[#4B3932]
                "
                title={projectName}
              >
                {projectName}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Organization</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">Current Organization</p>
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Integration</p>

              <p
                className="
                  mt-1
                  truncate
                  text-sm
                  font-semibold
                  text-[#4B3932]
                "
                title={integrationName}
              >
                {integrationName}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Incident</p>

              {alert.incidentId ? (
                <button
                  type="button"
                  onClick={handleIncidentClick}
                  className="
                    mt-1
                    max-w-full
                    truncate
                    text-left
                    text-sm
                    font-semibold
                    text-[#4B3932]
                    underline
                    decoration-[#D8C9BD]
                    underline-offset-4
                    transition-colors
                    duration-200
                    hover:text-[#6B554A]
                    hover:decoration-[#4B3932]
                  "
                  title={incidentName}
                >
                  {incidentName}
                </button>
              ) : (
                <p className="mt-1 text-sm font-semibold text-stone-400">Not Linked</p>
              )}
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Created By</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">{createdByName}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Status</p>

              <p
                className={`
                  mt-1
                  text-sm
                  font-semibold
                  ${isResolved ? "text-green-700" : "text-red-600"}
                `}
              >
                {alert.status}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="
          rounded-2xl
          border
          border-[#E7DDD3]
          bg-white
          p-6
          shadow-sm
        "
      >
        <div>
          <h2 className="text-lg font-semibold text-[#4B3932]">Payload</h2>

          <p className="mt-1 text-xs text-stone-400">Raw data associated with this alert</p>
        </div>

        <pre
          className="
            mt-5
            max-h-500px
            overflow-auto
            rounded-xl
            border
            border-[#E7DDD3]
            bg-[#2F2926]
            p-5
            font-mono
            text-xs
            leading-6
            text-[#F0E7D5]
          "
        >
          {JSON.stringify(alert.payload ?? {}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
