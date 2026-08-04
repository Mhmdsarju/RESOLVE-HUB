import type { SignOptions } from "jsonwebtoken";
import { envSchema } from "./env.schema";

const env = envSchema.parse(process.env);

console.log("Env validated");

export const config = {
  jwtAccessSecret: env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: env.JWT_REFRESH_SECRET,
  jwtResetSecret: env.JWT_RESET_SECRET,
  accessTokenExpiresIn: env.ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
  refreshTokenExpiresIn: env.REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
  resetTokenExpiresIn: env.RESET_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
  refreshCookieMaxAge: Number(env.REFRESH_COOKIE_MAX_AGE),
  otpExpiresIn: Number(env.OTP_EXPIRES_IN),
  signupExpiresIn: Number(env.SIGNUP_EXPIRES_IN),
  refreshTokenTtl: Number(env.REFRESH_TOKEN_TTL),
  resetTokenTtl: Number(env.RESET_TOKEN_TTL),

};