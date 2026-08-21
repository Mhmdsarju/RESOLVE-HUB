import { IMonitoringProjectRepository } from "@/modules/monitoring/domain/interfaces/IMonitoringProjectRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { CreateMonitoringProjectUseCase } from "@/modules/monitoring/application/use-cases/CreateMonitoringProjectUseCase";
import { MonitoringProjectController } from "@/modules/monitoring/presentation/controllers/MonitoringProjectController";
import { GetMonitoringProjectsUseCase } from "@/modules/monitoring/application/use-cases/GetMonitoringProjectsUseCase";
import { GetMonitoringProjectByIdUseCase } from "@/modules/monitoring/application/use-cases/GetMonitoringProjectByIdUseCase";
import { UpdateMonitoringProjectUseCase } from "@/modules/monitoring/application/use-cases/updateMonitoringProjectUseCase";
import { DeleteMonitoringProjectUseCase } from "@/modules/monitoring/application/use-cases/deleteMonitoringProject.usecase";
import { createMonitoringProjectRoutes } from "@/modules/monitoring/presentation/routes/monitorProjects.routes";

export function bindMonitoring(container: Container) {

    const monitoringProjectRepository = container.get<IMonitoringProjectRepository>(TYPES.MonitoringProjectRepository);

    const createMonitoringProjectUseCase = new CreateMonitoringProjectUseCase(
        monitoringProjectRepository
    );

    const deleteMonitoringProjectUseCase = new DeleteMonitoringProjectUseCase(
        monitoringProjectRepository
    );

    const getMonitoringProjectByIdUseCase = new GetMonitoringProjectByIdUseCase(
        monitoringProjectRepository
    );

    const getMonitoringProjectsUseCase = new GetMonitoringProjectsUseCase(
        monitoringProjectRepository
    );

    const updateMonitoringProjectUseCase = new UpdateMonitoringProjectUseCase(
        monitoringProjectRepository
    );

    const monitoringProjectController = new MonitoringProjectController(
        createMonitoringProjectUseCase,
        getMonitoringProjectsUseCase,
        getMonitoringProjectByIdUseCase,
        updateMonitoringProjectUseCase,
        deleteMonitoringProjectUseCase,
    );

    const monitoringProjectRouter = createMonitoringProjectRoutes(monitoringProjectController);

    return {
        monitoringProjectRouter,
    }



}