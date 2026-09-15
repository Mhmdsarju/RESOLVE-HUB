import { WarRoom } from "../../entity/warRoom.entity";

export interface IJoinWarRoomUseCase {

    execute(id: string, userId: string,userRole:string): Promise<WarRoom>;

}