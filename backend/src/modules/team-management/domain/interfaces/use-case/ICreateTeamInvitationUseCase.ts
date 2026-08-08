import { TeamInvitation } from "../../entities/teamInvitation.entity";
import { CreateTeamInvitationDto } from "@/modules/team-management/application/dto/createTeamInvitationDto";

export interface ICreateTeamInvitationUseCase{
    execute(dto:CreateTeamInvitationDto):Promise<TeamInvitation>;
}