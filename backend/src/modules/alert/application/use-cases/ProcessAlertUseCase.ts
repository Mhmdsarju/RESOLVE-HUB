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

import { ITeamMemberRepository } from "@/modules/team-management/domain/interfaces/ITeamMemberRepository"; 

import { ICreateTaskUseCase } from "@/modules/task-management/domain/interfaces/use-cases/ICreateTaskUseCase"; 
import { TaskType } from "@/modules/task-management/domain/enums/taskType.enum"; 
import { TaskPriority } from "@/modules/task-management/domain/enums/taskPriority.enum";

@injectable()
export class ProcessAlertUseCase implements IProcessAlertUseCase {
    constructor(
        @inject(TYPES.AlertRepository)
        private readonly alertRepository: IAlertRepository,

        @inject(TYPES.RouteAlertUseCase)
        private readonly routeAlertUseCase: IRouteAlertUseCase,

        @inject(TYPES.CreateIncidentUseCase)
        private readonly createIncidentUseCase: ICreateIncidentUseCase,

        @inject(TYPES.TeamMemberRepository)
        private readonly teamMemberRepository: ITeamMemberRepository,

        @inject(TYPES.CreateTaskUseCase)
        private readonly createTaskUseCase: ICreateTaskUseCase,
    ) { }

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

        const severity = this.getSeverity(labels.severity);
        const priority = this.getPriority(labels.priority);

        const incidentDto: CreateIncidentDto = {
            title: alert.title,
            description: alert.message,
            severity,
            priority,
            assignedTeamId: teamId,
            type: IncidentType.AUTOMATED,
        };

        const incident = await this.createIncidentUseCase.execute(
            incidentDto,
            undefined,
            alert.organizationId,
        );

        const teamLead =
            await this.teamMemberRepository.findTeamLead(teamId);

        if (teamLead) {
            await this.createTaskUseCase.execute({
                title: `Investigate ${alert.title}`,
                description:
                    alert.message ??
                    `Investigate the incident created from alert "${alert.title}".`,
                incidentId: incident.id!,
                assignedTo: teamLead.userId,
                type: TaskType.AUTOMATIC,
                priority: this.getTaskPriority(priority),
            });
        }

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

    private getTaskPriority(
        priority: Priority,
    ): TaskPriority {
        switch (priority) {
            case Priority.P1:
            case Priority.P2:
                return TaskPriority.HIGH;

            case Priority.P3:
                return TaskPriority.MEDIUM;

            case Priority.P4:
                return TaskPriority.LOW;

            default:
                return TaskPriority.MEDIUM;
        }
    }
}