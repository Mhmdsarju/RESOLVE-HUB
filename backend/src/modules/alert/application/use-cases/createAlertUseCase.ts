import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { Alert } from "../../domain/entities/alert.entity";
import { IAlertRepository } from "../../domain/interfaces/IAlertRepository";
import { ICreateAlertUseCase } from "../../domain/interfaces/use-case/ICreateAlertUseCase";
import { CreateAlertDTO } from "../dto/createAlertDto";
import { IProcessAlertUseCase } from "../../domain/interfaces/IProcessAlertUseCase";

export class CreateAlertUseCase implements ICreateAlertUseCase {
    constructor(
        private readonly alertRepository: IAlertRepository,
        private readonly processAlertUseCase: IProcessAlertUseCase,
    ) { }

    async execute(dto: CreateAlertDTO): Promise<Alert> {

        if (!dto.organizationId?.trim()) {
            throw new AppError("Organization ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!dto.monitoringProjectId?.trim()) {
            throw new AppError("Monitoring project ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!dto.title?.trim()) {
            throw new AppError("Alert title is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (dto.source === "AUTOMATIC" && !dto.alertRuleId?.trim()) {
            throw new AppError("Alert rule ID is required for automatic alerts", HttpStatusCode.BAD_REQUEST,);
        }

        if (dto.incidentId) {
            if (dto.source === "AUTOMATIC" && dto.alertRuleId) {
                const existingAlert = await this.alertRepository.findActiveAlertByIncidentAndAlertRule(
                    dto.incidentId,
                    dto.alertRuleId,
                );

                if (existingAlert) {
                    return existingAlert;
                }
            }

            if (dto.source === "MANUAL") {
                const existingAlert = await this.alertRepository.findActiveAlertByIncidentAndTitle(
                    dto.incidentId,
                    dto.title,
                );

                if (existingAlert) {
                    return existingAlert;
                }
            }
        }

        const alert = new Alert({
            id: crypto.randomUUID(),
            organizationId: dto.organizationId,
            monitoringProjectId: dto.monitoringProjectId,
            integrationId: dto.integrationId,
            alertRuleId: dto.alertRuleId,
            createdBy: dto.createdBy,
            source: dto.source,
            title: dto.title,
            message: dto.message,
            status: dto.status,
            payload: dto.payload,
            incidentId: dto.incidentId,
        });

        const createdAlert = await this.alertRepository.create(alert);

        return await this.processAlertUseCase.execute(createdAlert,);
    }
}