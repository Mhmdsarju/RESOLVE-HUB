import { Prisma } from "@prisma/client";

import {
  AlertRoutingRule,
  AlertRoutingCondition,
} from "../../domain/entities/alertRoutingRule.entity";

import { AlertRoutingRule as PrismaAlertRoutingRule } from "@prisma/client";

export class AlertRoutingRuleMapper {

  static fromDB(
    data: PrismaAlertRoutingRule,
  ): AlertRoutingRule {
    return new AlertRoutingRule({
      id: data.id,
      organizationId: data.organizationId,
      monitoringProjectId: data.monitoringProjectId,
      teamId: data.teamId,
      createdBy: data.createdBy,
      name: data.name,
      conditions: data.conditions as AlertRoutingCondition,
      priority: data.priority,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toDB(
    entity: AlertRoutingRule,
  ) {
    return {
      organizationId: entity.organizationId,
      monitoringProjectId: entity.monitoringProjectId,
      teamId: entity.teamId,
      createdBy: entity.createdBy,
      name: entity.name,
      conditions: entity.conditions as Prisma.InputJsonValue,
      priority: entity.priority,
      isActive: entity.isActive,
    };
  }
}