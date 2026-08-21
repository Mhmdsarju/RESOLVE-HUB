import { IAlertRoutingRuleRepository } from "@/modules/alertRoutingRule/domain/interfaces/IAlertRoutingRuleRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { CreateAlertRoutingRuleUseCase } from "@/modules/alertRoutingRule/application/use-cases/CreateAlertRoutingRuleUseCase";
import { GetAlertRoutingRulesUseCase } from "@/modules/alertRoutingRule/application/use-cases/GetAlertRoutingRulesUseCase";
import { GetAlertRoutingRuleByIdUseCase } from "@/modules/alertRoutingRule/application/use-cases/GetAlertRoutingRuleByIdUseCase";
import { DeleteAlertRoutingRuleUseCase } from "@/modules/alertRoutingRule/application/use-cases/DeleteAlertRoutingRuleUseCase";
import { UpdateAlertRoutingRuleUseCase } from "@/modules/alertRoutingRule/application/use-cases/UpdateAlertRoutingRuleUseCase";
import { AlertRoutingRuleController } from "@/modules/alertRoutingRule/presentation/controllers/AlertRoutingRuleController";
import { RouteAlertUseCase } from "@/modules/alertRoutingRule/application/use-cases/RouteAlertUseCase";
import { createAlertRoutingRuleRoutes } from "@/modules/alertRoutingRule/presentation/routes/alertRoutingRule.routes";
// import { AlertRoutingEvaluator } from "@/modules/alertRoutingRule/domain/services/AlertRoutingEvaluator";

export function bindAlertRoutingRule(container: Container) {

    const alertRoutingRuleRepository = container.get<IAlertRoutingRuleRepository>(TYPES.AlertRoutingRuleRepository);

    const createAlertRoutingRuleUseCase = new CreateAlertRoutingRuleUseCase(
        alertRoutingRuleRepository
    );

    const deleteAlertRoutingRuleUseCase = new DeleteAlertRoutingRuleUseCase(
        alertRoutingRuleRepository
    );

    const getAlertRoutingRuleByIdUseCase = new GetAlertRoutingRuleByIdUseCase(
        alertRoutingRuleRepository
    );

    const getAlertRoutingRulesUseCase = new GetAlertRoutingRulesUseCase(
        alertRoutingRuleRepository
    );

    const routeAlertUseCase = new RouteAlertUseCase(
        alertRoutingRuleRepository
    );

    const updateAlertRoutingRuleUseCase = new UpdateAlertRoutingRuleUseCase(
        alertRoutingRuleRepository
    );

    const alertRoutingRuleController = new AlertRoutingRuleController(
        createAlertRoutingRuleUseCase,
        getAlertRoutingRulesUseCase,
        getAlertRoutingRuleByIdUseCase,
        updateAlertRoutingRuleUseCase,
        deleteAlertRoutingRuleUseCase,
    );


    const alertRoutingRuleRouter = createAlertRoutingRuleRoutes(
        alertRoutingRuleController
    );
    
    return {
        alertRoutingRuleRouter,
        routeAlertUseCase,
    };

}