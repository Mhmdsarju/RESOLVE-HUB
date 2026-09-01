import { Request, Response, NextFunction } from "express";

import { BaseController } from "@/shared/base/controllers/BaseController";
import { ResponseHandler } from "@/shared/response/response-handler";

import { ICreateTimelineEventUseCase } from "../../domain/interfaces/usecases/ICreateTimelineEventUseCase"; 
import { IGetIncidentTimelineUseCase } from "../../domain/interfaces/usecases/IGetIncidentTimelineUseCase"; 
import { TimelineEventType } from "../../domain/enums/timelineEventType.enum";

export class TimelineEventController extends BaseController {
    constructor(
        private readonly createTimelineEventUseCase: ICreateTimelineEventUseCase,
        private readonly getIncidentTimelineUseCase: IGetIncidentTimelineUseCase,
    ) {
        super();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            const timelineEvent = await this.createTimelineEventUseCase.execute(
                req.body.incidentId,
                req.body.eventType as TimelineEventType,
                req.body.message,
                currentUser.userId,
            );

            return ResponseHandler.success(
                res,
                "Timeline event created successfully",
                timelineEvent,
            );
        } catch (error) {
            next(error);
        }
    }

    async getByIncidentId(req: Request, res: Response, next: NextFunction) {
        try {
            this.getCurrentUser(req);

            const timelineEvents = await this.getIncidentTimelineUseCase.execute(
                req.params.incidentId,
            );

            return ResponseHandler.success(
                res,
                "Incident timeline fetched successfully",
                timelineEvents,
            );
        } catch (error) {
            next(error);
        }
    }
}