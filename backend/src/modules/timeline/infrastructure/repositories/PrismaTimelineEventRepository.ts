import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { TimelineEvent } from "../../domain/entity/timelineEvent.entity";
import { ITimelineEventRepository } from "../../domain/interfaces/ITimelineEventRepository"; 
import { TimelineEventMapper } from "../mappers/TimelineEventMapper"; 

@injectable()
export class PrismaTimelineEventRepository implements ITimelineEventRepository {

    async create(timelineEvent: TimelineEvent): Promise<TimelineEvent> {
        const createdTimelineEvent = await prisma.timelineEvent.create({
            data: TimelineEventMapper.toDb(timelineEvent),
        });

        return TimelineEventMapper.fromDb(createdTimelineEvent);
    }

    async findByIncidentId(incidentId: string): Promise<TimelineEvent[]> {
        const timelineEvents = await prisma.timelineEvent.findMany({
            where: {
                incidentId,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return timelineEvents.map(TimelineEventMapper.fromDb);
    }
}