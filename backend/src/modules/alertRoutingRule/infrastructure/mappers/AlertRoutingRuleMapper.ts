import {  AlertRoutingRule,} from "../../domain/entities/alertRoutingRule.entity";

import {  AlertRoutingRule as PrismaAlertRoutingRule,} from "@prisma/client";

export class AlertRoutingRuleMapper {
  static fromDB(    data: PrismaAlertRoutingRule,  ): AlertRoutingRule {
    return new AlertRoutingRule({
      id: data.id,

      organizationId: data.organizationId,
      monitoringProjectId: data.monitoringProjectId,
      alertRuleId: data.alertRuleId,
      teamId: data.teamId,
      createdBy: data.createdBy,

      name: data.name,
      priority: data.priority,
      isActive: data.isActive,

      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toDB(    entity: AlertRoutingRule,  ) {
    return {
      organizationId: entity.organizationId,
      monitoringProjectId: entity.monitoringProjectId,
      alertRuleId: entity.alertRuleId,
      teamId: entity.teamId,
      createdBy: entity.createdBy,

      name: entity.name,
      priority: entity.priority,
      isActive: entity.isActive,
    };
  }
}