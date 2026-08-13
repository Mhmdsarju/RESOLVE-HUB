import { useState } from "react";
import { Pencil, X } from "lucide-react";

import { useUpdateMonitoringProject } from "../hooks/useUpdateMonitoringProject";

import type { MonitoringProject } from "../types/monitoringProject.types";

interface EditMonitoringProjectModalProps {
  project: MonitoringProject;
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  description: string;
}

export default function EditMonitoringProjectModal({
  project,
  isOpen,
  onClose,
}: EditMonitoringProjectModalProps) {
  const [form, setForm] = useState<FormState>(() => ({
    name: project.name,
    description: project.description ?? "",
  }));

  const updateMutation = useUpdateMonitoringProject();

  if (!isOpen) {
    return null;
  }

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleClose = () => {
    if (updateMutation.isPending) {
      return;
    }

    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = form.name.trim();

    if (!name) {
      return;
    }

    updateMutation.mutate(
      {
        id: project.id,
        data: {
          name,
          description: form.description.trim() || undefined,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
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
        backdrop-blur-[2px]
      "
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-3xl
          bg-white
          p-6
          shadow-2xl
        "
      >
        <div className="flex items-start justify-between">
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
              "
            >
              <Pencil size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#4B3932]">Edit Monitoring Project</h2>

              <p className="mt-1 text-xs text-stone-400">Update your project information.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={updateMutation.isPending}
            className="
              rounded-lg
              p-2
              text-stone-400
              transition-all
              duration-200
              hover:bg-[#FAF6F0]
              hover:text-[#4B3932]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label
              htmlFor="edit-monitoring-project-name"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-[#4B3932]
              "
            >
              Project Name
            </label>

            <input
              id="edit-monitoring-project-name"
              type="text"
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              disabled={updateMutation.isPending}
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
                transition-all
                duration-200
                placeholder:text-stone-300
                hover:border-[#D8C9BD]
                focus:border-[#4B3932]
                focus:ring-2
                focus:ring-[#4B3932]/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />
          </div>

          <div>
            <label
              htmlFor="edit-monitoring-project-description"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-[#4B3932]
              "
            >
              Description
              <span className="ml-1 font-normal text-stone-400">Optional</span>
            </label>

            <textarea
              id="edit-monitoring-project-description"
              value={form.description}
              onChange={(event) => handleChange("description", event.target.value)}
              rows={4}
              disabled={updateMutation.isPending}
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
                px-4
                py-3
                text-sm
                leading-6
                text-[#4B3932]
                outline-none
                transition-all
                duration-200
                placeholder:text-stone-300
                hover:border-[#D8C9BD]
                focus:border-[#4B3932]
                focus:ring-2
                focus:ring-[#4B3932]/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />
          </div>

          <div
            className="
              rounded-2xl
              border
              border-[#E7DDD3]
              bg-[#FAF6F0]
              p-4
            "
          >
            <p className="text-xs leading-5 text-stone-500">
              Organization and creator information are managed automatically by the backend.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={updateMutation.isPending}
              className="
                rounded-xl
                border
                border-[#E7DDD3]
                px-5
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
              Cancel
            </button>

            <button
              type="submit"
              disabled={!form.name.trim() || updateMutation.isPending}
              className="
                rounded-xl
                bg-[#4B3932]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#3B2E29]
                hover:shadow-lg
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
