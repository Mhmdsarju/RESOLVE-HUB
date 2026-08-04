import { LoginDto } from "../../../application/dto/LoginDto";
import { UserRole } from "../../enums/UserRole";

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    organizationId: string;
    role: UserRole;
  };
  accessToken: string;
  refreshToken: string;
}

export interface ILoginUseCase {
  execute(dto: LoginDto): Promise<LoginResponse>;
}