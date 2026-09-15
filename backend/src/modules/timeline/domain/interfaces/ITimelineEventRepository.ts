import { TimelineEvent } from "../entity/timelineEvent.entity"; 

export interface ITimelineEventRepository {
    create(timelineEvent: TimelineEvent): Promise<TimelineEvent>;
    findByIncidentId(incidentId: string): Promise<TimelineEvent[]>;
}