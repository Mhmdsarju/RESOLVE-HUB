import { ISubscriptionRepository } from "../../domain/interface/ISubscriptionRepository";
import { IProcessSubscriptionExpiryUseCase } from "../../domain/interface/use-cases/IProcessSubscriptionExpiryUseCase";
import { SubscriptionStatus } from "../../domain/enums/subscriptionStatus.enum";

export class ProcessSubscriptionExpiryUseCase implements IProcessSubscriptionExpiryUseCase {

    constructor(
        private readonly subscriptionRepository: ISubscriptionRepository,
    ) { }

    async execute(): Promise<void> {

        const subscriptions =
            await this.subscriptionRepository.findExpiredSubscriptions(new Date());

        for (const subscription of subscriptions) {
            await this.subscriptionRepository.update(
                subscription.id!,
                {
                    status: SubscriptionStatus.EXPIRED,
                },
            );
        }
    }
}