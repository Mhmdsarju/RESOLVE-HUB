import { IAssignTeamUseCase } from "../../domain/interfaces/use-cases/IAssignTeamUseCase"; 
import { IIncidentRepository } from "../../domain/interfaces/IIncidentRepository";
import { AssignTeamDto } from "../dto/assignTeamDto";

export class AssignTeamUseCase implements IAssignTeamUseCase {
  constructor(
    private readonly incidentRepository: IIncidentRepository
  ) {}

  async execute(incidentId: string, dto: AssignTeamDto) {
    const incident = await this.incidentRepository.findById(incidentId);

    if (!incident) {
      throw new Error("Incident not found");
    }

    const updated = await this.incidentRepository.update(incidentId, {
      assignedTeamId: dto.teamId,
    });

    return updated;
  }
}