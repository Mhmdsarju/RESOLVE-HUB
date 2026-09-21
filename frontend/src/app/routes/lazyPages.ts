import { lazy } from "react";

export const LandingPage = lazy(() => import("@/modules/landing/pages/LandingPage"));
export const OrganizationRegisterPage = lazy(() => import("@/modules/auth/pages/OrganizationRegisterPage"));
export const VerifySignupOtpPage = lazy(() => import("@/modules/auth/pages/VerifySignupOtpPage"));
export const OrganizationLoginPage = lazy(() => import("@/modules/auth/pages/OrganizationLoginPage"));
export const UserLoginPage = lazy(() => import("@/modules/auth/pages/UserLoginPage"));
export const ForgotPasswordPage = lazy(() => import("@/modules/auth/pages/ForgotPasswordPage"));
export const VerifyOtpPage = lazy(() => import("@/modules/auth/pages/VerifyOtpPage"));
export const ResetPasswordPage = lazy(() => import("@/modules/auth/pages/ResetPasswordPage"));
export const NotFoundPage = lazy(() => import("@/pages/NotFound"));
export const AcceptInvitationPage = lazy(() => import("@/modules/team-invitation/pages/AcceptInvitationPage"));
export const TermsAndConditionsPage = lazy(() => import("@/pages/TermsAndConditionsPage"));
export const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));

// org-admin components
export const DashboardPage = lazy(() => import("@/modules/dashboard/pages/DashboardPage"));
export const OrganizationSettingsPage = lazy(() => import("@/modules/organization/pages/OrganizationSettingsPage"));
export const CompleteOrganizationProfile = lazy(() => import("@/modules/organization/pages/CompleteOrganizationProfile"));

export const TeamListPage = lazy(() => import("@/modules/team/pages/TeamListPage"));
export const TeamDetailsPage = lazy(() => import("@/modules/team/pages/TeamDetailsPage"));
export const TeamInvitationPage = lazy(() => import("@/modules/team-invitation/pages/TeamInvitationPage"));

export const IncidentListPage = lazy(() => import("@/modules/incident/pages/IncidentListPage"));
export const IncidentDetailsPage = lazy(() => import("@/modules/incident/pages/IncidentDetailsPage"));

export const MonitoringProjectsPage = lazy(() => import("@/modules/monitoring/pages/MonitoringProjectsPage"));
export const MonitoringProjectDetailsPage = lazy(() => import("@/modules/monitoring/pages/MonitoringProjectDetailsPage"));

export const IntegrationDetailsPage = lazy(() => import("@/modules/integration/pages/IntegrationDetailsPage"));

export const AlertDetailsPage = lazy(() => import("@/modules/alert/pages/AlertDetailsPage"));

export const AlertRuleListPage = lazy(() => import("@/modules/alertRule/pages/AlertRuleListPage"));
export const AlertRuleDetailsPage = lazy(() => import("@/modules/alertRule/pages/AlertRuleDetailsPage"));

export const AlertRoutingRuleListPage = lazy(() => import("@/modules/alertRouting/pages/AlertRoutingRuleListPage"));
export const AlertRoutingRuleDetailsPage = lazy(() => import("@/modules/alertRouting/pages/AlertRoutingRuleDetailsPage"));

export const WarRoomListPage = lazy(() => import("@/modules/war-room/pages/WarRoomListPage"));
export const WarRoomDetailsPage = lazy(() => import("@/modules/war-room/pages/WarRoomDetailsPage"));

export const AuditLogPage = lazy(() => import("@/modules/audit/pages/AuditLogPage"));

export const SubscriptionPage = lazy(() => import("@/modules/subscription/pages/SubscriptionPage"));
export const PrometheusSetupGuidePage = lazy(() => import("@/modules/integration/components/PrometheusSetupGuidePage"));
export const ResolveAgentSetupGuidePage = lazy(() => import("@/modules/integration/components/ResolveAgentSetupGuidePage"));

// engineer

export const EngineerTasksPage = lazy(() => import("@/modules/task-management/pages/EngineerTasksPage"));
export const SettingsPage = lazy(() => import("@/modules/user/pages/SettingsPage"));
export const TaskDetailsPage = lazy(() => import("@/modules/task-management/pages/TaskDetailsPage"));
export const EngineerWarRoomListPage = lazy(() => import("@/modules/war-room/pages/EngineerWarRoomListPage"));
export const EngineerWarRoomDetailsPage = lazy(() => import("@/modules/war-room/pages/EngineerWarRoomDetailsPage"));

//super-admin

export const OrganizationVerificationListPage = lazy(() => import("@/modules/organization/pages/admin/OrganizationVerificationListPage"));
export const OrganizationVerificationReviewPage = lazy(() => import("@/modules/organization/pages/admin/OrganizationVerificationReviewPage"));
export const PlanPage = lazy(() => import("@/modules/plan/pages/PlansPage"));
export const SuperAdminOrganizationManagement = lazy(() => import("@/modules/organization/components/SuperAdminOrganizationManagement"));
export const SuperAdminRevenueAnalyticsPage = lazy(() => import("@/modules/organization/pages/SuperAdminRevenueAnalyticsPage"));
export const SuperAdminPaymentHistoryPage = lazy(() => import("@/modules/organization/pages/SuperAdminPaymentHistoryPage"));

export const OrgAdminPaymentHistoryPage = lazy(() => import("@/modules/organization/components/OrgAdminPaymentHistory")
);