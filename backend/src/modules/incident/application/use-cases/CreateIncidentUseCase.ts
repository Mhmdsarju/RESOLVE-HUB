import { ICreateIncidentUseCase } from "../../domain/interfaces/use-cases/ICreateIncidentUseCase";
import { IIncidentRepository } from "../../domain/interfaces/IIncidentRepository";
import { CreateIncidentDto } from "../dto/createIncidentDto";
import { Incident } from "../../domain/entities/incident.entity";
import { Status } from "../../domain/enums/status.enum";
import { Priority } from "../../domain/enums/priority.enum";
import { ICreateWarRoomUseCase } from "@/modules/war-room/domain/interface/usecase/ICreateWarRoomUseCase";
import { ICreateTimelineEventUseCase } from "@/modules/timeline/domain/interfaces/usecases/ICreateTimelineEventUseCase";
import { TimelineEventType } from "@/modules/timeline/domain/enums/timelineEventType.enum";

export class CreateIncidentUseCase implements ICreateIncidentUseCase {
  constructor(
    private readonly incidentRepository: IIncidentRepository,
    private readonly createWarRoomUseCase: ICreateWarRoomUseCase,
    private readonly createTimelineEventUseCase:ICreateTimelineEventUseCase,
  ) { }

  async execute(dto: CreateIncidentDto, userId: string | undefined, organizationId: string): Promise<Incident> {

    const priority = dto.priority ?? Priority.P3;

    const status = Status.OPEN;

    const incident = new Incident({
      title: dto.title,
      description: dto.description,
      severity: dto.severity,
      priority,
      status,
      type: dto.type,

      organizationId,
      createdBy: dto.type === "MANUAL" ? userId ?? null : null,

      assignedTeamId: dto.assignedTeamId ?? null,

      monitoringProjectId: dto.monitoringProjectId,
    });

    const createdIncident = await this.incidentRepository.create(incident);

    await this.createTimelineEventUseCase.execute(
      createdIncident.id!,
      dto.type === "AUTOMATED"
        ? TimelineEventType.INCIDENT_CREATED_FROM_ALERT
        : TimelineEventType.INCIDENT_CREATED,
      dto.type === "AUTOMATED"
        ? "Incident created from alert"
        : "Incident created",
      userId ?? null,
    );

    await this.createWarRoomUseCase.execute(
      {
        incidentId: createdIncident.id!,
      },
      userId ?? null,
    );

    return createdIncident;
  }
}