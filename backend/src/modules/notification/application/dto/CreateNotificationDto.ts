import { NotificationType } from "../../domain/enums/NotificationType"; 

export interface CreateNotificationDto {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
}