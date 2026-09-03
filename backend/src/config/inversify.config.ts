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
import { bindTimelineEvent } from "./bindings/timeline.bindings";
import { bindAuditLog } from "./bindings/auditLog.bindings";
import { bindNotification } from "./bindings/notification.bindings";
import { KafkaManager } from "@/infrastructure/kafka/kafka.manager";
import { IOrganizationEmailService } from "@/modules/organization/domain/interfaces/IOrganizationEmailService";
import { TYPES } from "./types";
import { bindPlan } from "./bindings/plan.bindings";
import { bindSubscription } from "./bindings/subscription.bindings";
import { SubscriptionScheduler } from "@/infrastructure/scheduler/subscription.scheduler";
import { bindPayment } from "./bindings/payment.bindings";


const container = new Container();

bindCore(container);

export const auditLogModule = bindAuditLog(container);
export const notificationModule = bindNotification(container);
export const authModule = bindAuth(container, auditLogModule.createAuditLogUseCase);

const organizationEmailService = container.get<IOrganizationEmailService>(
    TYPES.OrganizationEmailService
);

export const kafkaManager = new KafkaManager(
    authModule.userRepository,
    notificationModule.createNotificationUseCase,
    organizationEmailService
)

export const subscriptionModule = bindSubscription(
    container,
    kafkaManager,
);

export const organizationModule = bindOrganization(container, auditLogModule.createAuditLogUseCase, kafkaManager,subscriptionModule.createFreeSubscriptionUseCase);

export const timelineEventModulde = bindTimelineEvent(container);

export const teamModule = bindTeam(container, auditLogModule.createAuditLogUseCase, notificationModule.createNotificationUseCase);

export const warRoomModule = bindWarRoom(container, timelineEventModulde.createTimelineEventUseCase);

export const incidentModule = bindIncident(
    container, timelineEventModulde.
    createTimelineEventUseCase, warRoomModule.createWarRoomUseCase, notificationModule.createNotificationUseCase);

export const taskModule = bindTask(
    container,
    timelineEventModulde.createTimelineEventUseCase,
    notificationModule.createNotificationUseCase,
    kafkaManager
);

export const monitoringModule = bindMonitoring(container);
export const integrationModule = bindIntegration(container);

export const alertRuleModule = bindAlertRule(container);
export const alertRoutingRule = bindAlertRoutingRule(container);

export const alertModule = bindAlert(container,
    alertRoutingRule.routeAlertUseCase, incidentModule.createIncidentUseCase, taskModule.createTaskUseCase);

export const fileModule = bindFile(container, timelineEventModulde.createTimelineEventUseCase);
export const planModule = bindPlan(container);



export const subscriptionScheduler = new SubscriptionScheduler(
    subscriptionModule.sendSubscriptionReminderUseCase,
    subscriptionModule.processSubscriptionExpiryUseCase
);

export const paymentModule = bindPayment(container,);


export default container;