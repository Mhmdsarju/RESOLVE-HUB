import { AlertSource } from "../enums/alertSource.enum";
import { AlertStatus } from "../enums/alertStatus.enum";

interface AlertProps {
    id?: string;
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
    createdAt?: Date;
}

export class Alert {
    public readonly id?: string;
    public readonly organizationId: string;
    public readonly monitoringProjectId: string;
    public readonly integrationId?: string;
    public readonly alertRuleId?: string;
    public readonly createdBy?: string;
    public readonly source: AlertSource;

    public title: string;
    public message?: string;

    public status: AlertStatus;
    public readonly payload: Record<string, unknown>;

    public incidentId?: string;

    public readonly createdAt: Date;

    constructor(props: AlertProps) {
        this.id = props.id;
        this.organizationId = props.organizationId;
        this.monitoringProjectId = props.monitoringProjectId;
        this.integrationId = props.integrationId;
        this.alertRuleId = props.alertRuleId;
        this.createdBy = props.createdBy;
        this.source = props.source;

        this.title = props.title;
        this.message = props.message;

        this.status = props.status ?? AlertStatus.FIRING;
        this.payload = props.payload;

        this.incidentId = props.incidentId;

        this.createdAt = props.createdAt ?? new Date();
    }
}