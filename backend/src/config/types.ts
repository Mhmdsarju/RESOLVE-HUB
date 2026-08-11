import { AUTH_TYPES } from "./types/auth.types";
import { ORGANIZATION_TYPES } from "./types/organization.types";
import { TEAM_TYPES } from "./types/team.types";
import { INCIDENT_TYPES } from "./types/incident.types";
import { TASK_TYPES } from "./types/task.types";
import { MONITORING_TYPES } from "./types/monitoring.types";
import { INTEGRATION_TYPES } from "./types/integration.types";
import { ALERTRULES_TYPES } from "./types/alertRule.types";

export const TYPES = {
  ...AUTH_TYPES,
  ...ORGANIZATION_TYPES,
  ...TEAM_TYPES,
  ...INCIDENT_TYPES,
  ...TASK_TYPES,
  ...MONITORING_TYPES,
  ...INTEGRATION_TYPES,
  ...ALERTRULES_TYPES

} ;