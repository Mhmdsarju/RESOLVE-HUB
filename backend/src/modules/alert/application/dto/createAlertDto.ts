import { AlertSource } from "../../domain/enums/alertSource.enum";
import { AlertStatus } from "../../domain/enums/alertStatus.enum";

export interface CreateAlertDTO {
    organizationId: string;
    monitoringProjectId: string;
    integrationId?: string;
    alertRuleId?: string;
    createdBy?: string;
    source: AlertSource;
    title: string;
    message?: string;
    status?: AlertStatus;
    payload: Record<string, unknown>;
    incidentId?: string;
}