import { TokenPayload } from "../../modules/auth/domain/interfaces/ITokenService"; 

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};