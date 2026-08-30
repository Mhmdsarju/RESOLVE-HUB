import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { INotificationRepository } from "../../domain/interface/INotificationRepository";
import { IGetUnreadNotificationCountUseCase } from "../../domain/interface/use-case/IGetUnreadNotificationCountUseCase";

export class GetUnreadNotificationCountUseCase implements IGetUnreadNotificationCountUseCase {
    constructor(
        private readonly notificationRepository: INotificationRepository,
    ) { }

    async execute(userId: string): Promise<number> {

        if (!userId?.trim()) {
            throw new AppError(
                "User ID is required",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        return await this.notificationRepository.getUnreadCount(userId);
    }
}