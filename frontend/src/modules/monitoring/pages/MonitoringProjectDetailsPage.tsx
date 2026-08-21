import { useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  Pencil,
  Plus,
  Settings2,
  Trash2,
  GitBranch,
  Plug,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useMonitoringProject } from "../hooks/useMonitoringProject";

import EditMonitoringProjectModal from "../components/EditMonitoringProjectModal";
import DeleteMonitoringProjectModal from "../components/DeleteMonitoringProjectModal";

import IntegrationList from "@/modules/integration/components/IntegrationList";
import CreateIntegrationModal from "@/modules/integration/components/CreateIntegrationModal";
import EditIntegrationModal from "@/modules/integration/components/EditIntegrationModal";
import DeleteIntegrationModal from "@/modules/integration/components/DeleteIntegrationModal";

import { useIntegrations } from "@/modules/integration/hooks/useIntegrations";

import AlertList from "@/modules/alert/components/AlertList";
import CreateAlertModal from "@/modules/alert/components/CreateAlertModal";
import { useAlerts } from "@/modules/alert/hooks/useAlerts";

import type { Integration } from "@/modules/integration/types/integration.types";
import type { Alert } from "@/modules/alert/types/alert.types";

type ResourceTab = "alerts" | "integrations";

export default function MonitoringProjectDetailsPage() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isCreateIntegrationOpen, setIsCreateIntegrationOpen] = useState(false);

  const [editingIntegration, setEditingIntegration] = useState<Integration | null>(null);

  const [deletingIntegration, setDeletingIntegration] = useState<Integration | null>(null);

  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);

  const [alertPage, setAlertPage] = useState(1);

  const [activeTab, setActiveTab] = useState<ResourceTab>("alerts");

  const { data: project, isLoading, isError } = useMonitoringProject(id ?? "");

  const {
    data: integrationsData,
    isLoading: isIntegrationsLoading,
    isError: isIntegrationsError,
  } = useIntegrations({
    projectId: id ?? "",
    page: 1,
    limit: 10,
  });

  const {
    data: alertsData,
    isLoading: isAlertsLoading,
    isError: isAlertsError,
  } = useAlerts(id ?? "", {
    page: alertPage,
    limit: 10,
  });

  const integrations = integrationsData?.data ?? [];

  const alerts = alertsData?.items ?? [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-36 animate-pulse rounded-xl bg-[#F0E7D5]" />

        <div className="h-64 animate-pulse rounded-3xl bg-white shadow-sm" />

        <div className="grid gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-28 animate-pulse rounded-2xl bg-white shadow-sm" />
          ))}
        </div>

        <div className="h-80 animate-pulse rounded-2xl bg-white shadow-sm" />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <FileText size={25} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#4B3932]">Monitoring project not found</h2>

          <p className="mt-2 text-sm leading-6 text-stone-500">
            We couldn't load this monitoring project. It may have been removed or you may not have
            permission to view it.
          </p>

          <button
            type="button"
            onClick={() => navigate("/monitoring")}
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
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#3B2E29]
              hover:shadow-lg
            "
          >
            <ArrowLeft size={17} />
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const handleDeleted = () => {
    setIsDeleteModalOpen(false);
    navigate("/monitoring");
  };

  const handleIntegrationClick = (integration: Integration) => {
    navigate(`/monitoring/${project.id}/integrations/${integration.id}`);
  };

  const handleAlertClick = (alert: Alert) => {
    navigate(`/monitoring/${project.id}/alerts/${alert.id}`);
  };

  const handleAlertRulesClick = () => {
    navigate(`/monitoring/${project.id}/alert-rules`);
  };

  const handleAlertRoutingRulesClick = () => {
    navigate(`/monitoring/${project.id}/alert-routing-rules`);
  };

  const handleTabChange = (tab: ResourceTab) => {
    setActiveTab(tab);

    if (tab === "alerts") {
      setAlertPage(1);
    }
  };

  return (
    <div className="space-y-6">
      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <button
          type="button"
          onClick={() => navigate("/monitoring")}
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
          Back to Projects
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="
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
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#FAF6F0]
              hover:shadow-md
            "
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-red-100
              bg-white
              px-4
              py-2.5
              text-sm
              font-medium
              text-red-600
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-red-50
              hover:shadow-md
            "
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
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
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/5" />

        <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-white/5" />

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
              <FileText size={26} />
            </div>

            <div className="min-w-0">
              <div
                className="
                  inline-flex
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
                Monitoring Project
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
                {project.name}
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#E7DDD3]">
                {project.description || "No description provided."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
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
              <CalendarDays size={18} />
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Created</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
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
              <p className="text-xs font-medium text-stone-400">Last Updated</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                {new Date(project.updatedAt).toLocaleDateString()}
              </p>
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
              <FileText size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-stone-400">Project ID</p>

              <p
                className="
                  mt-1
                  truncate
                  text-sm
                  font-semibold
                  text-[#4B3932]
                "
                title={project.id}
              >
                {project.id}
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
            <FileText size={19} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#4B3932]">Project Information</h2>

            <p className="text-xs text-stone-400">Monitoring project details</p>
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-[#FAF6F0] p-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-stone-400">Project Name</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">{project.name}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Created By</p>

              <p
                className="
                  mt-1
                  truncate
                  text-sm
                  font-semibold
                  text-[#4B3932]
                "
                title={project.createdBy}
              >
                {project.createdBy}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-[#E7DDD3]
          bg-white
          shadow-sm
        "
      >
        <div className="border-b border-[#E7DDD3] p-6">
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
              <Activity size={19} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#4B3932]">Project Resources</h2>

              <p className="mt-1 text-sm text-stone-500">
                Manage alerts and integrations connected to this project.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-[#FAF6F0] p-1.5">
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => handleTabChange("alerts")}
                className={`
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  transition-all
                  duration-200
                  ${
                    activeTab === "alerts"
                      ? "bg-white text-[#4B3932] shadow-sm"
                      : "text-stone-500 hover:bg-white/70 hover:text-[#4B3932]"
                  }
                `}
              >
                <AlertCircle size={17} />
                Alerts
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("integrations")}
                className={`
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  transition-all
                  duration-200
                  ${
                    activeTab === "integrations"
                      ? "bg-white text-[#4B3932] shadow-sm"
                      : "text-stone-500 hover:bg-white/70 hover:text-[#4B3932]"
                  }
                `}
              >
                <Plug size={17} />
                Integrations
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "alerts" && (
            <>
              <div
                className="
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <h3 className="text-lg font-bold text-[#4B3932]">Alerts</h3>

                  <p className="mt-1 text-sm text-stone-500">
                    Monitor and manage alerts generated for this project.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAlertRulesClick}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-[#E7DDD3]
                      bg-white
                      px-4
                      py-2.5
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
                    <Settings2 size={17} />
                    Alert Rules
                  </button>

                  <button
                    type="button"
                    onClick={handleAlertRoutingRulesClick}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-[#E7DDD3]
                      bg-white
                      px-4
                      py-2.5
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
                    <GitBranch size={17} />
                    Routing Rules
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCreateAlertOpen(true)}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#4B3932]
                      px-4
                      py-2.5
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
                    <Plus size={17} />
                    Create Alert
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <AlertList
                  alerts={alerts}
                  isLoading={isAlertsLoading}
                  isError={isAlertsError}
                  onAlertClick={handleAlertClick}
                  page={alertsData?.pagination.page ?? 1}
                  totalPages={alertsData?.pagination.totalPages ?? 1}
                  onPageChange={setAlertPage}
                />
              </div>
            </>
          )}

          {activeTab === "integrations" && (
            <>
              <div
                className="
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <h3 className="text-lg font-bold text-[#4B3932]">Integrations</h3>

                  <p className="mt-1 text-sm text-stone-500">
                    Connect monitoring and notification services to this project.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCreateIntegrationOpen(true)}
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
                  Add Integration
                </button>
              </div>

              <div className="mt-6">
                <IntegrationList
                  integrations={integrations}
                  isLoading={isIntegrationsLoading}
                  isError={isIntegrationsError}
                  onIntegrationClick={handleIntegrationClick}
                  onIntegrationEdit={setEditingIntegration}
                  onIntegrationDelete={setDeletingIntegration}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <EditMonitoringProjectModal
        project={project}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      <DeleteMonitoringProjectModal
        project={project}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleted={handleDeleted}
      />

      <CreateIntegrationModal
        projectId={project.id}
        isOpen={isCreateIntegrationOpen}
        onClose={() => setIsCreateIntegrationOpen(false)}
      />

      <EditIntegrationModal
        integration={editingIntegration}
        isOpen={Boolean(editingIntegration)}
        onClose={() => setEditingIntegration(null)}
      />

      <DeleteIntegrationModal
        integration={deletingIntegration}
        isOpen={Boolean(deletingIntegration)}
        onClose={() => setDeletingIntegration(null)}
      />

      <CreateAlertModal
        projectId={project.id}
        isOpen={isCreateAlertOpen}
        onClose={() => setIsCreateAlertOpen(false)}
      />
    </div>
  );
}
