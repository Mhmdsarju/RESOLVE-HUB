import { AuditAction, AuditEntityType } from "@/modules/audit-log/domain/enums/auditLog.enum";


interface AuditLogProps {
    id?: string;
    organizationId: string;
    actorId?: string | null;
    action: AuditAction;
    entityType: AuditEntityType;
    entityId?: string | null;
    description: string;
    metadata?: unknown;
    createdAt?: Date;
}

export class AuditLog {
    public readonly id?: string;
    public readonly organizationId: string;
    public readonly actorId?: string | null;
    public readonly action: AuditAction;
    public readonly entityType: AuditEntityType;
    public readonly entityId?: string | null;
    public readonly description: string;
    public readonly metadata?: unknown;
    public readonly createdAt?: Date;

    constructor(props: AuditLogProps) {
        this.id = props.id;
        this.organizationId = props.organizationId;
        this.actorId = props.actorId ?? null;
        this.action = props.action;
        this.entityType = props.entityType;
        this.entityId = props.entityId ?? null;
        this.description = props.description;
        this.metadata = props.metadata;
        this.createdAt = props.createdAt;
    }
}