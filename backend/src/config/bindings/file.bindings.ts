import { IFileRepository } from "@/modules/file-management/domain/interface/IFileRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { DeleteFileUseCase } from "@/modules/file-management/application/usecase/DeleteFileUseCase";
import { IFileStorage } from "@/modules/file-management/domain/interface/IFileStorage";
import { GetFileByIdUseCase } from "@/modules/file-management/application/usecase/GetFileByIdUseCase";
import { GetFilesByTaskUseCase } from "@/modules/file-management/application/usecase/GetFilesByTaskUseCase";
import { UploadFileUseCase } from "@/modules/file-management/application/usecase/UploadUseCase";
import { FileController } from "@/modules/file-management/presentation/controller/FileController";
import { createFileRoutes } from "@/modules/file-management/presentation/routes/file.routes";

export function bindFile(container:Container){

    const fileRepository=container.get<IFileRepository>(TYPES.fileRepository);
    const fileStorage=container.get<IFileStorage>(TYPES.fileStorage);

    const deleteFileUseCase=new DeleteFileUseCase(
        fileRepository,
        fileStorage
    );

    const getFileByIdUseCase=new GetFileByIdUseCase(
        fileRepository
    )

    const getFilesByTaskUseCase=new GetFilesByTaskUseCase(
        fileRepository
    )

    const uploadFileUseCase=new UploadFileUseCase(
        fileRepository,
        fileStorage
    )

    const fileController=new FileController(
        uploadFileUseCase,
        getFileByIdUseCase,
        getFilesByTaskUseCase,
        deleteFileUseCase
    )

    const fileRouter=createFileRoutes(
        fileController
    )

    return {
        fileRouter
    }

}