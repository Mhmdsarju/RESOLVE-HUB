import { TimelineEvent } from "../../entity/timelineEvent.entity";

export interface IGetIncidentTimelineUseCase {
    execute(incidentId: string,): Promise<TimelineEvent[]>;
}