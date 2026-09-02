import { Container } from "inversify";
import { TYPES } from "../types";

import { ISubscriptionRepository } from "@/modules/subscription/domain/interface/ISubscriptionRepository";
import { IPlanRepository } from "@/modules/plan/domain/interface/IPlanRepository";

import { CreateFreeSubscriptionUseCase } from "@/modules/subscription/application/use-cases/CreateFreeSubscriptionUseCase";
import { GetSubscriptionUseCase } from "@/modules/subscription/application/use-cases/GetSubscriptionUseCase";
import { UpgradeSubscriptionUseCase } from "@/modules/subscription/application/use-cases/UpgradeSubscriptionUseCase";
import { CheckSubscriptionAccessUseCase } from "@/modules/subscription/application/use-cases/CheckSubscriptionAccessUseCase";
import { ProcessSubscriptionExpiryUseCase } from "@/modules/subscription/application/use-cases/ProcessSubscriptionExpiryUseCase";
import { SendSubscriptionReminderUseCase } from "@/modules/subscription/application/use-cases/SendSubscriptionReminderUseCase";

import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";
import { KafkaManager } from "@/infrastructure/kafka/kafka.manager";

import { SubscriptionController } from "@/modules/subscription/presentation/controllers/SubscriptionController"; 
import { createSubscriptionRoutes } from "@/modules/subscription/presentation/routes/subscription.routes";
import { IOrganizationRepository } from "@/modules/organization/domain/repositories/IOrganizationRepository";

export function bindSubscription(
    container: Container,
    kafkaManager: KafkaManager,
) {

    const subscriptionRepository = container.get<ISubscriptionRepository>(TYPES.subscriptionRepository);
    const planRepository = container.get<IPlanRepository>(TYPES.planRepository);
    const userRepository = container.get<IUserRepository>(TYPES.UserRepository);
    const organizationRepository=container.get<IOrganizationRepository>(TYPES.OrganizationRepository);

    const createFreeSubscriptionUseCase = new CreateFreeSubscriptionUseCase(
        subscriptionRepository,
        planRepository,
    );

    const getSubscriptionUseCase = new GetSubscriptionUseCase(
        subscriptionRepository,
    );

    const upgradeSubscriptionUseCase = new UpgradeSubscriptionUseCase(
        subscriptionRepository,
        planRepository,
    );

    const checkSubscriptionAccessUseCase = new CheckSubscriptionAccessUseCase(
        subscriptionRepository,
        planRepository,
    );

    const processSubscriptionExpiryUseCase = new ProcessSubscriptionExpiryUseCase(
        subscriptionRepository,
    );

    const sendSubscriptionReminderUseCase = new SendSubscriptionReminderUseCase(
        subscriptionRepository,
        userRepository,
        organizationRepository,
        kafkaManager.producer,
    );

    const subscriptionController = new SubscriptionController(
        createFreeSubscriptionUseCase,
        getSubscriptionUseCase,
        upgradeSubscriptionUseCase,
        checkSubscriptionAccessUseCase,
    );

    const subscriptionRouter = createSubscriptionRoutes(subscriptionController);

    return {
        createFreeSubscriptionUseCase,
        getSubscriptionUseCase,
        upgradeSubscriptionUseCase,
        checkSubscriptionAccessUseCase,
        processSubscriptionExpiryUseCase,
        sendSubscriptionReminderUseCase,
        subscriptionController,
        subscriptionRouter,
    };
}