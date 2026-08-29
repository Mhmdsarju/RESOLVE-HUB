import { IAssignTeamUseCase } from "../../domain/interfaces/use-cases/IAssignTeamUseCase"; 
import { IIncidentRepository } from "../../domain/interfaces/IIncidentRepository";
import { AssignTeamDto } from "../dto/assignTeamDto";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { ICreateTimelineEventUseCase } from "@/modules/timeline/domain/interfaces/usecases/ICreateTimelineEventUseCase";
import { TimelineEventType } from "@/modules/timeline/domain/enums/timelineEventType.enum";

export class AssignTeamUseCase implements IAssignTeamUseCase {
  constructor(
    private readonly incidentRepository: IIncidentRepository,
    private readonly createTimelineEventUseCase: ICreateTimelineEventUseCase
  ) {}

  async execute(incidentId: string, dto: AssignTeamDto,userId?: string | null) {
    const incident = await this.incidentRepository.findById(incidentId);

    if (!incident) {
      throw new AppError("Incident not found",HttpStatusCode.NOT_FOUND);
    }

    const updated = await this.incidentRepository.update(incidentId, {
      assignedTeamId: dto.teamId,
    });

    await this.createTimelineEventUseCase.execute(
      incidentId,
      TimelineEventType.INCIDENT_TEAM_ASSIGNED,
      `Incident assigned to team ${dto.teamId}`,
      userId ?? null,
    );


    return updated;
  }
}