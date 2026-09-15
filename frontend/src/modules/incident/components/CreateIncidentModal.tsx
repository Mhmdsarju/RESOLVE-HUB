import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateIncident } from "../hooks/useCreateIncident";
import { useTeams } from "@/modules/team/hooks/useTeams";

import {
  createIncidentSchema,
  type CreateIncidentFormData,
} from "../validation/createIncidentSchema";

interface CreateIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialForm: CreateIncidentFormData = {
  title: "",
  description: "",
  severity: "MEDIUM",
  priority: "P2",
  type: "MANUAL",
  assignedTeamId: "",
};

export default function CreateIncidentModal({ isOpen, onClose }: CreateIncidentModalProps) {
  const createIncidentMutation = useCreateIncident();

  const { data: teamsData, isLoading: isTeamsLoading } = useTeams({
    page: 1,
    limit: 100,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateIncidentFormData>({
    resolver: zodResolver(createIncidentSchema),
    defaultValues: initialForm,
  });

  if (!isOpen) {
    return null;
  }

  const teams = teamsData?.items ?? [];

  const handleClose = () => {
    if (createIncidentMutation.isPending) {
      return;
    }

    reset(initialForm);

    onClose();
  };

  const onSubmit = (form: CreateIncidentFormData) => {
    const payload = {
      ...form,
      title: form.title.trim(),
      description: form.description?.trim() || undefined,
    };

    createIncidentMutation.mutate(payload, {
      onSuccess: () => {
        reset(initialForm);
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
            <h2 className="text-xl font-bold text-[#4B3932]">
              Create Incident
            </h2>

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

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
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
              placeholder="Enter incident title"
              disabled={createIncidentMutation.isPending}
              {...register("title")}
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

            {errors.title && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.title.message}
              </p>
            )}
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
              placeholder="Describe the incident"
              rows={4}
              disabled={createIncidentMutation.isPending}
              {...register("description")}
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

            {errors.description && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
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
                {...register("severity")}
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

              {errors.severity && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.severity.message}
                </p>
              )}
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
                {...register("priority")}
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
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
                <option value="P4">P4</option>
              </select>

              {errors.priority && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.priority.message}
                </p>
              )}
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
                {...register("type")}
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
              </select>

              {errors.type && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.type.message}
                </p>
              )}
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
                {...register("assignedTeamId")}
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
                <option value="">
                  {isTeamsLoading ? "Loading teams..." : "Select team"}
                </option>

                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>

              {errors.assignedTeamId && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.assignedTeamId.message}
                </p>
              )}
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
              disabled={createIncidentMutation.isPending}
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
              {createIncidentMutation.isPending
                ? "Creating..."
                : "Create Incident"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}