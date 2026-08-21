import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, X } from "lucide-react";
import { useForm } from "react-hook-form";

import type { CreateTaskPayload, CreateTaskModalProps } from "../types/task.types";

import { createTaskSchema, type CreateTaskFormValues } from "../schemas/createTask.schema";

export default function CreateTaskModal({
  incidentId,
  isOpen,
  isSubmitting,
  onClose,
  onSubmit,
}: CreateTaskModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      priority: "MEDIUM",
      dueDate: "",
    },
  });

  if (!isOpen) {
    return null;
  }

  const submitForm = (values: CreateTaskFormValues) => {
    const payload: CreateTaskPayload = {
      title: values.title.trim(),

      description: values.description?.trim() || undefined,

      incidentId,

      priority: values.priority,

      dueDate: values.dueDate || undefined,
    };

    onSubmit(payload, () => {
      reset();
    });
  };

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    reset();
    onClose();
  };

  const today = new Date();

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#E7DDD3] px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-[#4B3932]">Create Task</h2>

            <p className="mt-1 text-sm text-stone-500">Create a manual task for this incident.</p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="
              rounded-xl
              p-2
              text-stone-400
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

        <form onSubmit={handleSubmit(submitForm)} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#4B3932]">Task title</label>

            <input
              type="text"
              placeholder="Enter task title"
              disabled={isSubmitting}
              {...register("title")}
              className={`
                w-full
                rounded-xl
                border
                px-4
                py-3
                text-sm
                outline-none
                transition
                ${errors.title ? "border-red-300" : "border-[#E7DDD3]"}
                focus:border-[#BFAEA1]
                disabled:cursor-not-allowed
                disabled:bg-[#FAF6F0]
              `}
            />

            {errors.title && (
              <p className="mt-1.5 text-xs font-medium text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#4B3932]">
              Description - <span className="font-normal text-stone-400">Optional</span>
            </label>

            <textarea
              rows={4}
              placeholder="Describe the task..."
              disabled={isSubmitting}
              {...register("description")}
              className={`
                w-full
                resize-none
                rounded-xl
                border
                px-4
                py-3
                text-sm
                outline-none
                transition
                ${errors.description ? "border-red-300" : "border-[#E7DDD3]"}
                focus:border-[#BFAEA1]
                disabled:cursor-not-allowed
                disabled:bg-[#FAF6F0]
              `}
            />

            {errors.description && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.description.message}
              </p>
            )}

            <p className="mt-1.5 text-right text-xs text-stone-400">Maximum 500 characters</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#4B3932]">
                Priority - <span className="font-normal text-stone-400">Optional</span>
              </label>

              <select
                disabled={isSubmitting}
                {...register("priority")}
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
                  transition
                  focus:border-[#BFAEA1]
                  disabled:cursor-not-allowed
                  disabled:bg-[#FAF6F0]
                "
              >
                <option value="LOW">LOW</option>

                <option value="MEDIUM">MEDIUM</option>

                <option value="HIGH">HIGH</option>
              </select>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#4B3932]">
                <CalendarDays size={15} />
                Due date - <span className="font-normal text-stone-400">Optional</span>
              </label>

              <input
                type="date"
                min={todayString}
                disabled={isSubmitting}
                {...register("dueDate")}
                className={`
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-sm
                  text-[#4B3932]
                  outline-none
                  transition
                  ${errors.dueDate ? "border-red-300" : "border-[#E7DDD3]"}
                  focus:border-[#BFAEA1]
                  disabled:cursor-not-allowed
                  disabled:bg-[#FAF6F0]
                `}
              />

              {errors.dueDate && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{errors.dueDate.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-[#E7DDD3] pt-5">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="
                rounded-xl
                border
                border-[#E7DDD3]
                px-4
                py-2.5
                text-sm
                font-semibold
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
              disabled={isSubmitting || !isValid}
              className="
                rounded-xl
                bg-[#4B3932]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#3B2E29]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
