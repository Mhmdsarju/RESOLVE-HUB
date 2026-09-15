import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { File } from "../../domain/entity/file.entity";
import { IFileRepository } from "../../domain/interface/IFileRepository";
import { IGetFileByIdUseCase } from "../../domain/interface/usecase/IGetFileByIdUseCase";


export class GetFileByIdUseCase implements IGetFileByIdUseCase {
    constructor(
        private readonly fileRepository: IFileRepository
    ) { }

    async execute(id: string): Promise<File> {
        const file =await this.fileRepository.findById(id);
        if (!file) {
            throw new AppError("File not found", HttpStatusCode.NOT_FOUND);
        }

        return file;

    }


}