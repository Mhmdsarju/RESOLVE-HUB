import type { User } from "@/modules/auth/types/auth.types";
import type { TeamMember } from "@/modules/team-member/types/teamMember.types";

export type TaskType = "MANUAL" | "AUTOMATIC";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type TeamRole = "LEAD" | "MEMBER";

export interface Task {
    id: string;

    title: string;
    description?: string;

    incidentId: string;
    assignedTo?: string;

    teamId?: string;
    teamRole?: TeamRole;

    projectName?: string;

    type: TaskType;
    status: TaskStatus;
    priority: TaskPriority;

    dueDate?: string;

    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskPayload {
    title: string;
    description?: string;
    incidentId: string;
    assignedTo?: string;
    priority?: TaskPriority;
    dueDate?: string;
}

export interface UpdateTaskPayload {
    title?: string;
    description?: string;
    assignedTo?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: string;
}

export interface UpdateTaskStatusPayload {
    taskId: string;
    status: TaskStatus;
}

export interface AssignTaskPayload {
    taskId: string;
    userId: string;
}

export interface GetTasksParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    assignedTo?: string;
    type?:string;
}

export interface TaskPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface GetTasksResponse {
    data: Task[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface AssignUser {
  id: string;
  name: string;
  email?: string;
}
export interface AssignTaskModalProps {
  task: Task | null;
  users: AssignUser[];
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (userId: string) => void;
}
export interface AssignTaskFormProps {
  task: Task;
  users: AssignUser[];
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (userId: string) => void;
}
export interface CreateTaskModalProps {
  incidentId: string;
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateTaskPayload, onSuccess: () => void) => void;
}
export interface DeleteTaskModalProps {
  taskTitle: string;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export interface EditTaskModalProps {
  task: Task | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (payload: UpdateTaskPayload) => void;
}
export interface EditTaskFormProps {
  task: Task;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (payload: UpdateTaskPayload) => void;
}
export interface TaskCardProps {
  task: Task;
  users: AssignUser[];
  role: User["role"];
  currentUserId?: string;
  isTeamLead?: boolean;

  onStatusChange: (
    taskId: string,
    status: TaskStatus,
  ) => void;

  onEdit?: (task: Task) => void;
  onAssign?: (task: Task) => void;
  onDelete?: (task: Task) => void;

  isUpdating?: boolean;
}
export interface TaskConfirmationModalProps {
  type: "delete" | "status";
  taskTitle: string;
  status?: string;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export interface TaskPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface TaskTeamData {
    taskId: string;
    teamId?: string;
    members: TeamMember[];
    isTeamLead: boolean;
}