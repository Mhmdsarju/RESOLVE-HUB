import { IIntegrationRepository } from "@/modules/integration/domain/interfaces/IIntegrationRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { CreateIntegrationUseCase } from "@/modules/integration/application/use-cases/CreateIntegrationUseCase";
import { IntegrationController } from "@/modules/integration/presentation/controllers/IntegrationController";
import { GetIntegrationsUseCase } from "@/modules/integration/application/use-cases/GetIntegrationsUseCase";
import { GetIntegrationByIdUseCase } from "@/modules/integration/application/use-cases/GetIntegrationByIdUseCase";
import { UpdateIntegrationUseCase } from "@/modules/integration/application/use-cases/UpdateIntegrationUseCase";
import { DeleteIntegrationUseCase } from "@/modules/integration/application/use-cases/DeleteIntegrationUseCase";
import { createIntegrationRoutes } from "@/modules/integration/presentation/routes/integration.routes";

export function bindIntegration(container: Container) {

    const integrationRepository = container.get<IIntegrationRepository>(TYPES.IntegrationRepository);
    const createIntegrationUseCase = new CreateIntegrationUseCase(integrationRepository);
    const deleteIntegrationUseCase = new DeleteIntegrationUseCase(integrationRepository);
    const getIntegrationByIdUseCase = new GetIntegrationByIdUseCase(integrationRepository);
    const getIntegrationsUseCase = new GetIntegrationsUseCase(integrationRepository);
    const updateIntegrationUseCase = new UpdateIntegrationUseCase(integrationRepository);

    const integrationController = new IntegrationController(
        createIntegrationUseCase,
        getIntegrationsUseCase,
        getIntegrationByIdUseCase,
        updateIntegrationUseCase,
        deleteIntegrationUseCase,
    );

    const integrationRouter = createIntegrationRoutes(integrationController);

    return {
        integrationRouter
    }

}