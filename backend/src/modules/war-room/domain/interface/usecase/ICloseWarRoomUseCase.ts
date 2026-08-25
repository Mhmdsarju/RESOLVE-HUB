import { WarRoom } from "../../entity/warRoom.entity";

export interface ICloseWarRoomUseCase {

    execute(id: string, userId: string,): Promise<WarRoom>;

}