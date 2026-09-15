import { WarRoomStatus } from "../enums/warRoomStatus.enum";

interface WarRoomProps {
    id?: string;
    incidentId: string;
    createdBy: string | null;
    status: WarRoomStatus;
    createdAt?: Date;
    updatedAt?: Date;
    closedAt?: Date | null;
}

export class WarRoom {
    public readonly id?: string;
    public readonly incidentId: string;
    public readonly createdBy: string | null;;
    public status: WarRoomStatus;
    public readonly createdAt?: Date;
    public updatedAt?: Date;
    public closedAt?: Date | null;

    constructor(props: WarRoomProps) {
        this.id = props.id;
        this.incidentId = props.incidentId;
        this.createdBy = props.createdBy ?? null;
        this.status = props.status;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.closedAt = props.closedAt;
    }
}