import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";

import type { UpdateTaskPayload, EditTaskModalProps, EditTaskFormProps } from "../types/task.types";

import { editTaskSchema, type EditTaskFormValues } from "../schemas/editTask.schema";

export default function EditTaskModal({
  task,
  isSubmitting,
  onClose,
  onSubmit,
}: EditTaskModalProps) {
  if (!task) {
    return null;
  }

  return (
    <EditTaskForm
      key={task.id}
      task={task}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}

function EditTaskForm({ task, isSubmitting, onClose, onSubmit }: EditTaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EditTaskFormValues>({
    resolver: zodResolver(editTaskSchema),
    mode: "onChange",

    defaultValues: {
      title: task.title,
      description: task.description ?? "",
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
    },
  });

  const handleFormSubmit = (values: EditTaskFormValues) => {
    const payload: UpdateTaskPayload = {
      title: values.title.trim(),

      description: values.description?.trim() || undefined,

      priority: values.priority,

      dueDate: values.dueDate || undefined,
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#E7DDD3] px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-[#4B3932]">Edit Task</h2>

            <p className="mt-1 text-sm text-stone-500">Update task information.</p>
          </div>

          <button
            type="button"
            onClick={onClose}
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

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#4B3932]">Task title</label>

            <input
              {...register("title")}
              placeholder="Enter task title"
              disabled={isSubmitting}
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
              {...register("description")}
              rows={4}
              placeholder="Describe the task..."
              disabled={isSubmitting}
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
                disabled:bg-[#FAF6F0]
              `}
            />

            {errors.description && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#4B3932]">
                Priority - <span className="font-normal text-stone-400">Optional</span>
              </label>

              <select
                {...register("priority")}
                disabled={isSubmitting}
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  bg-white
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#BFAEA1]
                  disabled:bg-[#FAF6F0]
                "
              >
                <option value="LOW">LOW</option>

                <option value="MEDIUM">MEDIUM</option>

                <option value="HIGH">HIGH</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#4B3932]">
                Due date - <span className="font-normal text-stone-400">Optional</span>
              </label>

              <input
                type="date"
                {...register("dueDate")}
                disabled={isSubmitting}
                className={`
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  ${errors.dueDate ? "border-red-300" : "border-[#E7DDD3]"}
                  focus:border-[#BFAEA1]
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
              onClick={onClose}
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
