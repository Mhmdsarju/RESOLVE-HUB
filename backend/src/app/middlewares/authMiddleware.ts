import { Request, Response, NextFunction } from "express";

import { ITokenService } from "../../modules/auth/domain/interfaces/ITokenService";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

let tokenService: ITokenService;

export function setTokenService(service: ITokenService) {
    tokenService = service;
}

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: "Access token is required",
            });
        }

        const accessToken = authHeader.split(" ")[1];

        const payload = await tokenService.verifyAccessToken(accessToken);

        req.user = payload;

        next();
    } catch {
        return res.status(HttpStatusCode.UNAUTHORIZED).json({
            success: false,
            message: "Invalid or expired access token",
        });
    }
}