import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  authModule, organizationModule, teamModule,
  incidentModule, taskModule, integrationModule, monitoringModule,
  alertModule,alertRoutingRule,alertRuleModule,fileModule
} from "../config/inversify.config";

import { errorHandler } from "./middlewares/errorHandler";
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    exposedHeaders: ["Content-Disposition"],
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authModule.authRouter);
app.use("/api/organizations", organizationModule.organizationRouter);
app.use("/api/teams", teamModule.teamRouter);
app.use("/api", teamModule.teamInvitationRouter);
app.use("/api/teams", teamModule.teamMemberRouter);
app.use("/api/incidents", incidentModule.incidentRouter);
app.use("/api/tasks", taskModule.taskRouter);
app.use("/api/monitoring-projects", monitoringModule.monitoringProjectRouter);
app.use("/api/monitoring-projects", integrationModule.integrationRouter);
app.use("/api/monitoring-projects", alertRuleModule.alertRuleRouter);
app.use("/api", alertModule.alertRouter);
app.use("/api/alert-routing-rules", alertRoutingRule.alertRoutingRuleRouter);
app.use("/api/users", authModule.userRouter);
app.use("/api/admin/organizations", organizationModule.superAdminorganizationRouter,);
app.use("/api",fileModule.fileRouter)

app.use(errorHandler);

export default app;