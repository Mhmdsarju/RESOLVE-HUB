import type { User } from "./auth.types";

export interface RegisterDto {
  organizationName: string;
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  accessToken: string;
}