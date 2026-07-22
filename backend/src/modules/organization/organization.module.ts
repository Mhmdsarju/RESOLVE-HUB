// Dependency Injection

import { OrganizationController } from "./presentation/controllers/OrganizationController";
import { createOrganizationRoutes } from "./presentation/routes/organization.routes";

import { GetOrganizationProfileUseCase } from "./application/use-cases/GetOrganizationProfileUseCase";

import { PrismaOrganizationRepository } from "./infrastructure/repositories/PrismaOrganizationRepository";

// Infrastructure
const organizationRepository = new PrismaOrganizationRepository();

// Use Cases
const getOrganizationProfileUseCase =
  new GetOrganizationProfileUseCase(organizationRepository);

// Controllers
const organizationController = new OrganizationController(
  getOrganizationProfileUseCase
);

// Routes
export const organizationRoutes =
  createOrganizationRoutes(organizationController);