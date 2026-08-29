import { ITaskRepository } from "@/modules/task-management/domain/interfaces/ITaskRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { CreateTaskUseCase } from "@/modules/task-management/application/use-cases/createTaskUseCase";
import { TaskController } from "@/modules/task-management/presentation/controllers/TaskController";
import { GetTasksByIncidentUseCase } from "@/modules/task-management/application/use-cases/getTaskByIncidentUseCase";
import { UpdateTaskStatusUseCase } from "@/modules/task-management/application/use-cases/UpdateTaskStatusUseCase";
import { AssignTaskUseCase } from "@/modules/task-management/application/use-cases/AssignTaskUseCase";
import { DeleteTaskUseCase } from "@/modules/task-management/application/use-cases/DeleteTaskUseCase";
import { UpdateTaskUseCase } from "@/modules/task-management/application/use-cases/UpdateTaskUseCase";
import { GetMyTasksUseCase } from "@/modules/task-management/application/use-cases/GetMyTasksUseCase";
import { GetTeamTasksUseCase } from "@/modules/task-management/application/use-cases/GetTeamTasksUseCase";
import { TakeTaskUseCase } from "@/modules/task-management/application/use-cases/TakeTaskUseCase";
import { IIncidentRepository } from "@/modules/incident/domain/interfaces/IIncidentRepository";
import { ITeamMemberRepository } from "@/modules/team-management/domain/interfaces/ITeamMemberRepository";
import { createTaskRoutes } from "@/modules/task-management/presentation/routes/task.routes";
import { GetTaskByIdUseCase } from "@/modules/task-management/application/use-cases/GetTaskByIdUseCase";
import { ICreateTimelineEventUseCase } from "@/modules/timeline/domain/interfaces/usecases/ICreateTimelineEventUseCase";

export function bindTask(container: Container,createTimeLineEventUseCase:ICreateTimelineEventUseCase) {

    const taskRepository = container.get<ITaskRepository>(TYPES.TaskRepository);
    const incidentRepository = container.get<IIncidentRepository>(TYPES.IncidentRepository);
    const teamMemberRepository = container.get<ITeamMemberRepository>(TYPES.TeamMemberRepository);

    const assignTaskUseCase = new AssignTaskUseCase(
        taskRepository,
        incidentRepository,
        teamMemberRepository,
        createTimeLineEventUseCase
    );

    const createTaskUseCase = new CreateTaskUseCase(
        taskRepository,
        incidentRepository,
        teamMemberRepository,
        createTimeLineEventUseCase
    );

    const deleteTaskUseCase = new DeleteTaskUseCase(
        taskRepository,
    );

    const getMyTasksUseCase = new GetMyTasksUseCase(
        taskRepository,
    );

    const getTasksByIncidentUseCase = new GetTasksByIncidentUseCase(
        taskRepository,
    );

    const getTeamTasksUseCase = new GetTeamTasksUseCase(
        taskRepository,
        teamMemberRepository,
    );

    const takeTaskUseCase = new TakeTaskUseCase(
        taskRepository,
        incidentRepository,
        teamMemberRepository,
    );

    const updateTaskStatusUseCase = new UpdateTaskStatusUseCase(
        taskRepository,
        incidentRepository,
        teamMemberRepository,
        createTimeLineEventUseCase
    );

    const updateTaskUseCase = new UpdateTaskUseCase(
        taskRepository,
        incidentRepository,
        teamMemberRepository,
        createTimeLineEventUseCase
    );

    const getTaskByIdUseCase=new GetTaskByIdUseCase(
        taskRepository
    );


    const taskController = new TaskController(
        createTaskUseCase,
        getTasksByIncidentUseCase,
        updateTaskStatusUseCase,
        assignTaskUseCase,
        deleteTaskUseCase,
        updateTaskUseCase,
        getMyTasksUseCase,
        getTeamTasksUseCase,
        takeTaskUseCase,
        getTaskByIdUseCase,
    );

    const taskRouter=createTaskRoutes(taskController);

    return {taskRouter,createTaskUseCase};

}