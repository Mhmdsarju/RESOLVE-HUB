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
const container = new Container();

bindAuth(container);
bindOrganization(container);
bindTeam(container);
bindIncident(container);
bindTask(container);
bindMonitoring(container);
bindIntegration(container);
bindAlertRule(container);
bindAlert(container);

export default container;