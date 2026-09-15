import {
  AlertCircle,
  CheckSquare,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

import TaskCard from "./TaskCard";
import TaskPagination from "./TaskPagination";
import CreateTaskModal from "./CreateTaskModal";
import EditTaskModal from "./EditTaskModal";
import AssignTaskModal from "./AssignTaskModal";
import TaskConfirmationModal from "./TaskConfirmationModel";

import { useTasks } from "../hooks/useTasks";
import { useCreateTask } from "../hooks/useCreateTask";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";
import { useAssignTask } from "../hooks/useAssignTask";
import { useDeleteTask } from "../hooks/useDeleteTask";

import { useTeamMembers } from "@/modules/team-member/hooks/useTeamMembers";
import { useAuthStore } from "@/modules/auth/store/authStore";

import type {
  AssignTaskPayload,
  Task,
  TaskPriority,
  TaskStatus,
  AssignUser,
} from "../types/task.types";

interface TaskSectionProps {
  incidentId: string;
  teamId: string;
}

export default function TaskSection({ incidentId, teamId }: TaskSectionProps) {
  const user = useAuthStore((state) => state.user);

  const [page, setPage] = useState(1);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<TaskStatus | "">("");

  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "">("");

  const [assignedToFilter, setAssignedToFilter] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [assigningTask, setAssigningTask] = useState<Task | null>(null);

  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const [statusChange, setStatusChange] = useState<{ task: Task; status: TaskStatus } | null>(null);

  const limit = 6;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  const { data, isLoading, isError } = useTasks(incidentId, {
    page,
    limit,
    search: search || undefined,
    status: statusFilter || undefined,
    priority: priorityFilter || undefined,
    assignedTo: assignedToFilter || undefined,
  });

  const { data: teamMembersData, isLoading: isLoadingTeamMembers } = useTeamMembers(teamId, {
    page: 1,
    limit: 100,
  });

  const createTaskMutation = useCreateTask(incidentId);

  const updateTaskMutation = useUpdateTask(incidentId);

  const updateStatusMutation = useUpdateTaskStatus(incidentId);

  const assignTaskMutation = useAssignTask(incidentId);

  const deleteTaskMutation = useDeleteTask(incidentId);

  const tasks = data?.data ?? [];

  const pagination = data
    ? {
        page: data.page,
        limit: data.limit,
        total: data.total,
        totalPages: data.totalPages,
      }
    : undefined;

  const users: AssignUser[] =
    teamMembersData?.items?.map((member) => ({
      id: member.userId,
      name: member.name,
      email: member.email,
    })) ?? [];

  const hasFilters =
    Boolean(searchInput.trim()) ||
    Boolean(statusFilter) ||
    Boolean(priorityFilter) ||
    Boolean(assignedToFilter);

  const handleCreateTask = (payload: Parameters<typeof createTaskMutation.mutate>[0]) => {
    createTaskMutation.mutate(payload, {
      onSuccess: () => {
        setIsCreateOpen(false);
        setPage(1);
      },
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const handleStatusFilterChange = (value: TaskStatus | "") => {
    setStatusFilter(value);
    setPage(1);
  };

  const handlePriorityFilterChange = (value: TaskPriority | "") => {
    setPriorityFilter(value);
    setPage(1);
  };

  const handleAssignedToFilterChange = (value: string) => {
    setAssignedToFilter(value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearch("");
    setStatusFilter("");
    setPriorityFilter("");
    setAssignedToFilter("");
    setPage(1);
  };

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    const task = tasks.find((item) => item.id === taskId);

    if (!task) {
      return;
    }

    if (task.status === status) {
      return;
    }

    setStatusChange({
      task,
      status,
    });
  };

  const handleStatusConfirm = () => {
    if (!statusChange) {
      return;
    }

    updateStatusMutation.mutate(
      {
        taskId: statusChange.task.id,
        status: statusChange.status,
      },
      {
        onSuccess: () => {
          setStatusChange(null);
        },
      },
    );
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdate = (payload: Parameters<typeof updateTaskMutation.mutate>[0]["payload"]) => {
    if (!editingTask) {
      return;
    }

    updateTaskMutation.mutate(
      {
        taskId: editingTask.id,
        payload,
      },
      {
        onSuccess: () => {
          setEditingTask(null);
        },
      },
    );
  };

  const handleAssign = (task: Task) => {
    setAssigningTask(task);
  };

  const handleAssignSubmit = (userId: string) => {
    if (!assigningTask) {
      return;
    }

    const payload: AssignTaskPayload = {
      taskId: assigningTask.id,
      userId,
    };

    assignTaskMutation.mutate(payload, {
      onSuccess: () => {
        setAssigningTask(null);
      },
    });
  };

  const handleDelete = (task: Task) => {
    setDeletingTask(task);
  };

  const handleDeleteConfirm = () => {
    if (!deletingTask) {
      return;
    }

    deleteTaskMutation.mutate(deletingTask.id, {
      onSuccess: () => {
        setDeletingTask(null);

        if (tasks.length === 1 && page > 1) {
          setPage((current) => current - 1);
        }
      },
    });
  };

  if (isLoading) {
    return (
      <section className="mt-6 rounded-3xl border border-[#E7DDD3] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-6 w-24 animate-pulse rounded bg-[#F0E7D5]" />

            <div className="mt-2 h-4 w-48 animate-pulse rounded bg-[#FAF6F0]" />
          </div>

          <div className="h-10 w-28 animate-pulse rounded-xl bg-[#FAF6F0]" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-52 animate-pulse rounded-2xl border border-[#E7DDD3] bg-[#FFFEFC]"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mt-6 rounded-3xl border border-red-100 bg-white p-6 shadow-sm">
        <div className="flex min-h-48 flex-col items-center justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <RefreshCw size={24} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-[#4B3932]">Unable to load tasks</h3>

          <p className="mt-2 max-w-md text-sm text-stone-500">
            Something went wrong while loading tasks for this incident.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="mt-6 rounded-3xl border border-[#E7DDD3] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0E7D5] text-[#4B3932]">
                <CheckSquare size={20} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#4B3932]">Tasks</h2>

                <p className="mt-0.5 text-sm text-stone-500">
                  Manage tasks related to this incident.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4B3932] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3B2E29] hover:shadow-md"
          >
            <Plus size={17} />
            Add Task
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#4B3932]">
            <SlidersHorizontal size={17} />
            Search & Filters
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-4">
            <div className="relative lg:col-span-2">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />

              <input
                type="text"
                value={searchInput}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search tasks..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  bg-white
                  py-2.5
                  pl-10
                  pr-10
                  text-sm
                  text-[#4B3932]
                  outline-none
                  transition
                  focus:border-[#BFAEA1]
                "
              />

              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="
                    absolute
                    right-3
                    top-1/2
                    flex
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    p-1
                    text-stone-400
                    transition
                    hover:bg-[#F0E7D5]
                    hover:text-[#4B3932]
                  "
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <select
              value={statusFilter}
              onChange={(event) => handleStatusFilterChange(event.target.value as TaskStatus | "")}
              className="w-full rounded-xl border border-[#E7DDD3] bg-white px-3 py-2.5 text-sm text-[#4B3932] outline-none focus:border-[#BFAEA1]"
            >
              <option value="">All Status</option>

              <option value="TODO">TODO</option>

              <option value="IN_PROGRESS">IN PROGRESS</option>

              <option value="DONE">DONE</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(event) =>
                handlePriorityFilterChange(event.target.value as TaskPriority | "")
              }
              className="w-full rounded-xl border border-[#E7DDD3] bg-white px-3 py-2.5 text-sm text-[#4B3932] outline-none focus:border-[#BFAEA1]"
            >
              <option value="">All Priority</option>

              <option value="LOW">LOW</option>

              <option value="MEDIUM">MEDIUM</option>

              <option value="HIGH">HIGH</option>
            </select>

            <select
              value={assignedToFilter}
              onChange={(event) => handleAssignedToFilterChange(event.target.value)}
              disabled={isLoadingTeamMembers}
              className="w-full rounded-xl border border-[#E7DDD3] bg-white px-3 py-2.5 text-sm text-[#4B3932] outline-none focus:border-[#BFAEA1] disabled:opacity-60 lg:col-span-2"
            >
              <option value="">All Engineers</option>

              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {hasFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E7DDD3] bg-white px-4 py-2.5 text-sm font-semibold text-[#4B3932] transition hover:bg-white/70 lg:col-span-2"
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="mt-6 flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-[#D8C9BD] bg-[#FFFEFC] px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932]">
              <AlertCircle size={25} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#4B3932]">
              {hasFilters ? "No matching tasks" : "No tasks yet"}
            </h3>

            <p className="mt-1 max-w-md text-sm leading-6 text-stone-500">
              {hasFilters
                ? "Try changing your search or filters."
                : "Create a task to track work for this incident."}
            </p>

            {hasFilters ? (
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#E7DDD3] bg-white px-4 py-2.5 text-sm font-semibold text-[#4B3932] hover:bg-[#FAF6F0]"
              >
                <X size={16} />
                Clear Filters
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#E7DDD3] bg-white px-4 py-2.5 text-sm font-semibold text-[#4B3932] hover:bg-[#FAF6F0]"
              >
                <Plus size={16} />
                Create First Task
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  users={users}
                  role={user?.role ?? "ENGINEER"}
                  currentUserId={user?.id}
                  onStatusChange={handleStatusChange}
                  onEdit={handleEdit}
                  onAssign={handleAssign}
                  onDelete={handleDelete}
                  isUpdating={updateStatusMutation.isPending}
                />
              ))}
            </div>

            {pagination && (
              <TaskPagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </section>

      <CreateTaskModal
        incidentId={incidentId}
        isOpen={isCreateOpen}
        isSubmitting={createTaskMutation.isPending}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateTask}
      />

      <EditTaskModal
        task={editingTask}
        isSubmitting={updateTaskMutation.isPending}
        onClose={() => setEditingTask(null)}
        onSubmit={handleUpdate}
      />

      <AssignTaskModal
        task={assigningTask}
        users={users}
        isSubmitting={assignTaskMutation.isPending || isLoadingTeamMembers}
        onClose={() => setAssigningTask(null)}
        onSubmit={handleAssignSubmit}
      />

      {deletingTask && (
        <TaskConfirmationModal
          type="delete"
          taskTitle={deletingTask.title}
          isSubmitting={deleteTaskMutation.isPending}
          onClose={() => setDeletingTask(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {statusChange && (
        <TaskConfirmationModal
          type="status"
          taskTitle={statusChange.task.title}
          status={statusChange.status}
          isSubmitting={updateStatusMutation.isPending}
          onClose={() => setStatusChange(null)}
          onConfirm={handleStatusConfirm}
        />
      )}
    </>
  );
}
