import { createBrowserRouter } from "react-router-dom";

import { publicRoutes } from "./routes/public.routes";
import { superAdminRoutes } from "./routes/super-admin.routes";
import { orgAdminRoutes } from "./routes/org-admin.routes";
import { engineerRoutes } from "./routes/engineer.routes";

export const router = createBrowserRouter([
  ...publicRoutes,
  ...superAdminRoutes,
  ...orgAdminRoutes,
  ...engineerRoutes,
]);