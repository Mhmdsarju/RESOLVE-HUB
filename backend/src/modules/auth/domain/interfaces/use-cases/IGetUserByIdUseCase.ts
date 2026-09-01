import { User } from "../../entities/User";

export interface IGetUserByIdUseCase {

    execute(userId: string, organizationId: string,): Promise<User | null>;

}