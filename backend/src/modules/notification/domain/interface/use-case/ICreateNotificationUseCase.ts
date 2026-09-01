import { Notification } from "../../entity/notification.entity"; 
import { CreateNotificationDto } from "@/modules/notification/application/dto/CreateNotificationDto";

export interface ICreateNotificationUseCase {
    execute(dto: CreateNotificationDto): Promise<Notification>;
}