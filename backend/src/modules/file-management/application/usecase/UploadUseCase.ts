import { File } from "../../domain/entity/file.entity"; 
import { IFileRepository } from "../../domain/interface/IFileRepository"; 
import { IFileStorage } from "../../domain/interface/IFileStorage"; 
import { IUploadFileUseCase } from "../../domain/interface/usecase/IUploadFileUseCase"; 
import { UploadFileDTO } from "../dto/uploadFileDto";
import { ITaskRepository } from "@/modules/task-management/domain/interfaces/ITaskRepository";
import { ICreateTimelineEventUseCase } from "@/modules/timeline/domain/interfaces/usecases/ICreateTimelineEventUseCase";
import { TimelineEventType } from "@/modules/timeline/domain/enums/timelineEventType.enum";

export class UploadFileUseCase implements IUploadFileUseCase {
    constructor(
        private readonly fileRepository: IFileRepository,
        private readonly fileStorage: IFileStorage,
        private readonly taskRepository: ITaskRepository,
        private readonly createTimelineEventUseCase: ICreateTimelineEventUseCase,
    ) { }

    async execute(input: UploadFileDTO): Promise<File> {
        
        const uploadedFile = await this.fileStorage.upload(
            input.file,
            input.fileName,
            input.mimeType
        );

        const file = new File({
            taskId: input.taskId,
            uploadedBy: input.uploadedBy,
            originalName: input.originalName,
            fileName: input.fileName,
            mimeType: input.mimeType,
            size: input.size,
            storageUrl: uploadedFile.storageUrl,
            publicId: uploadedFile.publicId,
        });

        const createdFile = await this.fileRepository.create(file);

        const task = await this.taskRepository.findById(input.taskId);

        if (task) {
            await this.createTimelineEventUseCase.execute(
                task.incidentId,
                TimelineEventType.FILE_UPLOADED,
                `File "${createdFile.originalName}" was uploaded to task "${task.title}"`,
                input.uploadedBy,
            );
        }

        return createdFile;
    }
}