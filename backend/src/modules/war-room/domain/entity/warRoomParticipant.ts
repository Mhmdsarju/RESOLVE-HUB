interface WarRoomParticipantProps {
    id?: string;
    warRoomId: string;
    userId: string;
    joinedAt?: Date;
    leftAt?: Date | null;
}

export class WarRoomParticipant {
    public readonly id?: string;
    public readonly warRoomId: string;
    public readonly userId: string;
    public readonly joinedAt?: Date;
    public readonly leftAt?: Date | null;

    constructor(props: WarRoomParticipantProps) {
        this.id = props.id;
        this.warRoomId = props.warRoomId;
        this.userId = props.userId;
        this.joinedAt = props.joinedAt;
        this.leftAt = props.leftAt;
    }
}