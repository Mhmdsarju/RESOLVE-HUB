import jwt from "jsonwebtoken";
import { TokenPayload, ITokenService, } from "../../domain/interfaces/ITokenService";
import { injectable } from "inversify";
import { config } from "../../../../config/env";

@injectable()
export class JwtTokenService implements ITokenService {

  async generateAccessToken(payload: TokenPayload): Promise<string> {
    return jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET!,
      {
        expiresIn: config.accessTokenExpiresIn,
      }
    );
  }

  async generateRefreshToken(payload: TokenPayload): Promise<string> {
    return jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: config.refreshTokenExpiresIn,
      }
    );
  }

  async verifyRefreshToken(token: string): Promise<TokenPayload> {
    const payload = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!
    ) as TokenPayload;

    return payload;
  }

  async verifyAccessToken(token: string): Promise<TokenPayload> {

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as TokenPayload;
    return payload;
  }

  async generateResetToken(email: string): Promise<string> {
    return jwt.sign(
      { email },
      process.env.JWT_RESET_SECRET!,
      {
        expiresIn: config.resetTokenExpiresIn,
      }
    );
  }

  async verifyResetToken(token: string): Promise<{ email: string }> {

    const payload = jwt.verify(token, process.env.JWT_RESET_SECRET!) as { email: string };

    return payload;

  }

}