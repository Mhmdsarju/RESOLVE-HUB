export interface ILeaveWarRoomUseCase {

    execute(id: string, userId: string,): Promise<void>;

}