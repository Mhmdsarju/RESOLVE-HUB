import { WarRoomParticipant } from "../../entity/warRoomParticipant";

export interface IGetWarRoomParticipantsUseCase {

    execute(warRoomId: string,): Promise<WarRoomParticipant[]>;

}