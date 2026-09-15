import { AlertRule as PrismaAlertRule } from "@prisma/client";

import { AlertRule } from "../../domain/entities/alertRule.entity";
import { AlertOperator } from "../../domain/enums/alertOperator.enum";
import { Priority } from "@/modules/incident/domain/enums/priority.enum";
import { Severity } from "@/modules/incident/domain/enums/severity.enum";

export class AlertRuleMapper {

    static fromDb(data: PrismaAlertRule): AlertRule {
        return new AlertRule(
            data.id,
            data.monitoringProjectId,
            data.organizationId,
            data.name,
            data.metric,
            data.operator as AlertOperator,
            data.threshold,
            data.severity as Severity,
            data.priority as Priority,
            data.autoCreateIncident,
            data.isPredefined,
            data.isActive,
            data.createdAt,
            data.updatedAt
        );
    }

    static toDb(alertRule: AlertRule) {
        return {
            id: alertRule.id,
            monitoringProjectId: alertRule.monitoringProjectId,
            organizationId: alertRule.organizationId,
            name: alertRule.name,
            metric: alertRule.metric,
            operator: alertRule.operator,
            threshold: alertRule.threshold,
            severity: alertRule.severity,
            priority: alertRule.priority,
            autoCreateIncident: alertRule.autoCreateIncident,
            isPredefined: alertRule.isPredefined,
            isActive: alertRule.isActive,
            createdAt: alertRule.createdAt,
            updatedAt: alertRule.updatedAt,
        };
    }
}