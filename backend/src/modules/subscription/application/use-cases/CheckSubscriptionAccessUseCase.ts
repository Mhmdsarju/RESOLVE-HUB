import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { ISubscriptionRepository } from "../../domain/interface/ISubscriptionRepository";
import { IPlanRepository } from "@/modules/plan/domain/interface/IPlanRepository";
import { ICheckSubscriptionAccessUseCase } from "../../domain/interface/use-cases/ICheckSubscriptionAccessUseCase";
import { PlanName } from "@/modules/plan/domain/enums/planName.enum";

export class CheckSubscriptionAccessUseCase implements ICheckSubscriptionAccessUseCase {

    constructor(
        private readonly subscriptionRepository: ISubscriptionRepository,
        private readonly planRepository: IPlanRepository,
    ) { }

    async execute(organizationId: string): Promise<{
        hasAccess: boolean;
        isPremium: boolean;
        maxProjects: number | null;
    }> {

        if (!organizationId?.trim()) {
            throw new AppError("Organization ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        const subscription = await this.subscriptionRepository.findByOrganizationId(organizationId);

        if (!subscription) {
            throw new AppError("Subscription not found", HttpStatusCode.NOT_FOUND,);
        }

        if (subscription.status !== "ACTIVE") {
            return {
                hasAccess: false,
                isPremium: false,
                maxProjects: 0,
            };
        }

        if (subscription.endDate && subscription.endDate.getTime() <= Date.now()) {
            return {
                hasAccess: false,
                isPremium: false,
                maxProjects: 0,
            };
        }

        const plan = await this.planRepository.findById(subscription.planId);

        if (!plan || !plan.isActive) {
            return {
                hasAccess: false,
                isPremium: false,
                maxProjects: 0,
            };
        }

        if (plan.name === PlanName.PREMIUM) {
            return {
                hasAccess: true,
                isPremium: true,
                maxProjects: null,
            };
        }

        return {
            hasAccess: true,
            isPremium: false,
            maxProjects: plan.maxProjects ?? 0,
        };
    }
}