import {
  AlertCircle,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  ListTodo,
  Loader2,
  RefreshCw,
} from "lucide-react";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import TaskCard from "../components/TaskCard";
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
  TaskStatus,
  UpdateTaskPayload,
  AssignUser,
} from "../types/task.types";

export default function EngineerTasksPage() {
  const user = useAuthStore((state) => state.user);

  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading, isError, refetch } = useMyTasks();

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

  const totalTasks = tasks.length;

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

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    const task = tasks.find((item) => item.id === taskId);

    if (!task || task.status === status) {
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

  const assigningUsers = assigningTask ? getTaskUsers(assigningTask.id) : [];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[#E7DDD3] bg-[#FFFEFC] px-6 py-7 shadow-sm sm:px-8">
          <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#F0E7D5]/60 blur-2xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932] shadow-sm">
                <ClipboardCheck size={26} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-400">
                  Workspace
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#4B3932] sm:text-3xl">
                  My Tasks
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-stone-500">
                  View your assigned tasks and manage their progress.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4B3932] text-sm font-bold text-white">
                {user?.name?.charAt(0).toUpperCase() ?? "U"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#4B3932]">
                  {user?.name ?? "Engineer"}
                </p>

                <p className="text-xs text-stone-400">{user?.email ?? "Your workspace"}</p>
              </div>
            </div>
          </div>
        </div>
        {!isLoading && !isError && tasks.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-[#E7DDD3] bg-[#FFFEFC] p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-500">Total Tasks</p>

                  <p className="mt-2 text-3xl font-bold text-[#4B3932]">{totalTasks}</p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0E7D5] text-[#4B3932]">
                  <ListTodo size={20} />
                </div>
              </div>

              <p className="mt-3 text-xs text-stone-400">Assigned to you</p>
            </div>

            <div className="rounded-2xl border border-[#E7DDD3] bg-[#FFFEFC] p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-500">To Do</p>

                  <p className="mt-2 text-3xl font-bold text-blue-600">{todoTasks}</p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Clock3 size={20} />
                </div>
              </div>

              <p className="mt-3 text-xs text-stone-400">Waiting to start</p>
            </div>

            <div className="rounded-2xl border border-[#E7DDD3] bg-[#FFFEFC] p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-500">In Progress</p>

                  <p className="mt-2 text-3xl font-bold text-purple-600">{inProgressTasks}</p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Loader2 size={20} />
                </div>
              </div>

              <p className="mt-3 text-xs text-stone-400">Currently working</p>
            </div>

            <div className="rounded-2xl border border-[#E7DDD3] bg-[#FFFEFC] p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-500">Completed</p>

                  <p className="mt-2 text-3xl font-bold text-green-600">{completedTasks}</p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <CheckCircle2 size={20} />
                </div>
              </div>

              <p className="mt-3 text-xs text-stone-400">Finished tasks</p>
            </div>
          </div>
        )}

        <div className="mt-8">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#4B3932]">Assigned Tasks</h2>

              <p className="mt-1 text-sm text-stone-500">Tasks currently assigned to you.</p>
            </div>

            {!isLoading && !isError && tasks.length > 0 && (
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

                <h3 className="mt-5 text-xl font-bold text-[#4B3932]">You're all caught up</h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
                  There are no tasks assigned to you at the moment.
                </p>
              </div>
            </div>
          )}
          {!isLoading && !isError && tasks.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {tasks.map((task) => {
                const teamData = getTaskTeamData(task.id);

                const users = getTaskUsers(task.id);

                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    users={users}
                    role={user?.role ?? "ENGINEER"}
                    currentUserId={user?.id}
                    isTeamLead={teamData?.isTeamLead ?? false}
                    onStatusChange={handleStatusChange}
                    onEdit={handleEdit}
                    onAssign={handleAssign}
                    onDelete={handleDelete}
                    isUpdating={updateStatusMutation.isPending}
                  />
                );
              })}
            </div>
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
