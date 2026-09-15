import { GetWarRoomsDto } from "../../../application/dto/getWarRoomsDto";

import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

import { WarRoom } from "../../entity/warRoom.entity";

export interface IGetWarRoomsUseCase {

    execute(dto: GetWarRoomsDto, userId: string,): Promise<PaginationResult<WarRoom>>;

}