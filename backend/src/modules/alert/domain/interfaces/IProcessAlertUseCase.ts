import { Alert } from "../entities/alert.entity";

export interface IProcessAlertUseCase {
    execute(alert: Alert): Promise<Alert>;
}