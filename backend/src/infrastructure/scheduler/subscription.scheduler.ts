import cron from "node-cron";

import { ISendSubscriptionReminderUseCase } from "@/modules/subscription/domain/interface/use-cases/ISendSubscriptionReminderUseCase";
import { IProcessSubscriptionExpiryUseCase } from "@/modules/subscription/domain/interface/use-cases/IProcessSubscriptionExpiryUseCase";

export class SubscriptionScheduler {

    constructor(
        private readonly sendSubscriptionReminderUseCase: ISendSubscriptionReminderUseCase,
        private readonly processSubscriptionExpiryUseCase: IProcessSubscriptionExpiryUseCase,
    ) { }

    start(): void {

        cron.schedule("0 9 * * *", async () => {

            try {
                console.log("Running subscription expiry job...");

                await this.processSubscriptionExpiryUseCase.execute();

                console.log("Subscription expiry job completed");

                console.log("Running subscription reminder job...");

                await this.sendSubscriptionReminderUseCase.execute();

                console.log("Subscription reminder job completed");

            } catch (error) {
                console.error("Subscription scheduler job failed:", error);
            }

        });

        console.log("Subscription scheduler started");
    }
}