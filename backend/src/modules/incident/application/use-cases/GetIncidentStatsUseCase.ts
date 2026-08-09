import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { AppError } from "@/shared/errors/AppError";
import { IIncidentRepository } from "../../domain/interfaces/IIncidentRepository";
import { IGetIncidentStatsUseCase } from "../../domain/interfaces/use-cases/IGetIncidentStatsUseCase";
import { inject, injectable } from "inversify";
import { TYPES } from "@/config/types";

@injectable()
export class GetIncidentStatsUseCase  implements IGetIncidentStatsUseCase
{
  constructor(
    @inject(TYPES.IncidentRepository)
    private readonly incidentRepository: IIncidentRepository
  ) {}

  async execute(organizationId: string) {

    if (!organizationId) {
      throw new AppError("Organization ID required", HttpStatusCode.BAD_REQUEST);
    }

    return await this.incidentRepository.getStats(organizationId);
  }
}