import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { Subscription } from "../../domain/entity/subscription.entity";

import { ISubscriptionRepository } from "../../domain/interface/ISubscriptionRepository";
import { IGetSubscriptionUseCase } from "../../domain/interface/use-cases/IGetSubscriptionUseCase";

export class GetSubscriptionUseCase implements IGetSubscriptionUseCase {

    constructor(
        private readonly subscriptionRepository: ISubscriptionRepository,
    ) { }

    async execute(organizationId: string): Promise<Subscription> {

        if (!organizationId?.trim()) {
            throw new AppError(
                "Organization ID is required",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        const subscription = await this.subscriptionRepository.findByOrganizationId(organizationId);

        if (!subscription) {
            throw new AppError(
                "Subscription not found",
                HttpStatusCode.NOT_FOUND,
            );
        }

        return subscription;
    }
}