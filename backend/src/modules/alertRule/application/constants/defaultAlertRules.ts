import { AlertOperator } from "../../domain/enums/alertOperator.enum";
import { Priority } from "@/modules/incident/domain/enums/priority.enum";
import { Severity } from "@/modules/incident/domain/enums/severity.enum";

export interface DefaultAlertRule {
  name: string;
  metric: string;
  operator: AlertOperator;
  threshold: number;
  severity: Severity;
  priority: Priority;
  autoCreateIncident: boolean;
}

export const DEFAULT_ALERT_RULES: DefaultAlertRule[] = [
  {
    name: "High CPU Usage",
    metric: "cpu_usage",
    operator: AlertOperator.GTE,
    threshold: 80,
    severity: Severity.HIGH,
    priority: Priority.P2,
    autoCreateIncident: true,
  },
  {
    name: "Critical CPU Usage",
    metric: "cpu_usage",
    operator: AlertOperator.GTE,
    threshold: 95,
    severity: Severity.CRITICAL,
    priority: Priority.P1,
    autoCreateIncident: true,
  },
  {
    name: "High Memory Usage",
    metric: "memory_usage",
    operator: AlertOperator.GTE,
    threshold: 90,
    severity: Severity.HIGH,
    priority: Priority.P2,
    autoCreateIncident: true,
  },
  {
    name: "High Error Rate",
    metric: "error_rate",
    operator: AlertOperator.GTE,
    threshold: 5,
    severity: Severity.HIGH,
    priority: Priority.P1,
    autoCreateIncident: true,
  },
  {
    name: "Slow Response Time",
    metric: "response_time",
    operator: AlertOperator.GTE,
    threshold: 2000,
    severity: Severity.MEDIUM,
    priority: Priority.P2,
    autoCreateIncident: false,
  },
];