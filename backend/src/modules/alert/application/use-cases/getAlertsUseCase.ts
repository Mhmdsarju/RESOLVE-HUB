import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { IAlertRepository } from "../../domain/interfaces/IAlertRepository";
import { IGetAlertsUseCase } from "../../domain/interfaces/use-case/IGetAlertsUseCase";
import { Alert } from "../../domain/entities/alert.entity";
import { GetAlertsDTO } from "../dto/getAlertsDto";
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

@injectable()
export class GetAlertsUseCase implements IGetAlertsUseCase {
    constructor(
        @inject(TYPES.AlertRepository)
        private readonly alertRepository: IAlertRepository
    ) { }

    async execute(monitoringProjectId: string, organizationId: string, page: number, limit: number): Promise<PaginationResult<Alert>> {

        const dto: GetAlertsDTO = {
            monitoringProjectId,
            organizationId,
            page,
            limit,
        };

        return await this.alertRepository.findAlerts(dto);
    }
}