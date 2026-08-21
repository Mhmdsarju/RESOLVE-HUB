export interface ProcessPrometheusAlertDTO {
    integrationId: string;
    alertName: string;
    status: string;
    labels: Record<string, string>;
    annotations: Record<string, string>;
    startsAt?: string;
    endsAt?: string;
    generatorURL?: string;
}