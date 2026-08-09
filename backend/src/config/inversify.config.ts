import { Container } from "inversify";
import { bindAuth } from "./bindings/auth.bindings";
import { bindOrganization } from "./bindings/organization.binding";
import { bindTeam } from "./bindings/team.bindings";
import { bindIncident } from "./bindings/incident.bindings";
import { bindTask } from "./bindings/task.bindings";

const container = new Container();

bindAuth(container);
bindOrganization(container);
bindTeam(container);
bindIncident(container);
bindTask(container);

export default container;