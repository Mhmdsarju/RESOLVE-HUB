import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository"; 

import { AlertRoutingRule } from "../entities/alertRoutingRule.entity";

export interface IAlertRoutingRuleRepository
  extends IBaseRepository<AlertRoutingRule> {

  findByMonitoringProject(
    monitoringProjectId: string
  ): Promise<AlertRoutingRule[]>;

}