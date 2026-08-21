import { Alert } from "../../entities/alert.entity";

export interface IResolveAlertUseCase {
    execute(id: string, organizationId: string): Promise<Alert>;
}