import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";

import { WarRoomParticipant } from "../entity/warRoomParticipant"; 

export interface IWarRoomParticipantRepository extends IBaseRepository<WarRoomParticipant> {

    findByWarRoomAndUser(warRoomId: string, userId: string,): Promise<WarRoomParticipant | null>;

    findActiveParticipants(warRoomId: string,): Promise<WarRoomParticipant[]>;

}