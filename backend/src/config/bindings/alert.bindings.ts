import { IAlertRepository } from "@/modules/alert/domain/interfaces/IAlertRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { AlertController } from "@/modules/alert/presentation/controllers/AlertController";
import { CreateAlertUseCase } from "@/modules/alert/application/use-cases/createAlertUseCase";
import { GetAlertsUseCase } from "@/modules/alert/application/use-cases/getAlertsUseCase";
import { GetAlertByIdUseCase } from "@/modules/alert/application/use-cases/getAlertByIdUseCase";
import { ResolveAlertUseCase } from "@/modules/alert/application/use-cases/resolveAlertUseCase";
import { ProcessAlertUseCase } from "@/modules/alert/application/use-cases/ProcessAlertUseCase";
import { IRouteAlertUseCase } from "@/modules/alertRoutingRule/domain/interfaces/use-case/IRouteAlertUseCase";
import { ICreateIncidentUseCase } from "@/modules/incident/domain/interfaces/use-cases/ICreateIncidentUseCase";
import { ICreateTaskUseCase } from "@/modules/task-management/domain/interfaces/use-cases/ICreateTaskUseCase";
import { ITeamMemberRepository } from "@/modules/team-management/domain/interfaces/ITeamMemberRepository";
import { IIntegrationRepository } from "@/modules/integration/domain/interfaces/IIntegrationRepository";
import { IAlertRuleRepository } from "@/modules/alertRule/domain/interfaces/IAlertRuleRepository";
import { createAlertRoutes } from "@/modules/alert/presentation/routes/alert.routes";

export function bindAlert(container: Container, routeAlertUseCase: IRouteAlertUseCase,
    createIncidentUseCase: ICreateIncidentUseCase, createTaskUseCase: ICreateTaskUseCase
) {

    const alertRepository = container.get<IAlertRepository>(TYPES.AlertRepository);
    const teamMemberRepository = container.get<ITeamMemberRepository>(TYPES.TeamMemberRepository);
    const integrationRepository = container.get<IIntegrationRepository>(TYPES.IntegrationRepository);
    const alertRuleRepository = container.get<IAlertRuleRepository>(TYPES.AlertRuleRepository);

    const processAlertUseCase = new ProcessAlertUseCase(
        alertRepository,
        routeAlertUseCase,
        createIncidentUseCase,
        teamMemberRepository,
        createTaskUseCase,
    );

    const createAlertUseCase = new CreateAlertUseCase(
        alertRepository,
        processAlertUseCase,
    );

    const getAlertByIdUseCase = new GetAlertByIdUseCase(
        alertRepository,
    );

    const getAlertsUseCase = new GetAlertsUseCase(
        alertRepository,
    );

    const resolveAlertUseCase = new ResolveAlertUseCase(
        alertRepository,
    );

    const alertController = new AlertController(
        createAlertUseCase,
        getAlertsUseCase,
        getAlertByIdUseCase,
        resolveAlertUseCase,
        integrationRepository,
        alertRuleRepository,
    );

    const alertRouter = createAlertRoutes(alertController);

    return {
        alertRouter
    }

}