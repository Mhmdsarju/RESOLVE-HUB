import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { Notification } from "../../domain/entity/notification.entity";
import { INotificationRepository } from "../../domain/interface/INotificationRepository";
import { ICreateNotificationUseCase } from "../../domain/interface/use-case/ICreateNotificationUseCase";

import { CreateNotificationDto } from "../dto/CreateNotificationDto";
import { getSocketServer } from "@/config/socket";

export class CreateNotificationUseCase implements ICreateNotificationUseCase {
    constructor(
        private readonly notificationRepository: INotificationRepository,
    ) { }

    async execute(dto: CreateNotificationDto): Promise<Notification> {

        if (!dto.userId?.trim()) {
            throw new AppError(
                "User ID is required",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (!dto.title?.trim()) {
            throw new AppError(
                "Notification title is required",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (!dto.message?.trim()) {
            throw new AppError(
                "Notification message is required",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        const notification = new Notification({
            userId: dto.userId,
            type: dto.type,
            title: dto.title.trim(),
            message: dto.message.trim(),
        });

        const createdNotification=await this.notificationRepository.create(notification);

        const io=getSocketServer();

        io.to(`user:${dto.userId}`).emit(
            "notification:new",
            createdNotification
        )

        return createdNotification;
    }
}