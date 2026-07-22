import { Organization } from "../entities/Organization";
import { User } from "../entities/User";

export interface IAuthRepository {
    findUserByEmail(email: string): Promise<User | null>;

    createOrganization(organization: Organization): Promise<Organization>;

    findOrganizationByName(name: string): Promise<Organization | null>;

    createUser(user: User): Promise<User>;

    updateUserPassword(email: string, password: string): Promise<void>;

}