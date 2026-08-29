import {
    TimelineEvent as PrismaTimelineEvent,
    TimelineEventType as PrismaTimelineEventType,
} from "@prisma/client";

import { TimelineEvent } from "../../domain/entity/timelineEvent.entity";
import { TimelineEventType } from "../../domain/enums/timelineEventType.enum";

export class TimelineEventMapper {

    static toDb(timelineEvent: TimelineEvent) {
        return {
            incidentId: timelineEvent.incidentId,
            actorId: timelineEvent.createdBy,
            eventType: timelineEvent.eventType as PrismaTimelineEventType,
            message: timelineEvent.message,
        };
    }

    static fromDb(data: PrismaTimelineEvent): TimelineEvent {
        return new TimelineEvent({
            id: data.id,
            incidentId: data.incidentId,
            eventType: data.eventType as TimelineEventType,
            message: data.message,
            createdBy: data.actorId,
            createdAt: data.createdAt,
        });
    }
}