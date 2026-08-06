import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import  authRoutes  from "../modules/auth/presentation/routes/auth.routes";
import  organizationRoutes from "../modules/organization/presentation/routes/organization.routes"
import teamRoutes from "@/modules/team-management/presentation/routes/team.routes";


import { errorHandler } from "./middlewares/errorHandler";
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/teams",teamRoutes);

app.use(errorHandler);

export default app;