import { ITaskRepository } from "@/modules/task-management/domain/interfaces/ITaskRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { PrismaTaskRepository } from "@/modules/task-management/infrastructure/repositories/PrismaTaskRepository";
import { ICreateTaskUseCase } from "@/modules/task-management/domain/interfaces/use-cases/ICreateTaskUseCase";
import { CreateTaskUseCase } from "@/modules/task-management/application/use-cases/createTaskUseCase";
import { TaskController } from "@/modules/task-management/presentation/controllers/TaskController";
import { IGetTasksByIncidentUseCase } from "@/modules/task-management/domain/interfaces/use-cases/IGetTasksByIncidentUseCase";
import { GetTasksByIncidentUseCase } from "@/modules/task-management/application/use-cases/getTaskByIncidentUseCase";
// import { IUpdateIncidentStatusUseCase } from "@/modules/incident/domain/interfaces/use-cases/IUpdateIncidentStatusUseCase";
import { UpdateTaskStatusUseCase } from "@/modules/task-management/application/use-cases/UpdateTaskStatusUseCase";
import { IUpdateTaskStatusUseCase } from "@/modules/task-management/domain/interfaces/use-cases/IUpdateTaskStatusUseCase";
import { IAssignTaskUseCase } from "@/modules/task-management/domain/interfaces/use-cases/IAssignTaskUseCase";
import { AssignTaskUseCase } from "@/modules/task-management/application/use-cases/AssignTaskUseCase";
import { IDeleteTaskUseCase } from "@/modules/task-management/domain/interfaces/use-cases/IDeleteTaskUseCase";
import { DeleteTaskUseCase } from "@/modules/task-management/application/use-cases/DeleteTaskUseCase";
import { IUpdateTaskUseCase } from "@/modules/task-management/domain/interfaces/use-cases/IUpdateTaskUseCase";
import { UpdateTaskUseCase } from "@/modules/task-management/application/use-cases/UpdateTaskUseCase";
import { IGetIncidentsUseCase } from "@/modules/incident/domain/interfaces/use-cases/IGetIncidentsUseCase";
import { GetIncidentsUseCase } from "@/modules/incident/application/use-cases/GetIncidentsUseCase";
import { IGetIncidentStatsUseCase } from "@/modules/incident/domain/interfaces/use-cases/IGetIncidentStatsUseCase";
import { GetIncidentStatsUseCase } from "@/modules/incident/application/use-cases/GetIncidentStatsUseCase";
import { IGetMyTasksUseCase } from "@/modules/task-management/domain/interfaces/use-cases/IGetMyTasksUseCase";
import { GetMyTasksUseCase } from "@/modules/task-management/application/use-cases/GetMyTasksUseCase";
import { IGetTeamTasksUseCase } from "@/modules/task-management/domain/interfaces/use-cases/IGetTeamTasksUseCase";
import { GetTeamTasksUseCase } from "@/modules/task-management/application/use-cases/GetTeamTasksUseCase";
import { ITakeTaskUseCase } from "@/modules/task-management/domain/interfaces/use-cases/ITakeTaskUseCase";
import { TakeTaskUseCase } from "@/modules/task-management/application/use-cases/TakeTaskUseCase";

export function bindTask(container: Container) {

    container.bind<ITaskRepository>(TYPES.TaskRepository).to(PrismaTaskRepository).inSingletonScope();
    container.bind<TaskController>(TYPES.TaskController).to(TaskController).inSingletonScope();

    container.bind<ICreateTaskUseCase>(TYPES.CreateTaskUseCase).to(CreateTaskUseCase).inSingletonScope();
    container.bind<IGetTasksByIncidentUseCase>(TYPES.GetTasksByIncidentUseCase).to(GetTasksByIncidentUseCase).inSingletonScope();
    container.bind<IUpdateTaskStatusUseCase>(TYPES.UpdateTaskStatusUseCase).to(UpdateTaskStatusUseCase)
    container.bind<IAssignTaskUseCase>(TYPES.AssignTaskUseCase).to(AssignTaskUseCase).inSingletonScope();
    container.bind<IDeleteTaskUseCase>(TYPES.DeleteTaskUseCase).to(DeleteTaskUseCase).inSingletonScope();
    container.bind<IUpdateTaskUseCase>(TYPES.UpdateTaskUseCase).to(UpdateTaskUseCase).inSingletonScope();
    container.bind<IGetIncidentsUseCase>(TYPES.GetIncidentsUseCase).to(GetIncidentsUseCase).inSingletonScope();
    container.bind<IGetIncidentStatsUseCase>(TYPES.GetIncidentStatsUseCase).to(GetIncidentStatsUseCase).inSingletonScope();

    container.bind<IGetMyTasksUseCase>(TYPES.GetMyTasksUseCase).to(GetMyTasksUseCase).inSingletonScope();
    container.bind<IGetTeamTasksUseCase>(TYPES.GetTeamTasksUseCase).to(GetTeamTasksUseCase).inSingletonScope();
    container.bind<ITakeTaskUseCase>(TYPES.TakeTaskUseCase).to(TakeTaskUseCase);
}