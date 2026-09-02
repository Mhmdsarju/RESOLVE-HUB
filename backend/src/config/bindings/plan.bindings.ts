import { Container } from "inversify";

import { TYPES } from "../types";

import { IPlanRepository } from "@/modules/plan/domain/interface/IPlanRepository";

import { CreatePlanUseCase } from "@/modules/plan/application/usecase/CreatePlanUseCase"; 
import { GetPlansUseCase } from "@/modules/plan/application/usecase/GetPlansUseCase"; 
import { UpdatePlanUseCase } from "@/modules/plan/application/usecase/UpdatePlanUseCase"; 

import { PlanController } from "@/modules/plan/presentation/controllers/PlanController"; 
import { createPlanRoutes } from "@/modules/plan/presentation/routes/planRoutes"; 

export function bindPlan(container: Container) {

    const planRepository = container.get<IPlanRepository>(
        TYPES.planRepository
    );

    const createPlanUseCase = new CreatePlanUseCase(
        planRepository
    );

    const getPlansUseCase = new GetPlansUseCase(
        planRepository
    );

    const updatePlanUseCase = new UpdatePlanUseCase(
        planRepository
    );

    const planController = new PlanController(
        createPlanUseCase,
        getPlansUseCase,
        updatePlanUseCase,
    );

    const planRouter = createPlanRoutes(planController);

    return {
        planRouter,
        createPlanUseCase,
        getPlansUseCase,
        updatePlanUseCase,
    };
}