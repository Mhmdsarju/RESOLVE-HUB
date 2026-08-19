import { IAlertRoutingRuleRepository } from "@/modules/alertRoutingRule/domain/interfaces/IAlertRoutingRuleRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { PrismaAlertRoutingRuleRepository } from "@/modules/alertRoutingRule/infrastructure/repositories/PrismaAlertRoutingRuleRepository";
import { ICreateAlertRoutingRuleUseCase } from "@/modules/alertRoutingRule/domain/interfaces/use-case/ICreateAlertRoutingRuleUseCase";
import { CreateAlertRoutingRuleUseCase } from "@/modules/alertRoutingRule/application/use-cases/CreateAlertRoutingRuleUseCase";
import { IGetAlertRoutingRulesUseCase } from "@/modules/alertRoutingRule/domain/interfaces/use-case/IGetAlertRoutingRulesUseCase";
import { GetAlertRoutingRulesUseCase } from "@/modules/alertRoutingRule/application/use-cases/GetAlertRoutingRulesUseCase";
import { IGetAlertRoutingRuleByIdUseCase } from "@/modules/alertRoutingRule/domain/interfaces/use-case/IGetAlertRoutingRuleByIdUseCase";
import { GetAlertRoutingRuleByIdUseCase } from "@/modules/alertRoutingRule/application/use-cases/GetAlertRoutingRuleByIdUseCase";
import { IDeleteAlertRoutingRuleUseCase } from "@/modules/alertRoutingRule/domain/interfaces/use-case/IDeleteAlertRoutingRuleUseCase";
import { DeleteAlertRoutingRuleUseCase } from "@/modules/alertRoutingRule/application/use-cases/DeleteAlertRoutingRuleUseCase";
import { IUpdateAlertRoutingRuleUseCase } from "@/modules/alertRoutingRule/domain/interfaces/use-case/IUpdateAlertRoutingRuleUseCase";
import { UpdateAlertRoutingRuleUseCase } from "@/modules/alertRoutingRule/application/use-cases/UpdateAlertRoutingRuleUseCase";
import { AlertRoutingRuleController } from "@/modules/alertRoutingRule/presentation/controllers/AlertRoutingRuleController";
import { RouteAlertUseCase } from "@/modules/alertRoutingRule/application/use-cases/RouteAlertUseCase";
// import { AlertRoutingEvaluator } from "@/modules/alertRoutingRule/domain/services/AlertRoutingEvaluator";

export function bindAlertRoutingRule(container:Container){
    container.bind<IAlertRoutingRuleRepository>(TYPES.AlertRoutingRuleRepository).to(PrismaAlertRoutingRuleRepository).inSingletonScope();
    container.bind<AlertRoutingRuleController>(TYPES.AlertRoutingRuleController).to(AlertRoutingRuleController).inSingletonScope();

    container.bind<ICreateAlertRoutingRuleUseCase>(TYPES.CreateAlertRoutingRuleUseCase).to(CreateAlertRoutingRuleUseCase);
    container.bind<IGetAlertRoutingRulesUseCase>(TYPES.GetAlertRoutingRulesUseCase).to(GetAlertRoutingRulesUseCase);
    container.bind<IGetAlertRoutingRuleByIdUseCase>(TYPES.GetAlertRoutingRuleByIdUseCase).to(GetAlertRoutingRuleByIdUseCase);
    container.bind<IDeleteAlertRoutingRuleUseCase>(TYPES.DeleteAlertRoutingRuleUseCase).to(DeleteAlertRoutingRuleUseCase);
    container.bind<IUpdateAlertRoutingRuleUseCase>(TYPES.UpdateAlertRoutingRuleUseCase).to(UpdateAlertRoutingRuleUseCase);
    container.bind(TYPES.RouteAlertUseCase).to(RouteAlertUseCase);
    // container.bind(AlertRoutingEvaluator).toSelf().inSingletonScope();
    // container.bind<AlertRoutingEvaluator>(TYPES.AlertRoutingEvaluator).to(AlertRoutingEvaluator).inSingletonScope();
}