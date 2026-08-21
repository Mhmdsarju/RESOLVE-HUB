import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { Alert } from "../../domain/entities/alert.entity";
import { AlertStatus } from "../../domain/enums/alertStatus.enum";
import { IAlertRepository } from "../../domain/interfaces/IAlertRepository";
import { IResolveAlertUseCase } from "../../domain/interfaces/use-case/IResolveAlertUseCase";

export class ResolveAlertUseCase implements IResolveAlertUseCase {
    constructor(
        private readonly alertRepository: IAlertRepository
    ) { }

    async execute(id: string, organizationId: string): Promise<Alert> {
        const alert = await this.alertRepository.findById(id);

        if (!alert) {
            throw new AppError("Alert not found", HttpStatusCode.NOT_FOUND);
        }

        if (alert.organizationId !== organizationId) {
            throw new AppError("Alert not found", HttpStatusCode.NOT_FOUND);
        }

        if (alert.status === AlertStatus.RESOLVED) {
            throw new AppError("Alert is already resolved", HttpStatusCode.BAD_REQUEST);
        }

        return await this.alertRepository.update(id, {
            status: AlertStatus.RESOLVED,
        });
    }
}