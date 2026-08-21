import { useState } from "react";
import { X } from "lucide-react";

import { useCreateIncident } from "../hooks/useCreateIncident";
import { useTeams } from "@/modules/team/hooks/useTeams";

import type {
  CreateIncidentDto,
  IncidentPriority,
  IncidentSeverity,
  IncidentType,
} from "../types/incident.types";

interface CreateIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialForm: CreateIncidentDto = {
  title: "",
  description: "",
  severity: "MEDIUM",
  priority: "P2",
  type: "MANUAL",
  assignedTeamId: undefined,
};

export default function CreateIncidentModal({ isOpen, onClose }: CreateIncidentModalProps) {
  const [form, setForm] = useState<CreateIncidentDto>(initialForm);

  const createIncidentMutation = useCreateIncident();

  const { data: teamsData, isLoading: isTeamsLoading } = useTeams({
    page: 1,
    limit: 100,
  });

  if (!isOpen) {
    return null;
  }

  const teams = teamsData?.items ?? [];

  const handleChange = (field: keyof CreateIncidentDto, value: string) => {
    setForm((current) => {
      if (field === "title" || field === "description") {
        return {
          ...current,
          [field]: value,
        };
      }

      if (field === "priority" || field === "assignedTeamId") {
        return {
          ...current,
          [field]: value || undefined,
        };
      }

      return {
        ...current,
        [field]: value,
      };
    });
  };

  const handleClose = () => {
    if (createIncidentMutation.isPending) {
      return;
    }

    setForm({
      ...initialForm,
    });

    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = form.title.trim();

    if (!title) {
      return;
    }

    const payload: CreateIncidentDto = {
      ...form,
      title,
      description: form.description?.trim() || undefined,
    };

    createIncidentMutation.mutate(payload, {
      onSuccess: () => {
        setForm({
          ...initialForm,
        });

        onClose();
      },
    });
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        px-4
        py-8
      "
    >
      <div
        className="
          max-h-[90vh]
          w-full
          max-w-2xl
          overflow-y-auto
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
        "
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#4B3932]">Create Incident</h2>

            <p className="mt-1 text-sm text-stone-500">
              Create a new incident for your organization.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={createIncidentMutation.isPending}
            className="
              rounded-lg
              p-2
              text-stone-500
              transition
              hover:bg-[#FAF6F0]
              hover:text-[#4B3932]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="incident-title"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-[#4B3932]
              "
            >
              Title
            </label>

            <input
              id="incident-title"
              type="text"
              value={form.title ?? ""}
              onChange={(event) => handleChange("title", event.target.value)}
              placeholder="Enter incident title"
              disabled={createIncidentMutation.isPending}
              className="
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                px-4
                py-3
                text-sm
                outline-none
                transition
                focus:border-[#4B3932]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />
          </div>

          <div>
            <label
              htmlFor="incident-description"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-[#4B3932]
              "
            >
              Description
            </label>

            <textarea
              id="incident-description"
              value={form.description ?? ""}
              onChange={(event) => handleChange("description", event.target.value)}
              placeholder="Describe the incident"
              rows={4}
              disabled={createIncidentMutation.isPending}
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-[#E7DDD3]
                px-4
                py-3
                text-sm
                outline-none
                transition
                focus:border-[#4B3932]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="incident-severity"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#4B3932]
                "
              >
                Severity
              </label>

              <select
                id="incident-severity"
                value={form.severity}
                onChange={(event) =>
                  handleChange("severity", event.target.value as IncidentSeverity)
                }
                disabled={createIncidentMutation.isPending}
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
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <option value="LOW">Low</option>

                <option value="MEDIUM">Medium</option>

                <option value="HIGH">High</option>

                <option value="CRITICAL">Critical</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="incident-priority"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#4B3932]
                "
              >
                Priority
              </label>

              <select
                id="incident-priority"
                value={form.priority ?? ""}
                onChange={(event) =>
                  handleChange("priority", event.target.value as IncidentPriority)
                }
                disabled={createIncidentMutation.isPending}
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
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <option value="">No Priority</option>

                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
                <option value="P4">P4</option>
              </select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="incident-type"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#4B3932]
                "
              >
                Incident Type
              </label>

              <select
                id="incident-type"
                value={form.type}
                onChange={(event) => handleChange("type", event.target.value as IncidentType)}
                disabled={createIncidentMutation.isPending}
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
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <option value="MANUAL">Manual</option>

                <option value="AUTOMATED">Automated</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="incident-team"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#4B3932]
                "
              >
                Assigned Team
              </label>

              <select
                id="incident-team"
                value={form.assignedTeamId ?? ""}
                onChange={(event) => handleChange("assignedTeamId", event.target.value)}
                disabled={createIncidentMutation.isPending || isTeamsLoading}
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
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <option value="">{isTeamsLoading ? "Loading teams..." : "Select team"}</option>

                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={createIncidentMutation.isPending}
              className="
                rounded-xl
                border
                border-[#E7DDD3]
                px-5
                py-3
                text-sm
                font-medium
                text-[#4B3932]
                transition
                hover:bg-[#FAF6F0]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!form.title.trim() || createIncidentMutation.isPending}
              className="
                rounded-xl
                bg-[#4B3932]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#3B2E29]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {createIncidentMutation.isPending ? "Creating..." : "Create Incident"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
