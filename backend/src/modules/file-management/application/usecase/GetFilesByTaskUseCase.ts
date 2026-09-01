import { File } from "../../domain/entity/file.entity";
import { IFileRepository } from "../../domain/interface/IFileRepository";
import { IGetFilesByTaskUseCase } from "../../domain/interface/usecase/IGetFilesByTaskUseCase";

export class GetFilesByTaskUseCase implements IGetFilesByTaskUseCase {
    constructor(
        private readonly fileRepository: IFileRepository
    ) { }

    async execute(taskId: string): Promise<File[]> {
        return this.fileRepository.findByTaskId(taskId);
    }
}