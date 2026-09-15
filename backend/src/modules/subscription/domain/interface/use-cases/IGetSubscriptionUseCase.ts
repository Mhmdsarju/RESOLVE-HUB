import { Subscription } from "../../entity/subscription.entity";

export interface IGetSubscriptionUseCase {
    execute(organizationId: string): Promise<Subscription>;
}