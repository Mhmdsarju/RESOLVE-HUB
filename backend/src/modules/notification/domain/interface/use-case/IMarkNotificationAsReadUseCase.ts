import { Notification } from "../../entity/notification.entity"; 

export interface IMarkNotificationAsReadUseCase {
    execute(id: string, userId: string): Promise<Notification>;
}