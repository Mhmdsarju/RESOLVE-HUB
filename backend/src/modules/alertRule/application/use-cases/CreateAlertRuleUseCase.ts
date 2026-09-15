import { AlertRule } from "../../domain/entities/alertRule.entity";
import { IAlertRuleRepository } from "../../domain/interfaces/IAlertRuleRepository";
import { ICreateAlertRuleUseCase } from "../../domain/interfaces/use-case/ICreateAlertRuleUseCase"; 

import { CreateAlertRuleDTO } from "../dto/createAlertRuleDto";

export class CreateAlertRuleUseCase  implements ICreateAlertRuleUseCase{
  constructor(
    private readonly alertRuleRepository: IAlertRuleRepository
  ) {}

  async execute(dto: CreateAlertRuleDTO): Promise<AlertRule> {
    const alertRule = new AlertRule(
      crypto.randomUUID(),
      dto.monitoringProjectId,
      dto.organizationId,
      dto.name,
      dto.metric,
      dto.operator,
      dto.threshold,
      dto.severity,
      dto.priority,
      dto.autoCreateIncident,
      false, 
      true,  
      new Date(),
      new Date()
    );

    return await this.alertRuleRepository.create(alertRule);
  }
}