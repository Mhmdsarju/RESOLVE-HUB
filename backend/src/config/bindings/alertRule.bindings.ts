import { IAlertRuleRepository } from "@/modules/alertRule/domain/interfaces/IAlertRuleRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { CreateAlertRuleUseCase } from "@/modules/alertRule/application/use-cases/CreateAlertRuleUseCase";
import { GetAlertRuleByIdUseCase } from "@/modules/alertRule/application/use-cases/GetAlertRuleByIdUseCase";
import { UpdateAlertRuleUseCase } from "@/modules/alertRule/application/use-cases/UpdateAlertRuleUseCase";
import { DeleteAlertRuleUseCase } from "@/modules/alertRule/application/use-cases/DeleteAlertRuleUseCase";
import { GetDefaultAlertRulesUseCase } from "@/modules/alertRule/application/use-cases/GetDefaultAlertRulesUseCase";
import { ApplyDefaultAlertRuleUseCase } from "@/modules/alertRule/application/use-cases/ApplyDefaultAlertRuleUseCase";
import { GetAlertRulesUseCase } from "@/modules/alertRule/application/use-cases/GetAlertRulesUseCase";
import { AlertRuleController } from "@/modules/alertRule/presentation/controllers/AlertRuleController";
import { createAlertRuleRoutes } from "@/modules/alertRule/presentation/routes/alertRules.routes";

export function bindAlertRule(container: Container) {

    const alertRuleRepository = container.get<IAlertRuleRepository>(TYPES.AlertRuleRepository);
    const applyDefaultAlertRuleUseCase = new ApplyDefaultAlertRuleUseCase(
        alertRuleRepository
    );

    const createAlertRuleUseCase = new CreateAlertRuleUseCase(
        alertRuleRepository
    );

    const deleteAlertRuleUseCase = new DeleteAlertRuleUseCase(
        alertRuleRepository
    );

    const getAlertRuleByIdUseCase = new GetAlertRuleByIdUseCase(
        alertRuleRepository
    );

    const getAlertRulesUseCase = new GetAlertRulesUseCase(
        alertRuleRepository
    );

    const getDefaultAlertRulesUseCase = new GetDefaultAlertRulesUseCase();

    const updateAlertRuleUseCase = new UpdateAlertRuleUseCase(
        alertRuleRepository
    );

    const alertRuleController = new AlertRuleController(
        createAlertRuleUseCase,
        getAlertRulesUseCase,
        getAlertRuleByIdUseCase,
        updateAlertRuleUseCase,
        deleteAlertRuleUseCase,
        getDefaultAlertRulesUseCase,
        applyDefaultAlertRuleUseCase,
    );

    const alertRuleRouter = createAlertRuleRoutes(
        alertRuleController
    );

    return {
        alertRuleRouter,
    }



}