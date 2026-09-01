import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IFileRepository } from "../../domain/interface/IFileRepository";
import { IFileStorage } from "../../domain/interface/IFileStorage";
import { IDeleteFileUseCase } from "../../domain/interface/usecase/IDeleteFileUseCase";
import { ITaskRepository } from "@/modules/task-management/domain/interfaces/ITaskRepository";
import { ICreateTimelineEventUseCase } from "@/modules/timeline/domain/interfaces/usecases/ICreateTimelineEventUseCase";
import { TimelineEventType } from "@/modules/timeline/domain/enums/timelineEventType.enum";

export class DeleteFileUseCase implements IDeleteFileUseCase {
    constructor(
        private readonly fileRepository: IFileRepository,
        private readonly fileStorage: IFileStorage,
        private readonly taskRepository: ITaskRepository,
        private readonly createTimelineEventUseCase: ICreateTimelineEventUseCase,
    ) { }

    async execute(id: string): Promise<void> {
        const file = await this.fileRepository.findById(id);

        if (!file) {
            throw new AppError("File not found", HttpStatusCode.NOT_FOUND);
        }

        const task = await this.taskRepository.findById(file.taskId);

        await this.fileStorage.delete(
            file.publicId,
            file.mimeType,
        );

        await this.fileRepository.delete(id);

        if (task) {
            await this.createTimelineEventUseCase.execute(
                task.incidentId,
                TimelineEventType.FILE_DELETED,
                `File "${file.originalName}" was deleted from task "${task.title}"`,
                file.uploadedBy,
            );
        }
    }
}