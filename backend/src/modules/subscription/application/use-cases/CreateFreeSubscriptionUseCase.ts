import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { Subscription } from "../../domain/entity/subscription.entity";
import { SubscriptionStatus } from "../../domain/enums/subscriptionStatus.enum";

import { ISubscriptionRepository } from "../../domain/interface/ISubscriptionRepository";
import { IPlanRepository } from "@/modules/plan/domain/interface/IPlanRepository";
import { ICreateFreeSubscriptionUseCase } from "../../domain/interface/use-cases/ICreateFreeSubscriptionUseCase";
import { PlanName } from "@/modules/plan/domain/enums/planName.enum";

export class CreateFreeSubscriptionUseCase implements ICreateFreeSubscriptionUseCase {

    constructor(
        private readonly subscriptionRepository: ISubscriptionRepository,
        private readonly planRepository: IPlanRepository,
    ) { }

    async execute(organizationId: string): Promise<Subscription> {

        if (!organizationId?.trim()) {
            throw new AppError("Organization ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        const existingSubscription = await this.subscriptionRepository.findByOrganizationId(organizationId);

        if (existingSubscription) {
            throw new AppError("Organization already has a subscription", HttpStatusCode.CONFLICT,);
        }

        const freePlan = await this.planRepository.findByName(PlanName.FREE);

        if (!freePlan) {
            throw new AppError("Free plan not found", HttpStatusCode.NOT_FOUND,);
        }

        if (!freePlan.isActive) {
            throw new AppError("Free plan is not active", HttpStatusCode.BAD_REQUEST,);
        }

        const startDate = new Date();

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + (freePlan.durationDays ?? 30));

        const subscription = new Subscription({
            organizationId,
            planId: freePlan.id!,
            status: SubscriptionStatus.ACTIVE,
            startDate,
            endDate,
            reminder10DaysSentAt: null,
            reminder2DaysSentAt: null,
        });

        return await this.subscriptionRepository.create(subscription);
    }
}