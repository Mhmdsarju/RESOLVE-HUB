import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { TimelineEvent } from "../../domain/entity/timelineEvent.entity";
import { ITimelineEventRepository } from "../../domain/interfaces/ITimelineEventRepository";
import { TimelineEventMapper } from "../mappers/TimelineEventMapper";

type TimelineEventWithActor = TimelineEvent & {
    actorName: string | null;
};

@injectable()
export class PrismaTimelineEventRepository implements ITimelineEventRepository {

    async create(timelineEvent: TimelineEvent): Promise<TimelineEvent> {
        const createdTimelineEvent = await prisma.timelineEvent.create({
            data: TimelineEventMapper.toDb(timelineEvent),
        });

        return TimelineEventMapper.fromDb(createdTimelineEvent);
    }

    // async findByIncidentId(incidentId: string): Promise<TimelineEvent[]> {
    //     const timelineEvents = await prisma.timelineEvent.findMany({
    //         where: {
    //             incidentId,
    //         },
    //         orderBy: {
    //             createdAt: "asc",
    //         },
    //     });

    //     return timelineEvents.map(TimelineEventMapper.fromDb);
    // }


    async findByIncidentId(incidentId: string): Promise<TimelineEventWithActor[]> {
    const timelineEvents = await prisma.timelineEvent.findMany({
        where: {
            incidentId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    const actorIds = timelineEvents
        .map(event => event.actorId)
        .filter((id): id is string => Boolean(id));

    const users = await prisma.user.findMany({
        where: {
            id: {
                in: actorIds,
            },
        },
        select: {
            id: true,
            fullName: true,
        },
    });

    const userMap = new Map(
        users.map(user => [user.id, user.fullName])
    );

    return timelineEvents.map(event => ({
        ...TimelineEventMapper.fromDb(event),
        actorName: event.actorId
            ? userMap.get(event.actorId) ?? null
            : null,
    }));
}
}