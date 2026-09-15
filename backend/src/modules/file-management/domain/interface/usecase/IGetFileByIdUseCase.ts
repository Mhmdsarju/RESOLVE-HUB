import { File } from "../../entity/file.entity";

export interface IGetFileByIdUseCase {
    execute(id: string): Promise<File>;
}