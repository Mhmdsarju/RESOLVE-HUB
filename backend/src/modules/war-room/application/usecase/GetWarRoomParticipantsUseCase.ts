import { IWarRoomParticipantRepository } from "../../domain/interface/IWarRoomParticipantRepository";
import { WarRoomParticipant } from "../../domain/entity/warRoomParticipant";
import { IGetWarRoomParticipantsUseCase } from "../../domain/interface/usecase/IGetWarRoomParticipantsUseCase";

export class GetWarRoomParticipantsUseCase implements IGetWarRoomParticipantsUseCase {

    constructor(
        private readonly warRoomParticipantRepository: IWarRoomParticipantRepository,
    ) { }

    async execute(warRoomId: string,): Promise<WarRoomParticipant[]> {

        return await this.warRoomParticipantRepository.findActiveParticipants(warRoomId);

    }
}