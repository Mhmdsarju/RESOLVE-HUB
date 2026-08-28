export interface ILeaveWarRoomUseCase {

    execute(id: string, userId: string, userRole: string): Promise<void>;

}