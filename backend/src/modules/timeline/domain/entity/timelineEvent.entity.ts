import { TimelineEventType } from "../enums/timelineEventType.enum";

interface TimelineEventProps {
    id?: string;
    incidentId: string;
    eventType: TimelineEventType;
    message: string;
    createdBy?: string | null;
    createdAt?: Date;
}

export class TimelineEvent {
    public readonly id?: string;
    public readonly incidentId: string;
    public readonly eventType: TimelineEventType;
    public readonly message: string;
    public readonly createdBy?: string | null;
    public readonly createdAt?: Date;

    constructor(props: TimelineEventProps) {
        this.id = props.id;
        this.incidentId = props.incidentId;
        this.eventType = props.eventType;
        this.message = props.message;
        this.createdBy = props.createdBy ?? null;
        this.createdAt = props.createdAt;
    }
}