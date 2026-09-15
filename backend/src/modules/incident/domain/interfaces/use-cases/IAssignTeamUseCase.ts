import { Incident } from "../../entities/incident.entity";
import { AssignTeamDto } from "@/modules/incident/application/dto/assignTeamDto";

export interface IAssignTeamUseCase {
  execute(incidentId: string, dto: AssignTeamDto, userId?: string | null): Promise<Incident>;
}