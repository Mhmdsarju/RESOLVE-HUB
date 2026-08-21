import { PaginationMeta } from "./PaginationMeta";

export interface PaginationResult<T>{
    items:T[];
    pagination:PaginationMeta;
}