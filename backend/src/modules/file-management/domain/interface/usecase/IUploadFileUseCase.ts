import { UploadFileDTO } from "@/modules/file-management/application/dto/uploadFileDto";
import { File } from "../../entity/file.entity";

export interface IUploadFileUseCase {
    execute(input: UploadFileDTO): Promise<File>;
}