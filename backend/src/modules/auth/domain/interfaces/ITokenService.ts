import { UserRole } from "../enums/UserRole";

export interface TokenPayload {
  userId: string;
  organizationId: string;
  role: UserRole;
}

export interface ITokenService {
  generateAccessToken( payload: TokenPayload ): Promise<string>;

  generateRefreshToken( payload: TokenPayload ): Promise<string>;

  verifyRefreshToken(token:string):Promise<TokenPayload>

  verifyAccessToken(token: string): Promise<TokenPayload>;


}