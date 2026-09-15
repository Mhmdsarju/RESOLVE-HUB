import type { AlertOperator } from "../types/alertRule.types";
import type {  IncidentPriority,  IncidentSeverity,} from "../../incident/types/incident.types";

export const ALERT_OPERATOR_CONFIG: Record<  AlertOperator,  string> = {
  GT: ">",
  LT: "<",
  GTE: ">=",
  LTE: "<=",
  EQ: "=",
};

export const ALERT_SEVERITY_CONFIG = {
  LOW: "bg-blue-50 text-blue-700",
  MEDIUM: "bg-yellow-50 text-yellow-700",
  HIGH: "bg-orange-50 text-orange-700",
  CRITICAL: "bg-red-50 text-red-700",
} as const;

export const ALERT_PRIORITY_CONFIG = {
  P1: "bg-red-50 text-red-700",
  P2: "bg-orange-50 text-orange-700",
  P3: "bg-yellow-50 text-yellow-700",
  P4: "bg-blue-50 text-blue-700",
} as const;

export const ALERT_OPERATOR_OPTIONS: {  value: AlertOperator;  label: string;}[] = [
  {
    value: "GT",
    label: "Greater than (>)",
  },
  {
    value: "LT",
    label: "Less than (<)",
  },
  {
    value: "GTE",
    label: "Greater than or equal (>=)",
  },
  {
    value: "LTE",
    label: "Less than or equal (<=)",
  },
  {
    value: "EQ",
    label: "Equal to (=)",
  },
];

export const ALERT_SEVERITY_OPTIONS: IncidentSeverity[] = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
];

export const ALERT_PRIORITY_OPTIONS: IncidentPriority[] = [
  "P1",
  "P2",
  "P3",
  "P4",
];

export const ALERT_RULE_DETAIL_PAGE_operatorLabels: Record<string, string> = {
  GT: "Greater than (>)",
  LT: "Less than (<)",
  GTE: "Greater than or equal (>=)",
  LTE: "Less than or equal (<=)",
  EQ: "Equal to (=)",
};

export const ALERT_RULE_DETAIL_PAGE_severityStyles = {
  LOW: "bg-blue-50 text-blue-700",
  MEDIUM: "bg-yellow-50 text-yellow-700",
  HIGH: "bg-orange-50 text-orange-700",
  CRITICAL: "bg-red-50 text-red-700",
};

export const ALERT_RULE_DETAIL_PAGE_priorityStyles = {
  P1: "bg-red-50 text-red-700",
  P2: "bg-orange-50 text-orange-700",
  P3: "bg-yellow-50 text-yellow-700",
  P4: "bg-blue-50 text-blue-700",
};