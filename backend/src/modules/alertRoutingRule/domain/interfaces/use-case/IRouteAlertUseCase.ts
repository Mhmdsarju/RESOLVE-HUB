import { Alert } from "@/modules/alert/domain/entities/alert.entity"; 

export interface IRouteAlertUseCase {
  execute(alert: Alert): Promise<string | null>;
}