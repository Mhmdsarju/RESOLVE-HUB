import { ICreateTimelineEventUseCase } from "../../domain/interfaces/usecases/ICreateTimelineEventUseCase";
import { ITimelineEventRepository } from "../../domain/interfaces/ITimelineEventRepository";
import { TimelineEvent } from "../../domain/entity/timelineEvent.entity";
import { TimelineEventType } from "../../domain/enums/timelineEventType.enum";

export class CreateTimelineEventUseCase implements ICreateTimelineEventUseCase {

    constructor(
        private readonly timelineEventRepository: ITimelineEventRepository,
    ) { }

    async execute(incidentId: string, eventType: TimelineEventType, message: string, actorId?: string | null,): Promise<TimelineEvent> {

        const timelineEvent = new TimelineEvent({
            incidentId,
            eventType,
            message,
            createdBy: actorId ?? null,
        });

        return await this.timelineEventRepository.create(timelineEvent);
    }
}