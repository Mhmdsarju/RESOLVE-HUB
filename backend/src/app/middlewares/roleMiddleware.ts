import { Request, Response, NextFunction } from "express";

import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { ErrorMessages } from "@/shared/constant/ErrorMessages";

export function roleMiddleware(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: ErrorMessages.UNAUTHORIZED,
            });
        }

        if (!allowedRoles.includes(user.role)) {
            return res.status(HttpStatusCode.FORBIDDEN).json({
                success: false,
                message: ErrorMessages.FORBIDDEN,
            });
        }

        next();
    };
}