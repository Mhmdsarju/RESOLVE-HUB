import express from "express";
import cookieParser from "cookie-parser";

// Importin Routes
import { authRoutes } from "../modules/auth/auth.module";
import { organizationRoutes } from "../modules/organization/organization.module";

import { errorHandler } from "./middlewares/errorHandler";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/organizations", organizationRoutes);

app.use(errorHandler);

export default app;