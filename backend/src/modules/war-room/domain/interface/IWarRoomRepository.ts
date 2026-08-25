import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";

import { WarRoom } from "../entity/warRoom.entity";
import { GetWarRoomsDto } from "../../application/dto/getWarRoomsDto";

import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

export interface IWarRoomRepository extends IBaseRepository<WarRoom> {

    findByIncidentId(incidentId: string): Promise<WarRoom | null>;

    findWarRooms(dto: GetWarRoomsDto,): Promise<PaginationResult<WarRoom>>;

}