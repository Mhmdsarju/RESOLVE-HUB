import { Socket } from "socket.io";

import { ITokenService } from "@/modules/auth/domain/interfaces/ITokenService";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

export function createSocketAuthMiddleware(
    tokenService: ITokenService,
) {

    return async (socket: Socket, next: (error?: Error) => void,) => {

        try {

            const token = socket.handshake.auth?.token;

            if (!token) {
                return next(
                    new AppError("Access token is required", HttpStatusCode.UNAUTHORIZED),
                );
            }

            const payload = await tokenService.verifyAccessToken(token);

            socket.data.user = payload;

            next();

        } catch {

            next(
                new AppError("Invalid or expired access token",HttpStatusCode.BAD_REQUEST),
            );

        }

    };
}