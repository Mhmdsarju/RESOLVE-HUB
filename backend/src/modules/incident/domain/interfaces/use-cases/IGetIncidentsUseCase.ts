import { GetIncidentsDto } from "@/modules/incident/application/dto/getIncidentDto"; 
import { Incident } from "../../entities/incident.entity";

export interface IGetIncidentsUseCase {
  execute(dto: GetIncidentsDto, organizationId: string): Promise<{
    data: Incident[];
    total: number;
    page: number;
    limit: number;
  }>;
}