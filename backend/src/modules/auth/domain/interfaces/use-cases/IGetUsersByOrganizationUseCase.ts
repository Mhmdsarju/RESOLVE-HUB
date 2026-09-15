import { User } from "../../entities/User";

export interface IGetUsersByOrganizationUseCase {
  execute(organizationId: string): Promise<User[]>;
}