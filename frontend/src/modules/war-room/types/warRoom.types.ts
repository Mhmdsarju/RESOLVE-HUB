export type WarRoomStatus = "ACTIVE" | "CLOSED";

export interface WarRoomIncident {
    id: string;
    title: string;
    description?: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    priority?: "P1" | "P2" | "P3" | "P4";
    status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
    type: "MANUAL" | "AUTOMATED";
    assignedTeamId?: string;
    monitoringProjectId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface WarRoom {
    id: string;
    incidentId: string;
    createdBy: string;
    status: WarRoomStatus;
    createdAt: string;
    updatedAt: string;
    closedAt?: string | null;
    incident?: WarRoomIncident;
}

export interface CreateWarRoomPayload {
    incidentId: string;
}

export interface GetWarRoomsParams {
    page?: number;
    limit?: number;
    status?: WarRoomStatus;
    search?: string;
}

export interface GetWarRoomsResponse {
    items: WarRoom[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface WarRoomCardProps {
  warRoom: WarRoom;
  onClick?: () => void;
  onJoin?: () => void;
  canJoin?: boolean;
}

export interface WarRoomFiltersProps {
  filters: GetWarRoomsParams;
  onChange: (filters: GetWarRoomsParams) => void;
  onReset: () => void;
}

export interface WarRoomPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface WarRoomIncidentCardProps {
  warRoom: WarRoom;
}

export interface WarRoomActionsProps {
  warRoom: WarRoom;
  canClose?: boolean;
  isJoined?: boolean;
  isJoining?: boolean;
  isLeaving?: boolean;
  isClosing?: boolean;
  onJoin?: () => void;
  onLeave?: () => void;
  onClose?: () => void;
}

export interface WarRoomEmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export interface WarRoomErrorStateProps {
  onRetry?: () => void;
}

export interface CreateWarRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface WarRoomDetailsPageProps {
  canClose?: boolean;
}