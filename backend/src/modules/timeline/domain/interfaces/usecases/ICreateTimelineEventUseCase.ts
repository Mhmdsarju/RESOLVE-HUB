import { TimelineEvent } from "../../entity/timelineEvent.entity";
import { TimelineEventType } from "../../enums/timelineEventType.enum";

export interface ICreateTimelineEventUseCase {
    execute(
        incidentId: string,
        eventType: TimelineEventType,
        message: string,
        actorId?: string | null,
    ): Promise<TimelineEvent>;
}