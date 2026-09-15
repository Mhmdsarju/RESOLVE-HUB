import { UserRole } from "../enums/UserRole";

export interface TokenPayload {
  userId: string;
  organizationId: string|null;
  role: UserRole;
}

export interface ITokenService {
  generateAccessToken(payload: TokenPayload): Promise<string>;
  generateRefreshToken(payload: TokenPayload): Promise<string>;
  generateResetToken(email: string): Promise<string>;
  verifyAccessToken(token: string): Promise<TokenPayload>;
  verifyRefreshToken(token: string): Promise<TokenPayload>;
  verifyResetToken(token: string): Promise<{ email: string }>;
}