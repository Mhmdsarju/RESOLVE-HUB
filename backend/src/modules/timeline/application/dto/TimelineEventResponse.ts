import { TimelineEventType } from "../../domain/enums/timelineEventType.enum";

export interface TimelineEventResponse {
    id: string;
    incidentId: string;
    eventType: TimelineEventType;
    message: string;
    createdBy: string | null;
    createdByName: string | null;
    createdAt: Date;
}