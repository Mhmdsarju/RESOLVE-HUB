import { WarRoomMessage } from "../../entity/warRoomMessage.entity";

import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

export interface IGetWarRoomMessagesUseCase {

    execute(warRoomId: string, userId: string, page: number, limit: number,): Promise<PaginationResult<WarRoomMessage>>;

}