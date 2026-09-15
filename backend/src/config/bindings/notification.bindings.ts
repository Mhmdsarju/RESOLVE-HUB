import { INotificationRepository } from "@/modules/notification/domain/interface/INotificationRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { CreateNotificationUseCase } from "@/modules/notification/application/usecase/CreateNotificationUseCase";
import { GetNotificationsUseCase } from "@/modules/notification/application/usecase/GetNotificationsUseCase";
import { GetUnreadNotificationCountUseCase } from "@/modules/notification/application/usecase/GetUnreadNotificationCountUseCase";
import { MarkAllNotificationsAsReadUseCase } from "@/modules/notification/application/usecase/MarkAllNotificationsAsReadUseCase";
import { MarkNotificationAsReadUseCase } from "@/modules/notification/application/usecase/MarkNotificationAsReadUseCase";
import { NotificationController } from "@/modules/notification/presentation/controller/NotificationController";
import { createNotificationRoutes } from "@/modules/notification/presentation/routes/notificationRoutes";

export function bindNotification(container: Container) {

    const notificationRepository = container.get<INotificationRepository>(TYPES.notificationRepository);

    const createNotificationUseCase = new CreateNotificationUseCase(
        notificationRepository
    )

    const getNotificationsUseCase = new GetNotificationsUseCase(
        notificationRepository
    )

    const getUnreadNotificationCountUseCase=new GetUnreadNotificationCountUseCase(
        notificationRepository
    );

    const markAllNotificationsAsReadUseCase=new MarkAllNotificationsAsReadUseCase(
        notificationRepository
    );

    const markNotificationAsReadUseCase=new MarkNotificationAsReadUseCase(
        notificationRepository
    )

    const notificationController=new NotificationController(
        getNotificationsUseCase,
        markNotificationAsReadUseCase,
        markAllNotificationsAsReadUseCase,
        getUnreadNotificationCountUseCase
    )

    const notificationRouter=createNotificationRoutes(
        notificationController
    )

    return {
        notificationRouter,
        createNotificationUseCase
    }

}