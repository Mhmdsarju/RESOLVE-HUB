import { WarRoom } from "../../entity/warRoom.entity";

export interface IGetWarRoomByIdUseCase {

    execute(id: string, userId: string,): Promise<WarRoom>;

}