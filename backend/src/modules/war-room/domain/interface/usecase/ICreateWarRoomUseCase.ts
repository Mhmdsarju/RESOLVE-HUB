import { CreateWarRoomDto } from "@/modules/war-room/application/dto/createWarRoomDto";
import { WarRoom } from "../../entity/warRoom.entity";

export interface ICreateWarRoomUseCase {
    execute(dto: CreateWarRoomDto, createdBy?: string): Promise<WarRoom>;
}