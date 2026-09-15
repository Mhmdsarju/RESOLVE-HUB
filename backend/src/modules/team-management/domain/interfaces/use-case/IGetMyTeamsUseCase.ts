import { GetMyTeamsResponseDto } from "@/modules/team-management/application/dto/getMyTeamsResponseDto";

export interface IGetMyTeamsUseCase {
  execute(userId: string): Promise<GetMyTeamsResponseDto[]>;
}