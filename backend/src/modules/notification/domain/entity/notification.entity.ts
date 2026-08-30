import { NotificationType } from "../enums/NotificationType";

interface NotificationProps {
    id?: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    isRead?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Notification {
    public readonly id?: string;
    public readonly userId: string;
    public readonly type: NotificationType;
    public readonly title: string;
    public readonly message: string;
    public isRead: boolean;
    public readonly createdAt?: Date;
    public updatedAt?: Date;

    constructor(props: NotificationProps) {
        this.id = props.id;
        this.userId = props.userId;
        this.type = props.type;
        this.title = props.title;
        this.message = props.message;
        this.isRead = props.isRead ?? false;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}