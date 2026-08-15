import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { Alert } from "../../domain/entities/alert.entity";
import { AlertSource } from "../../domain/enums/alertSource.enum";

import { IAlertRepository } from "../../domain/interfaces/IAlertRepository";
import { IProcessAlertUseCase } from "../../domain/interfaces/IProcessAlertUseCase";

import { IRouteAlertUseCase } from "@/modules/alertRoutingRule/domain/interfaces/use-case/IRouteAlertUseCase";
import { ICreateIncidentUseCase } from "@/modules/incident/domain/interfaces/use-cases/ICreateIncidentUseCase";

import { CreateIncidentDto } from "@/modules/incident/application/dto/createIncidentDto";
import { IncidentType } from "@/modules/incident/domain/enums/incidentType.enum";
import { Severity } from "@/modules/incident/domain/enums/severity.enum";
import { Priority } from "@/modules/incident/domain/enums/priority.enum";

@injectable()
export class ProcessAlertUseCase implements IProcessAlertUseCase {
    constructor(
        @inject(TYPES.AlertRepository)
        private readonly alertRepository: IAlertRepository,

        @inject(TYPES.RouteAlertUseCase)
        private readonly routeAlertUseCase: IRouteAlertUseCase,

        @inject(TYPES.CreateIncidentUseCase)
        private readonly createIncidentUseCase: ICreateIncidentUseCase,
    ) {}

    async execute(alert: Alert): Promise<Alert> {
        if (alert.source !== AlertSource.AUTOMATIC) {
            return alert;
        }

        const teamId = await this.routeAlertUseCase.execute(alert);

        if (!teamId) {
            return alert;
        }

        const labels =
            typeof alert.payload.labels === "object" &&
            alert.payload.labels !== null
                ? (alert.payload.labels as Record<string, unknown>)
                : {};

        const incidentDto: CreateIncidentDto = {
            title: alert.title,
            description: alert.message,
            severity: this.getSeverity(labels.severity),
            priority: this.getPriority(labels.priority),
            assignedTeamId: teamId,
            type: IncidentType.AUTOMATED,
        };

        const incident = await this.createIncidentUseCase.execute(
            incidentDto,
            undefined,
            alert.organizationId,
        );

        return await this.alertRepository.update(
            alert.id!,
            {
                incidentId: incident.id,
            },
        );
    }

    private getSeverity(value: unknown): Severity {
        if (
            value === Severity.LOW ||
            value === Severity.MEDIUM ||
            value === Severity.HIGH ||
            value === Severity.CRITICAL
        ) {
            return value;
        }

        return Severity.MEDIUM;
    }

    private getPriority(value: unknown): Priority {
        if (
            value === Priority.P1 ||
            value === Priority.P2 ||
            value === Priority.P3 ||
            value === Priority.P4
        ) {
            return value;
        }

        return Priority.P3;
    }
}