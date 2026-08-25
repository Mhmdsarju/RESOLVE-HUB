import { Container } from "inversify";
import { bindAuth } from "./bindings/auth.bindings";
import { bindOrganization } from "./bindings/organization.binding";
import { bindTeam } from "./bindings/team.bindings";
import { bindIncident } from "./bindings/incident.bindings";
import { bindTask } from "./bindings/task.bindings";
import { bindMonitoring } from "./bindings/monitoring.bindings";
import { bindIntegration } from "./bindings/integration.bindings";
import { bindAlertRule } from "./bindings/alertRule.bindings";
import { bindAlert } from "./bindings/alert.bindings";
import { bindAlertRoutingRule } from "./bindings/alertRoutingRule.bindings";
import { bindCore } from "./bindings/core.bindings";
import { bindFile } from "./bindings/file.bindings";
import { bindWarRoom } from "./bindings/warroom.bindings";
const container = new Container();

bindCore(container);

export const authModule = bindAuth(container);
export const organizationModule = bindOrganization(container);
export const teamModule = bindTeam(container);
export const incidentModule = bindIncident(container);
export const taskModule = bindTask(container);
export const monitoringModule = bindMonitoring(container);
export const integrationModule = bindIntegration(container);

export const alertRuleModule = bindAlertRule(container);
export const alertRoutingRule = bindAlertRoutingRule(container);

export const alertModule = bindAlert(container,
    alertRoutingRule.routeAlertUseCase, incidentModule.createIncidentUseCase, taskModule.createTaskUseCase);

export const fileModule=bindFile(container);
export const warRoomModule=bindWarRoom(container);

export default container;