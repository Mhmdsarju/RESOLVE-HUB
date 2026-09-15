import { Notification } from "../../entity/notification.entity"; 

export interface IGetNotificationsUseCase {
    execute(userId: string): Promise<Notification[]>;
}