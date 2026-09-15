import { TokenPayload } from "../../modules/auth/domain/interfaces/ITokenService";

declare module "express-serve-static-core" {
  interface Request {
    user?: TokenPayload;
  }
}

export {};