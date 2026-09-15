import { ICreateIncidentUseCase } from "../../domain/interfaces/use-cases/ICreateIncidentUseCase";
import { IIncidentRepository } from "../../domain/interfaces/IIncidentRepository";
import { CreateIncidentDto } from "../dto/createIncidentDto";
import { Incident } from "../../domain/entities/incident.entity";
import { Status } from "../../domain/enums/status.enum";
import { Priority } from "../../domain/enums/priority.enum";
import { ICreateWarRoomUseCase } from "@/modules/war-room/domain/interface/usecase/ICreateWarRoomUseCase";
import { ICreateTimelineEventUseCase } from "@/modules/timeline/domain/interfaces/usecases/ICreateTimelineEventUseCase";
import { TimelineEventType } from "@/modules/timeline/domain/enums/timelineEventType.enum";
import { IEventPublisher } from "@/modules/organization/domain/interfaces/IEventPublisher";
import { KafkaTopics } from "@/shared/constant/kafka.topics";
import { IOrganizationRepository } from "@/modules/organization/domain/repositories/IOrganizationRepository";
import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";
import { Severity } from "../../domain/enums/severity.enum";

export class CreateIncidentUseCase implements ICreateIncidentUseCase {
  constructor(
    private readonly incidentRepository: IIncidentRepository,
    private readonly createWarRoomUseCase: ICreateWarRoomUseCase,
    private readonly createTimelineEventUseCase: ICreateTimelineEventUseCase,
    private readonly userRepository: IUserRepository,
    private readonly organizationRepository: IOrganizationRepository,
    private readonly eventPublisher: IEventPublisher,
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

    const admin = await this.userRepository.findOrganizationAdminByOrganizationId(
      organizationId,
    );

    const organization = await this.organizationRepository.findById(
      organizationId,
    );

    if (admin && organization &&
      (createdIncident.severity === Severity.CRITICAL || createdIncident.severity === Severity.HIGH)
    ) {
      await this.eventPublisher.publish(
        KafkaTopics.EMAIL_EVENTS,
        {
          event: "INCIDENT_CREATED",
          email: admin.email,
          organizationName: organization.name,
          incidentTitle: createdIncident.title,
          incidentDescription: createdIncident.description,
        },
      );
    }

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