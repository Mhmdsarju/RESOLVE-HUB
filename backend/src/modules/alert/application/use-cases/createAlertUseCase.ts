import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";


import { Alert } from "../../domain/entities/alert.entity";
import { IAlertRepository } from "../../domain/interfaces/IAlertRepository";
import { ICreateAlertUseCase } from "../../domain/interfaces/use-case/ICreateAlertUseCase";
import { CreateAlertDTO } from "../dto/createAlertDto";

@injectable()
export class CreateAlertUseCase implements ICreateAlertUseCase {
    constructor(
        @inject(TYPES.AlertRepository)
        private readonly alertRepository: IAlertRepository
    ) { }

    async execute(dto: CreateAlertDTO): Promise<Alert> {
        const alert = new Alert({
            id: crypto.randomUUID(),
            organizationId: dto.organizationId,
            monitoringProjectId: dto.monitoringProjectId,
            integrationId: dto.integrationId,
            createdBy: dto.createdBy,
            source: dto.source,
            title: dto.title,
            message: dto.message,
            status: dto.status,
            payload: dto.payload,
            incidentId: dto.incidentId,
        });

        return await this.alertRepository.create(alert);
    }
}