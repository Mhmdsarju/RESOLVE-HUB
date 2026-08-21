import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { AppError } from "@/shared/errors/AppError";
import { IIncidentRepository } from "../../domain/interfaces/IIncidentRepository";
import { IGetIncidentStatsUseCase } from "../../domain/interfaces/use-cases/IGetIncidentStatsUseCase";


export class GetIncidentStatsUseCase  implements IGetIncidentStatsUseCase
{
  constructor(
    private readonly incidentRepository: IIncidentRepository
  ) {}

  async execute(organizationId: string) {

    if (!organizationId) {
      throw new AppError("Organization ID required", HttpStatusCode.BAD_REQUEST);
    }

    return await this.incidentRepository.getStats(organizationId);
  }
}