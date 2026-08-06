import { Container } from "inversify";
import { bindAuth } from "./bindings/auth.bindings";
import { bindOrganization } from "./bindings/organization.binding";
import { bindTeam } from "./bindings/team.bindings";


const container = new Container();

bindAuth(container);
bindOrganization(container);
bindTeam(container);

export default container;