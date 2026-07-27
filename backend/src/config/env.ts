import type { SignOptions } from "jsonwebtoken";

export const config = {

  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
  resetTokenExpiresIn: process.env.RESET_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
  refreshCookieMaxAge: Number(process.env.REFRESH_COOKIE_MAX_AGE),
  otpExpiresIn: Number(process.env.OTP_EXPIRES_IN),
  signupExpiresIn: Number(process.env.SIGNUP_EXPIRES_IN),
  refreshTokenTtl: Number(process.env.REFRESH_TOKEN_TTL),
  resetTokenTtl: Number(process.env.RESET_TOKEN_TTL),

};