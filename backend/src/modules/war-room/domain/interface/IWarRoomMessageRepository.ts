import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";

import { WarRoomMessage } from "../entity/warRoomMessage.entity";

import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

export interface IWarRoomMessageRepository extends IBaseRepository<WarRoomMessage> {

    findByWarRoomId(warRoomId: string, page: number, limit: number,): Promise<PaginationResult<WarRoomMessage>>;

}