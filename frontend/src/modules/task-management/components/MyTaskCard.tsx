import { CalendarDays, Check, ChevronDown, Clock3, Pencil, Trash2, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { TaskCardProps, TaskStatus } from "../types/task.types";

const statusStyles: Record<
  TaskStatus,
  {
    badge: string;
    border: string;
  }
> = {
  TODO: {
    badge: "bg-yellow-50 text-yellow-700",
    border: "border-yellow-200",
  },
  IN_PROGRESS: {
    badge: "bg-blue-50 text-blue-700",
    border: "border-blue-200",
  },
  DONE: {
    badge: "bg-green-50 text-green-700",
    border: "border-green-200",
  },
};

export default function MyTaskCard({
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
  const navigate = useNavigate();

  const statusLabel = task.status.replace("_", " ");

  const assignedUser = users.find((user) => user.id === task.assignedTo);

  const isAssignedToCurrentUser = Boolean(currentUserId && task.assignedTo === currentUserId);

  const assignedUserName = isAssignedToCurrentUser ? "You" : (assignedUser?.name ?? "Unassigned");

  const isOrgAdmin = role === "ORG_ADMIN";

  const isEngineerTeamLead = role === "ENGINEER" && isTeamLead;

  const canEdit = isOrgAdmin || isEngineerTeamLead;

  const canAssign = isOrgAdmin || isEngineerTeamLead;

  const canDelete = isOrgAdmin;

  const projectName = task.projectName ?? "No Project";

  const handleTaskClick = () => {
    navigate(`/tasks/${task.id}`, {
      state: {
        projectName,
        assignedUserName,
      },
    });
  };

  return (
    <div
      onClick={handleTaskClick}
      className={`
        cursor-pointer
        rounded-2xl
        border-2
        ${statusStyles[task.status].border}
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
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
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
              PROJECT
            </span>

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

            {isEngineerTeamLead && (
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

          <h3
            className="
              mt-3
              truncate
              text-lg
              font-bold
              text-[#4B3932]
            "
          >
            {task.title}
          </h3>

          <p
            className="
              mt-1
              truncate
              text-sm
              font-semibold
              text-[#8B6F61]
            "
          >
            {projectName}
          </p>

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
        </div>

        {(canEdit || canDelete) && (
          <div
            className="flex shrink-0 items-center gap-1"
            onClick={(event) => event.stopPropagation()}
          >
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
            ${statusStyles[task.status].badge}
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
          gap-4
          border-t
          border-[#E7DDD3]
          pt-4
          sm:grid-cols-2
        "
      >
        <div className="min-w-0">
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
            <CalendarDays size={14} />
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

      <div
        className="mt-4 flex flex-col gap-2 sm:flex-row"
        onClick={(event) => event.stopPropagation()}
      >
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

      {task.type === "AUTOMATIC" && (
        <div
          className="
            mt-3
            flex
            items-center
            gap-2
            text-xs
            text-purple-500
          "
        >
          <Clock3 size={14} />
          Automatically created from monitoring alert
        </div>
      )}
    </div>
  );
}
