import { File } from "../../entity/file.entity";

export interface IGetFilesByTaskUseCase{
    execute(taskId:string):Promise<File[]>;
}