import { WarRoomMessage } from "../../entity/warRoomMessage.entity";

export interface ISendWarRoomMessageUseCase {

    execute(warRoomId: string, userId: string, content: string,): Promise<WarRoomMessage>;

}