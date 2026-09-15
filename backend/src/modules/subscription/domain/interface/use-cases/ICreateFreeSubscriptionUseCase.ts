import { Subscription } from "../../entity/subscription.entity";

export interface ICreateFreeSubscriptionUseCase {
    execute(organizationId: string): Promise<Subscription>;
}