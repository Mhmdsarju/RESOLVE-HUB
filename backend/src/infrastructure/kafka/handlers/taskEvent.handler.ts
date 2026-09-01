import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";
import { NotificationType } from "@/modules/notification/domain/enums/NotificationType";
import { ICreateNotificationUseCase } from "@/modules/notification/domain/interface/use-case/ICreateNotificationUseCase";

export class TaskEventHandler {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly createNotificationUseCase: ICreateNotificationUseCase,
    ) { }

    async handle(message: string): Promise<void> {

        const event = JSON.parse(message);

        if (event.event !== "TASK_STATUS_UPDATED") {
            return;
        }

        const admin = await this.userRepository.findOrganizationAdminByOrganizationId(event.organizationId);

        if (!admin) {
            console.log("Organization admin not found");
            return;
        }

        await this.createNotificationUseCase.execute({
            userId: admin.id!,
            type: NotificationType.TASK,
            title: event.newStatus === "DONE"
                ? "Task Completed"
                : "Task Status Updated",
            message: event.newStatus === "DONE"
                ? `Task "${event.taskTitle}" was completed.`
                : `Task "${event.taskTitle}" status changed from ${event.previousStatus} to ${event.newStatus}.`,
        });


    }
}