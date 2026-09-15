import { Request, Response, NextFunction } from "express";

import { BaseController } from "@/shared/base/controllers/BaseController";
import { ResponseHandler } from "@/shared/response/response-handler";

import { IGetNotificationsUseCase } from "../../domain/interface/use-case/IGetNotificationsUseCase";
import { IMarkNotificationAsReadUseCase } from "../../domain/interface/use-case/IMarkNotificationAsReadUseCase";
import { IMarkAllNotificationsAsReadUseCase } from "../../domain/interface/use-case/IMarkAllNotificationsAsReadUseCase";
import { IGetUnreadNotificationCountUseCase } from "../../domain/interface/use-case/IGetUnreadNotificationCountUseCase";

export class NotificationController extends BaseController {
    constructor(
        private readonly getNotificationsUseCase: IGetNotificationsUseCase,
        private readonly markNotificationAsReadUseCase: IMarkNotificationAsReadUseCase,
        private readonly markAllNotificationsAsReadUseCase: IMarkAllNotificationsAsReadUseCase,
        private readonly getUnreadNotificationCountUseCase: IGetUnreadNotificationCountUseCase,
    ) {
        super();
    }

    async getNotifications(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            const notifications = await this.getNotificationsUseCase.execute(
                currentUser.userId,
            );

            return ResponseHandler.success(
                res,
                "Notifications fetched successfully",
                notifications,
            );
        } catch (error) {
            next(error);
        }
    }

    async markAsRead(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            const notification = await this.markNotificationAsReadUseCase.execute(
                req.params.id,
                currentUser.userId,
            );

            return ResponseHandler.success(
                res,
                "Notification marked as read",
                notification,
            );
        } catch (error) {
            next(error);
        }
    }

    async markAllAsRead(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            await this.markAllNotificationsAsReadUseCase.execute(
                currentUser.userId,
            );

            return ResponseHandler.success(
                res,
                "All notifications marked as read",
                null,
            );
        } catch (error) {
            next(error);
        }
    }

    async getUnreadCount(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            const count = await this.getUnreadNotificationCountUseCase.execute(
                currentUser.userId,
            );

            return ResponseHandler.success(
                res,
                "Unread notification count fetched successfully",
                { count },
            );
        } catch (error) {
            next(error);
        }
    }
}