import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { Notification } from "../../domain/entity/notification.entity";
import { INotificationRepository } from "../../domain/interface/INotificationRepository";
import { IGetNotificationsUseCase } from "../../domain/interface/use-case/IGetNotificationsUseCase";

export class GetNotificationsUseCase implements IGetNotificationsUseCase {
    constructor(
        private readonly notificationRepository: INotificationRepository,
    ) { }

    async execute(userId: string): Promise<Notification[]> {

        if (!userId?.trim()) {
            throw new AppError(
                "User ID is required",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        return await this.notificationRepository.findByUserId(userId);
    }
}