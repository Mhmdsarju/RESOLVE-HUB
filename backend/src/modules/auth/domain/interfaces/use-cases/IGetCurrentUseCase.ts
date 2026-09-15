import { GetUserDto } from "../../../application/dto/GetCurrentUserDto";
import { UserRole } from "../../enums/UserRole";
export interface GetCurrentUserResponse {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface IGetCurrentUseCase {
  execute(dto: GetUserDto): Promise<GetCurrentUserResponse>;
}