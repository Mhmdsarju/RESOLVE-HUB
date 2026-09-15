import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";

import { File } from "../entity/file.entity";

export interface IFileRepository extends IBaseRepository<File> {
    findByTaskId(taskId: string): Promise<File[]>;
}