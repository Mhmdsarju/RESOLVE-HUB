import { IGetIncidentTimelineUseCase } from "../../domain/interfaces/usecases/IGetIncidentTimelineUseCase";
import { ITimelineEventRepository } from "../../domain/interfaces/ITimelineEventRepository";
import { TimelineEvent } from "../../domain/entity/timelineEvent.entity";

export class GetIncidentTimelineUseCase implements IGetIncidentTimelineUseCase {

    constructor(
        private readonly timelineEventRepository: ITimelineEventRepository,
    ) { }

    async execute(incidentId: string,): Promise<TimelineEvent[]> {
        return await this.timelineEventRepository.findByIncidentId(
            incidentId,
        );
    }
}