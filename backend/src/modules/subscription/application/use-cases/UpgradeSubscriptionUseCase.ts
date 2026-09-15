import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { Subscription } from "../../domain/entity/subscription.entity";
import { SubscriptionStatus } from "../../domain/enums/subscriptionStatus.enum";

import { ISubscriptionRepository } from "../../domain/interface/ISubscriptionRepository";
import { IPlanRepository } from "@/modules/plan/domain/interface/IPlanRepository";
import { IUpgradeSubscriptionUseCase } from "../../domain/interface/use-cases/IUpgradeSubscriptionUseCase";

export class UpgradeSubscriptionUseCase implements IUpgradeSubscriptionUseCase {

    constructor(
        private readonly subscriptionRepository: ISubscriptionRepository,
        private readonly planRepository: IPlanRepository,
    ) { }

    async execute(organizationId: string, planId: string,): Promise<Subscription> {

        if (!organizationId?.trim()) {
            throw new AppError("Organization ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!planId?.trim()) {
            throw new AppError("Plan ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        const plan = await this.planRepository.findById(planId);

        if (!plan) {
            throw new AppError("Plan not found", HttpStatusCode.NOT_FOUND,);
        }

        if (!plan.isActive) {
            throw new AppError("Plan is not active", HttpStatusCode.BAD_REQUEST,);
        }

        if (plan.name !== "PREMIUM") {
            throw new AppError("Only premium plan can be purchased", HttpStatusCode.BAD_REQUEST,);
        }

        const subscription = await this.subscriptionRepository.findByOrganizationId(organizationId);

        if (!subscription) {
            throw new AppError("Subscription not found", HttpStatusCode.NOT_FOUND,);
        }

        const startDate = new Date();

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + (plan.durationDays ?? 365));

        return await this.subscriptionRepository.update(
            subscription.id!,
            {
                planId: plan.id!,
                status: SubscriptionStatus.ACTIVE,
                startDate,
                endDate,
                reminder10DaysSentAt: null,
                reminder2DaysSentAt: null,
            },
        );
    }
}