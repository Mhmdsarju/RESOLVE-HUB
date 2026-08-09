import { inject, injectable } from "inversify";
import { TYPES } from "@/config/types";

import { IIncidentRepository } from "../../domain/interfaces/IIncidentRepository";
import { IGetIncidentsUseCase } from "../../domain/interfaces/use-cases/IGetIncidentsUseCase";

import { GetIncidentsDto } from "../dto/getIncidentDto";

@injectable()
export class GetIncidentsUseCase implements IGetIncidentsUseCase {
  constructor(
    @inject(TYPES.IncidentRepository)
    private readonly incidentRepository: IIncidentRepository
  ) {}

  async execute(dto: GetIncidentsDto, organizationId: string) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 10;

    const skip = (page - 1) * limit;

    const result = await this.incidentRepository.findAllWithPagination({
      organizationId,
      skip,
      take: limit,
      filters: {
        status: dto.status,
        priority: dto.priority,
        severity: dto.severity,
        assignedTeamId: dto.assignedTeamId,
      },
    });

    return {
      ...result,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    };
  }
}