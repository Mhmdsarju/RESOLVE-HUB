import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { Alert } from "../../domain/entities/alert.entity";
import { IAlertRepository } from "../../domain/interfaces/IAlertRepository";
import { IGetAlertByIdUseCase } from "../../domain/interfaces/use-case/IGetAlertByIdUseCase";

export class GetAlertByIdUseCase implements IGetAlertByIdUseCase {
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

        return alert;
    }
}