import { IUpdateIncidentStatusUseCase } from "../../domain/interfaces/use-cases/IUpdateIncidentStatusUseCase";
import { IIncidentRepository } from "../../domain/interfaces/IIncidentRepository";
import { UpdateIncidentStatusDto } from "../dto/updateIncidentStatusDto";
import { Status } from "../../domain/enums/status.enum";
import { Incident } from "../../domain/entities/incident.entity";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { ICreateTimelineEventUseCase } from "@/modules/timeline/domain/interfaces/usecases/ICreateTimelineEventUseCase";
import { TimelineEventType } from "@/modules/timeline/domain/enums/timelineEventType.enum";
import { ICreateNotificationUseCase } from "@/modules/notification/domain/interface/use-case/ICreateNotificationUseCase";
import { NotificationType } from "@/modules/notification/domain/enums/NotificationType";

export class UpdateIncidentStatusUseCase implements IUpdateIncidentStatusUseCase {
    constructor(
        private readonly incidentRepository: IIncidentRepository,
        private readonly createTimelineEventUseCase: ICreateTimelineEventUseCase,
        private readonly createNotificationUseCase: ICreateNotificationUseCase,
    ) { }

    async execute(id: string, dto: UpdateIncidentStatusDto, userId?: string | null): Promise<Incident> {
        const incident = await this.incidentRepository.findById(id);
        if (!incident) {
            throw new AppError("Incident not Found", HttpStatusCode.NOT_FOUND);
        }

        if (incident.status == Status.CLOSED) {
            throw new AppError("Closed incident cannot be updated", HttpStatusCode.BAD_REQUEST)
        }

        const updated = await this.incidentRepository.update(id, { status: dto.status });

        await this.createTimelineEventUseCase.execute(
            incident.id!,
            TimelineEventType.INCIDENT_STATUS_CHANGED,
            `Incident status changed from ${incident.status} to ${updated.status}`,
            userId ?? null,
        );

        if (incident.createdBy) {
            await this.createNotificationUseCase.execute({
                userId: incident.createdBy,
                type: NotificationType.INCIDENT,
                title: "Incident Status Updated",
                message: `Incident "${incident.title}" status changed from ${incident.status} to ${updated.status}.`,
            });
        }


        return updated;
    }

}