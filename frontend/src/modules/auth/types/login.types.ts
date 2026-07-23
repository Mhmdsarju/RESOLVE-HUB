import type { User } from "./auth.types";

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}