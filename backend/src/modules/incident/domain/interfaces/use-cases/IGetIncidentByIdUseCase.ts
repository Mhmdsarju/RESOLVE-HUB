import { Incident } from "../../entities/incident.entity";

export interface IGetIncidentByIdUseCase {
  execute(id: string): Promise<Incident>;
}