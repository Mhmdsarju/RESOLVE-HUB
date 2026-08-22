import {
  Activity,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  UserRound,
} from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useGetTaskById } from "../hooks/useGetTaskById";

const statusStyles = {
  TODO: "bg-yellow-50 text-yellow-700 border-yellow-200",
  IN_PROGRESS: "bg-blue-50 text-blue-700 border-blue-200",
  DONE: "bg-green-50 text-green-700 border-green-200",
};

const priorityStyles = {
  LOW: "bg-green-50 text-green-700",
  MEDIUM: "bg-yellow-50 text-yellow-700",
  HIGH: "bg-red-50 text-red-700",
};

type TaskDetailsLocationState = {
  projectName?: string;
  assignedUserName?: string;
};

export default function TaskDetailsPage() {
  const navigate = useNavigate();

  const location = useLocation();

  const { id } = useParams<{ id: string }>();

  const { data: task, isLoading, isError, error } = useGetTaskById(id ?? "");

  const locationState = location.state as TaskDetailsLocationState | null;

  const projectName = locationState?.projectName ?? "No Project";

  const assignedUserName = locationState?.assignedUserName ?? "Unassigned";

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-36 animate-pulse rounded-xl bg-[#F0E7D5]" />

        <div className="h-64 animate-pulse rounded-3xl bg-white shadow-sm" />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-28 animate-pulse rounded-2xl bg-white shadow-sm" />
          ))}
        </div>

        <div className="h-56 animate-pulse rounded-2xl bg-white shadow-sm" />

        <div className="h-72 animate-pulse rounded-2xl bg-white shadow-sm" />
      </div>
    );
  }

  if (isError || !task) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <FileText size={25} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#4B3932]">Task not found</h2>

          <p className="mt-2 text-sm leading-6 text-stone-500">
            {error instanceof Error
              ? error.message
              : "We couldn't load this task. It may have been removed or you may not have permission to view it."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/my-tasks")}
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
            Back to Tasks
          </button>
        </div>
      </div>
    );
  }

  const statusLabel = task.status.replace("_", " ");

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate("/my-tasks")}
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
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-[#FAF6F0]
          hover:shadow-md
        "
      >
        <ArrowLeft size={17} />
        Back to Tasks
      </button>

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
              <CheckCircle2 size={27} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="
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
                  Task
                </span>

                <span
                  className={`
                    rounded-full
                    border
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${statusStyles[task.status]}
                  `}
                >
                  {statusLabel}
                </span>

                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${priorityStyles[task.priority]}
                  `}
                >
                  {task.priority} Priority
                </span>

                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${
                      task.type === "AUTOMATIC"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }
                  `}
                >
                  {task.type}
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
                {task.title}
              </h1>

              <p className="mt-2 text-sm font-semibold text-[#E7DDD3]">{projectName}</p>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#E7DDD3]">
                {task.description || "No description provided for this task."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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
              <CheckCircle2 size={18} />
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Status</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">{statusLabel}</p>
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
              <UserRound size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-stone-400">Assigned To</p>

              <p
                className="
                  mt-1
                  truncate
                  text-sm
                  font-semibold
                  text-[#4B3932]
                "
              >
                {assignedUserName}
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
              <CalendarDays size={18} />
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Due Date</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
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
              <p className="text-xs font-medium text-stone-400">Created</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                {new Date(task.createdAt).toLocaleDateString()}
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
            <h2 className="text-lg font-semibold text-[#4B3932]">Task Details</h2>

            <p className="text-xs text-stone-400">Information about this task</p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-[#FAF6F0] p-4">
            <p className="text-xs font-medium text-stone-400">Project</p>

            <p className="mt-1 text-sm font-semibold text-[#4B3932]">{projectName}</p>
          </div>

          <div className="rounded-xl bg-[#FAF6F0] p-4">
            <p className="text-xs font-medium text-stone-400">Assigned To</p>

            <p className="mt-1 text-sm font-semibold text-[#4B3932]">{assignedUserName}</p>
          </div>

          <div className="rounded-xl bg-[#FAF6F0] p-4">
            <p className="text-xs font-medium text-stone-400">Task Type</p>

            <p className="mt-1 text-sm font-semibold text-[#4B3932]">{task.type}</p>
          </div>

          <div className="rounded-xl bg-[#FAF6F0] p-4">
            <p className="text-xs font-medium text-stone-400">Priority</p>

            <p className="mt-1 text-sm font-semibold text-[#4B3932]">{task.priority}</p>
          </div>

          <div className="rounded-xl bg-[#FAF6F0] p-4">
            <p className="text-xs font-medium text-stone-400">Created At</p>

            <p className="mt-1 text-sm font-semibold text-[#4B3932]">
              {new Date(task.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="rounded-xl bg-[#FAF6F0] p-4">
            <p className="text-xs font-medium text-stone-400">Last Updated</p>

            <p className="mt-1 text-sm font-semibold text-[#4B3932]">
              {new Date(task.updatedAt).toLocaleString()}
            </p>
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
            <h2 className="text-lg font-semibold text-[#4B3932]">Description</h2>

            <p className="text-xs text-stone-400">Task requirements and details</p>
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-[#FAF6F0] p-5">
          <p className="text-sm leading-7 text-stone-600">
            {task.description || "No description provided."}
          </p>
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
              <h2 className="text-xl font-bold text-[#4B3932]">Activity & Audit</h2>

              <p className="mt-1 text-sm text-stone-500">
                Track changes and activities related to this task.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="rounded-xl border border-dashed border-[#DCCFC3] bg-[#FAF6F0] p-8 text-center">
            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-white
                text-[#8B6F61]
                shadow-sm
              "
            >
              <Activity size={21} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-[#4B3932]">Activity history</h3>

            <p className="mt-1 text-xs leading-5 text-stone-500">
              Audit activity will appear here once the task audit API is connected.
            </p>
          </div>
        </div>
      </div>

      {task.type === "AUTOMATIC" && (
        <div
          className="
            rounded-2xl
            border
            border-purple-100
            bg-purple-50
            p-6
            shadow-sm
          "
        >
          <div className="flex items-start gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-white
                text-purple-600
                shadow-sm
              "
            >
              <Clock3 size={19} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-purple-700">Automatically Created Task</h2>

              <p className="mt-1 text-sm leading-6 text-purple-600">
                This task was automatically created from a monitoring alert.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
