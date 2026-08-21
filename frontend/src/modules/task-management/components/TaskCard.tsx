import { Check, ChevronDown, Clock3, Pencil, Trash2, UserRound } from "lucide-react";

import type { TaskStatus, TaskCardProps } from "../types/task.types";

export default function TaskCard({
  task,
  users,
  role,
  currentUserId,
  isTeamLead = false,
  onStatusChange,
  onEdit,
  onAssign,
  onDelete,
  isUpdating = false,
}: TaskCardProps) {
  const statusLabel = task.status.replace("_", " ");

  const assignedUser = users.find((user) => user.id === task.assignedTo);

  const isAssignedToCurrentUser = Boolean(currentUserId && task.assignedTo === currentUserId);

  const assignedUserName = isAssignedToCurrentUser ? "You" : (assignedUser?.name ?? "Unassigned");

  const canEdit = role === "ORG_ADMIN" || (role === "ENGINEER" && isTeamLead);

  const canAssign = role === "ORG_ADMIN" || (role === "ENGINEER" && isTeamLead);

  const canDelete = role === "ORG_ADMIN";

  const statusBorderClass: Record<TaskStatus, string> = {
    TODO: "border-yellow-300",
    IN_PROGRESS: "border-blue-300",
    DONE: "border-green-300",
  };

  const statusBadgeClass: Record<TaskStatus, string> = {
    TODO: "bg-yellow-50 text-yellow-700",
    IN_PROGRESS: "bg-blue-50 text-blue-700",
    DONE: "bg-green-50 text-green-700",
  };

  return (
    <div
      className={`
        rounded-2xl
        border-2
        ${statusBorderClass[task.status]}
        bg-[#FFFEFC]
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-md
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-[#4B3932]">{task.title}</h3>

            <span
              className={`
                rounded-lg
                px-2.5
                py-1
                text-[11px]
                font-bold
                ${
                  task.type === "AUTOMATIC"
                    ? "bg-purple-50 text-purple-600"
                    : "bg-blue-50 text-blue-600"
                }
              `}
            >
              {task.type}
            </span>

            {role === "ENGINEER" && isTeamLead && (
              <span
                className="
                  rounded-lg
                  bg-[#F0E7D5]
                  px-2.5
                  py-1
                  text-[11px]
                  font-bold
                  text-[#4B3932]
                "
              >
                TEAM LEAD
              </span>
            )}
          </div>

          {task.description && (
            <p
              className="
                mt-2
                line-clamp-2
                text-sm
                leading-6
                text-stone-500
              "
            >
              {task.description}
            </p>
          )}

          {task.projectName && (
            <p className="mt-2 text-xs font-semibold text-[#4B3932]">
              Project: {task.projectName}
            </p>
          )}
        </div>

        {(canEdit || canDelete) && (
          <div className="flex items-center gap-1">
            {canEdit && onEdit && (
              <button
                type="button"
                onClick={() => onEdit(task)}
                title="Edit task"
                className="
                  rounded-lg
                  p-2
                  text-stone-400
                  transition
                  hover:bg-[#F0E7D5]
                  hover:text-[#4B3932]
                "
              >
                <Pencil size={16} />
              </button>
            )}

            {canDelete && onDelete && (
              <button
                type="button"
                onClick={() => onDelete(task)}
                title="Delete task"
                className="
                  rounded-lg
                  p-2
                  text-stone-400
                  transition
                  hover:bg-red-50
                  hover:text-red-500
                "
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span
          className={`
            rounded-lg
            px-2.5
            py-1
            text-xs
            font-semibold
            ${statusBadgeClass[task.status]}
          `}
        >
          {statusLabel}
        </span>

        <span
          className="
            rounded-lg
            bg-orange-50
            px-2.5
            py-1
            text-xs
            font-semibold
            text-orange-600
          "
        >
          {task.priority}
        </span>
      </div>

      <div
        className="
          mt-5
          grid
          gap-3
          border-t
          border-[#E7DDD3]
          pt-4
          sm:grid-cols-2
        "
      >
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <UserRound size={14} />
            Assigned to
          </div>

          <p
            className="
              mt-1
              truncate
              text-sm
              font-medium
              text-[#4B3932]
            "
          >
            {assignedUserName}
          </p>

          {assignedUser?.email && !isAssignedToCurrentUser && (
            <p
              className="
                  mt-0.5
                  truncate
                  text-xs
                  text-stone-400
                "
            >
              {assignedUser.email}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <Clock3 size={14} />
            Due date
          </div>

          <p
            className="
              mt-1
              text-sm
              font-medium
              text-[#4B3932]
            "
          >
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <select
            value={task.status}
            disabled={isUpdating}
            onChange={(event) => onStatusChange(task.id, event.target.value as TaskStatus)}
            className={`
              w-full
              appearance-none
              rounded-xl
              border
              bg-white
              px-3
              py-2.5
              pr-9
              text-sm
              font-medium
              outline-none
              transition
              disabled:opacity-50
              ${
                task.status === "TODO"
                  ? "border-yellow-200 text-yellow-700 focus:border-yellow-400"
                  : task.status === "IN_PROGRESS"
                    ? "border-blue-200 text-blue-700 focus:border-blue-400"
                    : "border-green-200 text-green-700 focus:border-green-400"
              }
            `}
          >
            <option value="TODO">TODO</option>

            <option value="IN_PROGRESS">IN PROGRESS</option>

            <option value="DONE">DONE</option>
          </select>

          <ChevronDown
            size={16}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-stone-400
            "
          />
        </div>

        {canAssign && onAssign && (
          <button
            type="button"
            onClick={() => onAssign(task)}
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
              transition
              hover:bg-[#FAF6F0]
            "
          >
            <UserRound size={16} />

            {task.assignedTo ? "Reassign" : "Assign"}
          </button>
        )}
      </div>

      {task.status === "DONE" && (
        <div
          className="
            mt-3
            flex
            items-center
            gap-2
            text-xs
            font-medium
            text-green-600
          "
        >
          <Check size={14} />
          Task completed
        </div>
      )}
    </div>
  );
}