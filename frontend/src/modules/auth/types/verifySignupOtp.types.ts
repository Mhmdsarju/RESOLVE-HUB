import type { User } from "./auth.types";

export interface VerifySignupOtpDto {
  email: string;
  otp: string;
}

export interface VerifySignupOtpResponse {
  user: User;
  accessToken: string;
}