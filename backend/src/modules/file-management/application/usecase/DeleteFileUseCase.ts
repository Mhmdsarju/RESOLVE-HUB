import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IFileRepository } from "../../domain/interface/IFileRepository";
import { IFileStorage } from "../../domain/interface/IFileStorage";
import { IDeleteFileUseCase } from "../../domain/interface/usecase/IDeleteFileUseCase";

export class DeleteFileUseCase implements IDeleteFileUseCase {
    constructor(
        private readonly fileRepository: IFileRepository,
        private readonly fileStorage: IFileStorage
    ) { }

    async execute(id: string): Promise<void> {
        const file = await this.fileRepository.findById(id);

        if (!file) {
            throw new AppError("File not found", HttpStatusCode.NOT_FOUND);
        }

        await this.fileStorage.delete(file.publicId);

        await this.fileRepository.delete(id);
    }
}