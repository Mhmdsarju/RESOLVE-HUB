import { inject, injectable } from "inversify";
import { TYPES } from "@/config/types";

import { IGetIncidentByIdUseCase } from "../../domain/interfaces/use-cases/IGetIncidentByIdUseCase"; 
import { IIncidentRepository } from "../../domain/interfaces/IIncidentRepository";

@injectable()
export class GetIncidentByIdUseCase implements IGetIncidentByIdUseCase {
  constructor(
    @inject(TYPES.IncidentRepository)
    private readonly incidentRepository: IIncidentRepository
  ) {}

  async execute(id: string) {
    const incident = await this.incidentRepository.findById(id);

    if (!incident) {
      throw new Error("Incident not found");
    }

    return incident;
  }
}