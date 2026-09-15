import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IFileRepository } from "../../domain/interface/IFileRepository";
import { IFileStorage } from "../../domain/interface/IFileStorage";
import { IDownloadFileUseCase } from "../../domain/interface/usecase/IDownloadFileUseCase";

export class DownloadFileUseCase implements IDownloadFileUseCase {
    constructor(
        private readonly fileRepository: IFileRepository,
        private readonly fileStorage: IFileStorage
    ) { }

    async execute(id: string): Promise<Buffer> {
        const file = await this.fileRepository.findById(id);

        if (!file) {
            throw new AppError("File not found", HttpStatusCode.NOT_FOUND);
        }

        return this.fileStorage.download(
            file.publicId,
            file.mimeType,
        );
    }
}