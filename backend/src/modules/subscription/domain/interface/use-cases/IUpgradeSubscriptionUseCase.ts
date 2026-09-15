import { Subscription } from "../../entity/subscription.entity";

export interface IUpgradeSubscriptionUseCase {
    execute(organizationId: string, planId: string,): Promise<Subscription>;
}