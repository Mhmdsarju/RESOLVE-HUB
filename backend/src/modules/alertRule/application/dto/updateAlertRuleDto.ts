import { AlertOperator } from "../../domain/enums/alertOperator.enum";
import { Priority } from "@/modules/incident/domain/enums/priority.enum";
import { Severity } from "@/modules/incident/domain/enums/severity.enum";

export interface UpdateAlertRuleDTO {
  name?: string;
  metric?: string;
  operator?: AlertOperator;
  threshold?: number;
  severity?: Severity;
  priority?: Priority;
  autoCreateIncident?: boolean;
  isActive?: boolean;
}