// Dependency Injection

import { OrganizationController } from "./presentation/controllers/OrganizationController";
import { createOrganizationRoutes } from "./presentation/routes/organization.routes";

import { GetOrganizationProfileUseCase } from "./application/use-cases/GetOrganizationProfileUseCase";
import { UpdateOrganizationUseCase } from "./application/use-cases/UpdateOrganizationUseCase";

import { PrismaOrganizationRepository } from "./infrastructure/repositories/PrismaOrganizationRepository";

// Infrastructure
const organizationRepository = new PrismaOrganizationRepository();

// Use Cases
const getOrganizationProfileUseCase = new GetOrganizationProfileUseCase(organizationRepository);
const UpdateOrganizationProfileUseCase = new UpdateOrganizationUseCase(organizationRepository);

// Controllers
const organizationController = new OrganizationController(
  getOrganizationProfileUseCase,
  UpdateOrganizationProfileUseCase
);

// Routes
export const organizationRoutes = createOrganizationRoutes(organizationController);