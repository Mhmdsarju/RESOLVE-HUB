import { PaginationDto } from "@/shared/utils/Pagination/PaginationDto";

import { WarRoomStatus } from "../../domain/enums/warRoomStatus.enum"; 

export interface GetWarRoomsDto extends PaginationDto {

    organizationId: string | null;

    teamIds?: string[];

    status?: WarRoomStatus;

    search?: string;

}