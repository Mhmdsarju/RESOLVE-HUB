import { Request, Response, NextFunction } from "express";

import { IOrganizationRepository } from "@/modules/organization/domain/repositories/IOrganizationRepository";
import { OrganizationAccessStatus } from "@/modules/organization/domain/enums/organizationAccessStatus.enum";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

let organizationRepository: IOrganizationRepository;

export function setOrganizationRepository(repository: IOrganizationRepository,) {
    organizationRepository = repository;
}

export async function organizationAccessMiddleware(req: Request, res: Response, next: NextFunction,) {
    try {
        console.log("ORGANIZATION ACCESS MIDDLEWARE:", req.method, req.originalUrl);
console.log("USER:", req.user);
        if (req.user?.role === "SUPER_ADMIN") {
            return next();
        }

        const organizationId = req.user?.organizationId;

        if (!organizationId) {
            return res.status(HttpStatusCode.FORBIDDEN).json({
                success: false,
                message: "Organization access is required",
            });
        }

        const organization = await organizationRepository.findById(
            organizationId,
        );

        if (!organization) {
            return res.status(HttpStatusCode.NOT_FOUND).json({
                success: false,
                message: "Organization not found",
            });
        }

        if (organization.accessStatus === OrganizationAccessStatus.FROZEN) {
            return res.status(HttpStatusCode.FORBIDDEN).json({
                success: false,
                message: "Organization access is frozen. Please renew your subscription.",
            });
        }

        next();
    } catch {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to verify organization access",
        });
    }
}