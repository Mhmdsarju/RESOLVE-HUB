import { LoginType } from "../../domain/enums/LoginType";

export interface LoginDto {
  email: string;
  password: string;
  loginType: LoginType;
}