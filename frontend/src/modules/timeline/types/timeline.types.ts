export type TimelineEventType =
    | "INCIDENT_CREATED"
    | "INCIDENT_STATUS_CHANGED"
    | "INCIDENT_UPDATED"
    | "TASK_CREATED"
    | "TASK_ASSIGNED"
    | "TASK_STATUS_CHANGED"
    | "TASK_COMPLETED"
    | "TASK_UPDATED"
    | "FILE_UPLOADED"
    | "FILE_DELETED"
    | "WAR_ROOM_CREATED"
    | "WAR_ROOM_JOINED"
    | "WAR_ROOM_LEFT"
    | "WAR_ROOM_CLOSED"
    | "INCIDENT_CREATED_FROM_ALERT";


export interface TimelineEvent {
    id: string;
    incidentId: string;
    actorId?: string | null;
    eventType: TimelineEventType;
    message: string;
    metadata?: Record<string, unknown> | null;
    createdAt: string;
}