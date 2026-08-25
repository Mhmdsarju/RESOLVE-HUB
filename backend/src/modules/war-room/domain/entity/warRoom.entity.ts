import { WarRoomStatus } from "../enums/warRoomStatus.enum";

interface WarRoomProps {
    id?: string;
    incidentId: string;
    createdBy: string;
    status: WarRoomStatus;
    createdAt?: Date;
    updatedAt?: Date;
    closedAt?: Date | null;
}

export class WarRoom {
    public readonly id?: string;
    public readonly incidentId: string;
    public readonly createdBy: string;
    public status: WarRoomStatus;
    public readonly createdAt?: Date;
    public updatedAt?: Date;
    public closedAt?: Date | null;

    constructor(props: WarRoomProps) {
        this.id = props.id;
        this.incidentId = props.incidentId;
        this.createdBy = props.createdBy;
        this.status = props.status;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.closedAt = props.closedAt;
    }
}