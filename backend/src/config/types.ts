import { AUTH_TYPES } from "./types/auth.types";
import { ORGANIZATION_TYPES } from "./types/organization.types";
import { TEAM_TYPES } from "./types/team.types";
import { INCIDENT_TYPES } from "./types/incident.types";
import { TASK_TYPES } from "./types/task.types";
import { MONITORING_TYPES } from "./types/monitoring.types";
import { INTEGRATION_TYPES } from "./types/integration.types";
import { ALERTRULES_TYPES } from "./types/alertRule.types";
import { ALERT_TYPES } from "./types/alert.types";
import { ALERT_ROUTING_RULE_TYPES } from "./types/alertRoutingRule.types";
import { FILE_TYPES } from "./types/file.types";
import { WARROOM_TYPES } from "./types/warroom.types";
import { COLLABORATION_TYPES } from "./types/collaboration.types";

export const TYPES = {
  ...AUTH_TYPES,
  ...ORGANIZATION_TYPES,
  ...TEAM_TYPES,
  ...INCIDENT_TYPES,
  ...TASK_TYPES,
  ...MONITORING_TYPES,
  ...INTEGRATION_TYPES,
  ...ALERTRULES_TYPES,
  ...ALERT_TYPES,
  ...ALERT_ROUTING_RULE_TYPES,
  ...FILE_TYPES,
  ...WARROOM_TYPES,
  ...COLLABORATION_TYPES
};