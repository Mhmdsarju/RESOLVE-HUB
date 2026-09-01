import cron from "node-cron";

import { ISendSubscriptionReminderUseCase } from "@/modules/subscription/domain/interface/use-cases/ISendSubscriptionReminderUseCase";

export class SubscriptionScheduler {

    constructor(
        private readonly sendSubscriptionReminderUseCase: ISendSubscriptionReminderUseCase,
    ) { }

    start(): void {

        cron.schedule("0 9 * * *", async () => {

            try {
                console.log("Running subscription reminder job...");

                await this.sendSubscriptionReminderUseCase.execute();

                console.log("Subscription reminder job completed");
            } catch (error) {
                console.error("Subscription reminder job failed:", error);
            }

        });

        console.log("Subscription scheduler started");
    }
}