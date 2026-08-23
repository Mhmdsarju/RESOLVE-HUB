import { File } from "../../domain/entity/file.entity"; 
import { IFileRepository } from "../../domain/interface/IFileRepository"; 
import { IFileStorage } from "../../domain/interface/IFileStorage"; 
import { IUploadFileUseCase } from "../../domain/interface/usecase/IUploadFileUseCase"; 
import { UploadFileDTO } from "../dto/uploadFileDto";

export class UploadFileUseCase implements IUploadFileUseCase {
    constructor(
        private readonly fileRepository: IFileRepository,
        private readonly fileStorage: IFileStorage
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

        return this.fileRepository.create(file);
    }
}