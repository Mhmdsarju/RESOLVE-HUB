import { InvitationStatus } from "../enums/InvitationStatus";
import { TeamRole } from "../enums/TeamRole";

interface TeamInvitationProps {
    id?: string;
    organizationId: string;
    teamId: string;
    invitedEmail: string;
    role: TeamRole;
    token: string;
    status: InvitationStatus;
    expiresAt: Date;
    createdBy: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class TeamInvitation {
    public readonly id?: string;
    public organizationId: string;
    public teamId: string;
    public invitedEmail: string;
    public role: TeamRole;
    public token: string;
    public status: InvitationStatus;
    public expiresAt: Date;
    public createdBy: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;

    constructor(props: TeamInvitationProps) {
        this.id = props.id;
        this.organizationId = props.organizationId;
        this.teamId = props.teamId;
        this.invitedEmail = props.invitedEmail;
        this.role = props.role;
        this.token = props.token;
        this.status = props.status;
        this.expiresAt = props.expiresAt;
        this.createdBy = props.createdBy;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}