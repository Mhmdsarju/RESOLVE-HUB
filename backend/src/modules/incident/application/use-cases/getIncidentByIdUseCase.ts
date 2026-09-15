import { IGetIncidentByIdUseCase } from "../../domain/interfaces/use-cases/IGetIncidentByIdUseCase"; 
import { IIncidentRepository } from "../../domain/interfaces/IIncidentRepository";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

export class GetIncidentByIdUseCase implements IGetIncidentByIdUseCase {
  constructor(
    private readonly incidentRepository: IIncidentRepository
  ) {}

  async execute(id: string, organizationId: string) {
    const incident = await this.incidentRepository.findByIdForOrganization(
        id,
        organizationId
    );

    if (!incident) {
        throw new AppError("Incident not found",HttpStatusCode.NOT_FOUND);
    }

    return incident;
  }
}