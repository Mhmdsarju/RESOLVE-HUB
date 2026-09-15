import { ITimelineEventRepository } from "@/modules/timeline/domain/interfaces/ITimelineEventRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { CreateTimelineEventUseCase } from "@/modules/timeline/application/usecases/CreateTimelineEventUseCase";
import { GetIncidentTimelineUseCase } from "@/modules/timeline/application/usecases/GetIncidentTimelineUseCase";
import { TimelineEventController } from "@/modules/timeline/presentation/controller/TimelineEventController";
import { createTimelineEventRoutes } from "@/modules/timeline/presentation/routes/TimelineEventRoutes";

export function bindTimelineEvent(container: Container) {

    const timelineEventRepository = container.get<ITimelineEventRepository>(TYPES.TimeLineRepository);

    const createTimelineEventUseCase = new CreateTimelineEventUseCase(
        timelineEventRepository
    );

    const getIncidentTimelineUseCase = new GetIncidentTimelineUseCase(
        timelineEventRepository
    )

    const timelineEventController = new TimelineEventController(
        createTimelineEventUseCase,
        getIncidentTimelineUseCase
    )

    const timelineEventRouter = createTimelineEventRoutes(timelineEventController);

    return {
        timelineEventRouter,
        createTimelineEventUseCase
    }


}