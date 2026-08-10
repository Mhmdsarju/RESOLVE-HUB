import { inject, injectable } from "inversify";
import { TYPES } from "@/config/types";

import { IMonitoringProjectRepository } from "../../domain/interfaces/IMonitoringProjectRepository";
import { IGetMonitoringProjectsUseCase } from "../../domain/interfaces/use-cases/IGetMonitoringProjectsUseCase";
import { GetMonitoringProjectsDTO } from "../dto/GetMonitoringProjectsDTO"; 

@injectable()
export class GetMonitoringProjectsUseCase  implements IGetMonitoringProjectsUseCase{
  constructor(
    @inject(TYPES.MonitoringProjectRepository)
    private repo: IMonitoringProjectRepository
  ) {}

  async execute(dto: GetMonitoringProjectsDTO) {
    const { organizationId, page, limit } = dto;

    const skip = (page - 1) * limit;

    return await this.repo.findAllByOrganizationPaginated(
      organizationId,
      skip,
      limit
    );
  }
}