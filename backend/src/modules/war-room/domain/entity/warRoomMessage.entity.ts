interface WarRoomMessageProps {
    id?: string;
    warRoomId: string;
    userId: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class WarRoomMessage {
    public readonly id?: string;
    public readonly warRoomId: string;
    public readonly userId: string;
    public readonly content: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;

    constructor(props: WarRoomMessageProps) {
        this.id = props.id;
        this.warRoomId = props.warRoomId;
        this.userId = props.userId;
        this.content = props.content;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}