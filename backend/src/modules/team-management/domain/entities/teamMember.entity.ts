import { TeamRole } from "../enums/TeamRole";

interface TeamMemberProps {
    id?: string;
    teamId: string;
    userId: string;
    role: TeamRole;
    createdAt?: Date;
    updatedAt?: Date;
}

export class TeamMember {
    public readonly id?: string;
    public teamId: string;
    public userId: string;
    public role: TeamRole;
    public readonly createdAt?: Date;
    public updatedAt?: Date;

    constructor(props: TeamMemberProps) {
        this.id = props.id;
        this.teamId = props.teamId;
        this.userId = props.userId;
        this.role = props.role;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}