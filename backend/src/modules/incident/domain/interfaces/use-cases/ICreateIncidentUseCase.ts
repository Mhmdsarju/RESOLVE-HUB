import { CreateIncidentDto } from "@/modules/incident/application/dto/createIncidentDto";
import { Incident } from "../../entities/incident.entity";

export interface ICreateIncidentUseCase {
  execute(dto: CreateIncidentDto, userId: string|undefined, organizationId: string): Promise<Incident>;
}