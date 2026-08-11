import { IAlertRuleRepository } from "@/modules/alertRule/domain/interfaces/IAlertRuleRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { PrismaAlertRuleRepository } from "@/modules/alertRule/infrastructure/repositories/PrismaAlertRuleRepository";
import { ICreateAlertRuleUseCase } from "@/modules/alertRule/domain/interfaces/use-case/ICreateAlertRuleUseCase";
import { CreateAlertRuleUseCase } from "@/modules/alertRule/application/use-cases/CreateAlertRuleUseCase";
import { IGetAlertRuleByIdUseCase } from "@/modules/alertRule/domain/interfaces/use-case/IGetAlertRuleByIdUseCase";
import { GetAlertRuleByIdUseCase } from "@/modules/alertRule/application/use-cases/GetAlertRuleByIdUseCase";
import { IUpdateAlertRuleUseCase } from "@/modules/alertRule/domain/interfaces/use-case/IUpdateAlertRuleUseCase";
import { UpdateAlertRuleUseCase } from "@/modules/alertRule/application/use-cases/UpdateAlertRuleUseCase";
import { DeleteAlertRuleUseCase } from "@/modules/alertRule/application/use-cases/DeleteAlertRuleUseCase";
import { GetDefaultAlertRulesUseCase } from "@/modules/alertRule/application/use-cases/GetDefaultAlertRulesUseCase";
import { IApplyDefaultAlertRuleUseCase } from "@/modules/alertRule/domain/interfaces/use-case/IApplyDefaultAlertRuleUseCase";
import { ApplyDefaultAlertRuleUseCase } from "@/modules/alertRule/application/use-cases/ApplyDefaultAlertRuleUseCase";
import { IGetDefaultAlertRulesUseCase } from "@/modules/alertRule/domain/interfaces/use-case/IGetDefaultAlertRulesUseCase";
import { IDeleteAlertRuleUseCase } from "@/modules/alertRule/domain/interfaces/use-case/IDeleteAlertRuleUseCase";
import { IGetAlertRulesUseCase } from "@/modules/alertRule/domain/interfaces/use-case/IGetAlertRulesUseCase";
import { GetAlertRulesUseCase } from "@/modules/alertRule/application/use-cases/GetAlertRulesUseCase";
import { AlertRuleController } from "@/modules/alertRule/presentation/controllers/AlertRuleController";

export function bindAlertRule(container:Container){
    container.bind<IAlertRuleRepository>(TYPES.AlertRuleRepository).to(PrismaAlertRuleRepository).inSingletonScope();
    container.bind<AlertRuleController>(TYPES.AlertRuleController).to(AlertRuleController).inSingletonScope();

    container.bind<ICreateAlertRuleUseCase>(TYPES.CreateAlertRuleUseCase).to(CreateAlertRuleUseCase);
    container.bind<IGetAlertRuleByIdUseCase>(TYPES.GetAlertRuleByIdUseCase).to(GetAlertRuleByIdUseCase);
    container.bind<IUpdateAlertRuleUseCase>(TYPES.UpdateAlertRuleUseCase).to(UpdateAlertRuleUseCase);
    container.bind<IDeleteAlertRuleUseCase>(TYPES.DeleteAlertRuleUseCase).to(DeleteAlertRuleUseCase).inSingletonScope();
    container.bind<IGetDefaultAlertRulesUseCase>(TYPES.GetDefaultAlertRulesUseCase).to(GetDefaultAlertRulesUseCase).inSingletonScope();
    container.bind<IApplyDefaultAlertRuleUseCase>(TYPES.ApplyDefaultAlertRuleUseCase).to(ApplyDefaultAlertRuleUseCase).inSingletonScope();
    container.bind<IGetAlertRulesUseCase>(TYPES.GetAlertRulesUseCase).to(GetAlertRulesUseCase);
}