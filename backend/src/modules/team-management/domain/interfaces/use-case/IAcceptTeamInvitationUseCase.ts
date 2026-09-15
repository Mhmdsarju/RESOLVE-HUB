import { User } from "@/modules/auth/domain/entities/User"; 
import { AcceptTeamInvitationDto } from "@/modules/team-management/application/dto/acceptTeamInvitationDto";

export interface LoginResponseDto {
    user: User;
    accessToken: string;
}

export interface IAcceptTeamInvitationUseCase {
    execute(dto: AcceptTeamInvitationDto): Promise<LoginResponseDto>;
}