import { Incident } from "../../entities/incident.entity";
import { UpdateIncidentStatusDto } from "@/modules/incident/application/dto/updateIncidentStatusDto";

export interface IUpdateIncidentStatusUseCase {
  execute(id: string, dto: UpdateIncidentStatusDto, userId?: string | null): Promise<Incident>;
}