import { IBaseRepository } from "../../../../shared/base/repositories/IBaseRepository";
import { User } from "../entities/User";

export interface IUserRepository extends IBaseRepository<User> {

    findByEmail(email: string): Promise<User | null>;
    findUsersByOrganizationId(organizationId: string,): Promise<User[]>;
    findOrganizationAdminByOrganizationId(organizationId: string,): Promise<User | null>;
    updatePassword(email: string, password: string): Promise<void>;

}