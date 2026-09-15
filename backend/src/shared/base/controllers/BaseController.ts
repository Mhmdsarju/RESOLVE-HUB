import { ErrorMessages } from "@/shared/constant/ErrorMessages";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { AppError } from "@/shared/errors/AppError";
import { Request } from "express";

import { TokenPayload } from "@/modules/auth/domain/interfaces/ITokenService";

export abstract class BaseController {
    protected getCurrentUser(req:Request):TokenPayload{
        if(!req.user){
            throw new AppError(ErrorMessages.UNAUTHORIZED,HttpStatusCode.UNAUTHORIZED);
        }
        return req.user;
    }
}