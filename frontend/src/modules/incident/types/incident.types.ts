export type IncidentStatus = | "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";


export type IncidentPriority = | "P1" | "P2" | "P3" | "P4";


export type IncidentSeverity = | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";


export type IncidentType = | "MANUAL" | "AUTOMATED";


export interface Incident {
    id: string;
    organizationId: string;
    title: string;
    description?: string;
    severity: IncidentSeverity;
    priority?: IncidentPriority;
    type: IncidentType;
    status: IncidentStatus;
    assignedTeamId?: string;
    monitoringProjectId?: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}


export interface CreateIncidentDto {
    title: string;
    description?: string;
    severity: IncidentSeverity;
    priority?: IncidentPriority;
    assignedTeamId?: string;
    type: IncidentType;
}


export interface UpdateIncidentStatusDto {
    status: IncidentStatus;
}


export interface AssignIncidentTeamDto {
    teamId: string;
}


export interface GetIncidentsParams {
    page?: number;
    limit?: number;
    status?: IncidentStatus;
    priority?: IncidentPriority;
    severity?: IncidentSeverity;
    assignedTeamId?: string;
}


export interface GetIncidentsResponse {
    data: Incident[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface IncidentStats {
    total: number;
    status: Partial<Record<IncidentStatus, number>>;
    severity: Partial<Record<IncidentSeverity, number>>;
    priority: Partial<Record<IncidentPriority, number>>;
}