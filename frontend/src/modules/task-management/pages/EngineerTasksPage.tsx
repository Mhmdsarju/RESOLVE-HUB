import { AlertCircle, CheckCircle2, Loader2, RefreshCw } from "lucide-react";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import MyTasksHeader from "../components/MyTasksHeader";
import MyTasksStats from "../components/MyTasksStats";
import MyTasksFilters from "../components/MyTasksFilters";
import MyTasksList from "../components/MyTasksList";
import MyTasksPagination from "../components/MyTasksPagination";

import EditTaskModal from "../components/EditTaskModal";
import AssignTaskModal from "../components/AssignTaskModal";
import TaskConfirmationModal from "../components/TaskConfirmationModel";

import { useMyTasks } from "../hooks/useMyTasks";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useAssignTask } from "../hooks/useAssignTask";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useMyTaskTeamMembers } from "../hooks/useMyTaskTeamMembers";

import { useAuthStore } from "@/modules/auth/store/authStore";

import type {
  AssignTaskPayload,
  Task,
  TaskPriority,
  TaskStatus,
  TaskType,
  UpdateTaskPayload,
  AssignUser,
} from "../types/task.types";

export default function EngineerTasksPage() {
  const user = useAuthStore((state) => state.user);

  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const limit = 6;

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<TaskStatus | "">("");

  const [priority, setPriority] = useState<TaskPriority | "">("");

  const [type, setType] = useState<TaskType | "">("");

  const { data, isLoading, isError, refetch } = useMyTasks({
    page,
    limit,
    search: search || undefined,
    status: status || undefined,
    priority: priority || undefined,
    type: type || undefined,
  });

  const tasks = data?.data ?? [];

  const totalTasks = data?.total ?? 0;

  const totalPages = data?.totalPages ?? 1;

  const { data: taskTeamData = [] } = useMyTaskTeamMembers(tasks, user?.id);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [assigningTask, setAssigningTask] = useState<Task | null>(null);

  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const [statusChange, setStatusChange] = useState<{
    task: Task;
    status: TaskStatus;
  } | null>(null);

  const updateStatusMutation = useUpdateTaskStatus();

  const updateTaskMutation = useUpdateTask(editingTask?.incidentId ?? "");

  const assignTaskMutation = useAssignTask(assigningTask?.incidentId ?? "");

  const deleteTaskMutation = useDeleteTask(deletingTask?.incidentId ?? "");

  const todoTasks = tasks.filter((task) => task.status === "TODO").length;

  const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS").length;

  const completedTasks = tasks.filter((task) => task.status === "DONE").length;

  const getTaskTeamData = (taskId: string) => {
    return taskTeamData.find((item) => item.taskId === taskId);
  };

  const getTaskUsers = (taskId: string): AssignUser[] => {
    const teamData = getTaskTeamData(taskId);

    return (
      teamData?.members.map((member) => ({
        id: member.userId,
        name: member.name,
        email: member.email,
      })) ?? []
    );
  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    const task = tasks.find((item) => item.id === taskId);

    if (!task || task.status === newStatus) {
      return;
    }

    setStatusChange({
      task,
      status: newStatus,
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

          queryClient.invalidateQueries({
            queryKey: ["my-tasks"],
          });
        },
      },
    );
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdate = (payload: UpdateTaskPayload) => {
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

          queryClient.invalidateQueries({
            queryKey: ["my-tasks"],
          });
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

        queryClient.invalidateQueries({
          queryKey: ["my-tasks"],
        });
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

        queryClient.invalidateQueries({
          queryKey: ["my-tasks"],
        });
      },
    });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilterChange = (value: TaskStatus | "") => {
    setStatus(value);
    setPage(1);
  };

  const handlePriorityFilterChange = (value: TaskPriority | "") => {
    setPriority(value);
    setPage(1);
  };

  const handleTypeFilterChange = (value: TaskType | "") => {
    setType(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const assigningUsers = assigningTask ? getTaskUsers(assigningTask.id) : [];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
        <MyTasksHeader user={user} />

        {!isLoading && !isError && tasks.length > 0 && (
          <MyTasksStats
            totalTasks={totalTasks}
            todoTasks={todoTasks}
            inProgressTasks={inProgressTasks}
            completedTasks={completedTasks}
          />
        )}

        <MyTasksFilters
          search={search}
          status={status}
          priority={priority}
          type={type}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusFilterChange}
          onPriorityChange={handlePriorityFilterChange}
          onTypeChange={handleTypeFilterChange}
        />

        <div className="mt-8">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#4B3932]">Assigned Tasks</h2>

              <p className="mt-1 text-sm text-stone-500">Tasks currently assigned to you.</p>
            </div>

            {!isLoading && !isError && (
              <div className="rounded-xl border border-[#E7DDD3] bg-white px-3 py-2 text-xs font-semibold text-stone-500">
                {totalTasks} {totalTasks === 1 ? "task" : "tasks"}
              </div>
            )}
          </div>

          {isLoading && (
            <div className="rounded-3xl border border-[#E7DDD3] bg-[#FFFEFC] p-10 shadow-sm">
              <div className="flex min-h-280px flex-col items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932]">
                  <Loader2 size={25} className="animate-spin" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#4B3932]">Loading your tasks</h3>

                <p className="mt-1 text-sm text-stone-500">
                  Please wait while we fetch your assigned tasks.
                </p>
              </div>
            </div>
          )}

          {isError && (
            <div className="rounded-3xl border border-red-100 bg-[#FFFEFC] p-10 shadow-sm">
              <div className="flex min-h-280px flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                  <AlertCircle size={26} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#4B3932]">Couldn't load your tasks</h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
                  We couldn't fetch your assigned tasks right now.
                </p>

                <button
                  type="button"
                  onClick={() => refetch()}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#4B3932] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3B2E29]"
                >
                  <RefreshCw size={16} />
                  Try Again
                </button>
              </div>
            </div>
          )}

          {!isLoading && !isError && tasks.length === 0 && (
            <div className="rounded-3xl border border-[#E7DDD3] bg-[#FFFEFC] p-10 shadow-sm">
              <div className="flex min-h-280px flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932]">
                  <CheckCircle2 size={30} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#4B3932]">No tasks found</h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
                  Try changing your search or filters.
                </p>
              </div>
            </div>
          )}

          {!isLoading && !isError && tasks.length > 0 && (
            <>
              <MyTasksList
                tasks={tasks}
                taskTeamData={taskTeamData}
                taskCardProps={{
                  role: user?.role ?? "ENGINEER",
                  currentUserId: user?.id,
                  onStatusChange: handleStatusChange,
                  onEdit: handleEdit,
                  onAssign: handleAssign,
                  onDelete: handleDelete,
                  isUpdating: updateStatusMutation.isPending,
                }}
              />

              <MyTasksPagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>

      <EditTaskModal
        task={editingTask}
        isSubmitting={updateTaskMutation.isPending}
        onClose={() => setEditingTask(null)}
        onSubmit={handleUpdate}
      />

      <AssignTaskModal
        task={assigningTask}
        users={assigningUsers}
        isSubmitting={assignTaskMutation.isPending}
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
    </div>
  );
}
