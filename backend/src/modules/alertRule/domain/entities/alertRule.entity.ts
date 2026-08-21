import { AlertOperator } from "../enums/alertOperator.enum";
import { Priority } from "@/modules/incident/domain/enums/priority.enum";
import { Severity } from "@/modules/incident/domain/enums/severity.enum";
export class AlertRule {
    constructor(
        public readonly id: string,
        public readonly monitoringProjectId: string,
        public readonly organizationId: string,
        public name: string,
        public metric: string,
        public operator: AlertOperator,
        public threshold: number,
        public severity: Severity,
        public priority: Priority,
        public autoCreateIncident: boolean,
        public isPredefined: boolean,
        public isActive: boolean,
        public readonly createdAt: Date,
        public updatedAt: Date
    ) { }
}