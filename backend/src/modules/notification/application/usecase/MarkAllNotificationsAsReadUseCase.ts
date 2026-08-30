import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { INotificationRepository } from "../../domain/interface/INotificationRepository";
import { IMarkAllNotificationsAsReadUseCase } from "../../domain/interface/use-case/IMarkAllNotificationsAsReadUseCase";

export class MarkAllNotificationsAsReadUseCase implements IMarkAllNotificationsAsReadUseCase {
    constructor(
        private readonly notificationRepository: INotificationRepository,
    ) { }

    async execute(userId: string): Promise<void> {

        if (!userId?.trim()) {
            throw new AppError(
                "User ID is required",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        await this.notificationRepository.markAllAsRead(userId);
    }
}