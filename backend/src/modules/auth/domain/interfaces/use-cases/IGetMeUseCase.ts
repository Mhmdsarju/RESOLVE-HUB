import { User } from "../../entities/User";

export interface IGetMeUseCase {
  execute(userId: string): Promise<User>;
}