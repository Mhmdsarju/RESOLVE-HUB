import type { User } from "./auth.types";

export type LoginType = "organization" | "user";

export interface LoginDto {
  email: string;
  password: string;
  loginType: LoginType;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}