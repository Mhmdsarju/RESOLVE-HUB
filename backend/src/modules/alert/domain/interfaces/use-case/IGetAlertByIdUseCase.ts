import { Alert } from "../../entities/alert.entity";

export interface IGetAlertByIdUseCase {
    execute(id: string, organizationId: string): Promise<Alert>;
}