import { PaginationDto } from "@/shared/utils/Pagination/PaginationDto";

export interface GetTeamsDto extends PaginationDto{
    organizationId:string;
}