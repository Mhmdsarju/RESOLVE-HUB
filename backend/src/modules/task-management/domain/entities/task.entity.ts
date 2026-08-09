import { TaskStatus } from "../enums/taskStatus.enum";
import { TaskPriority } from "../enums/taskPriority.enum";

interface TaskProps {
    id?: string;

    title: string;
    description?: string;

    incidentId: string;
    assignedTo?: string;

    status?: TaskStatus;
    priority?: TaskPriority;

    dueDate?: Date;

    createdAt?: Date;
    updatedAt?: Date;
}

export class Task {
    public readonly id?: string;

    public title: string;
    public description?: string;

    public incidentId: string;
    public assignedTo?: string;

    public status: TaskStatus;
    public priority: TaskPriority;

    public dueDate?: Date;

    public readonly createdAt?: Date;
    public updatedAt?: Date;

    constructor(props: TaskProps) {
        this.id = props.id;

        this.title = props.title;
        this.description = props.description;

        this.incidentId = props.incidentId;
        this.assignedTo = props.assignedTo;

        this.status = props.status ?? TaskStatus.TODO;
        this.priority = props.priority ?? TaskPriority.MEDIUM;

        this.dueDate = props.dueDate;

        this.createdAt = props.createdAt ?? new Date();
        this.updatedAt = props.updatedAt ?? new Date();
    }
}