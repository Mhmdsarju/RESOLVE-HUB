import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { Notification } from "../../domain/entity/notification.entity";
import { INotificationRepository } from "../../domain/interface/INotificationRepository";
import { IMarkNotificationAsReadUseCase } from "../../domain/interface/use-case/IMarkNotificationAsReadUseCase";

export class MarkNotificationAsReadUseCase implements IMarkNotificationAsReadUseCase {
    constructor(
        private readonly notificationRepository: INotificationRepository,
    ) { }

    async execute(id: string, userId: string): Promise<Notification> {

        if (!id?.trim()) {
            throw new AppError(
                "Notification ID is required",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (!userId?.trim()) {
            throw new AppError(
                "User ID is required",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        const notification = await this.notificationRepository.findById(id);

        if (!notification) {
            throw new AppError(
                "Notification not found",
                HttpStatusCode.NOT_FOUND,
            );
        }

        if (notification.userId !== userId) {
            throw new AppError(
                "You are not allowed to access this notification",
                HttpStatusCode.FORBIDDEN,
            );
        }

        if (notification.isRead) {
            return notification;
        }

        return await this.notificationRepository.markAsRead(id);
    }
}