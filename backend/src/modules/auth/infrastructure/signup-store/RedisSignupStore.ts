import { injectable } from "inversify";
import { redisClient } from "../../../../config/redis";
import {ISignupStore,SignupData,} from "../../domain/interfaces/ISignupStore";
import { config } from "../../../../config/env";
@injectable()
export class RedisSignupStore implements ISignupStore {

    async save(email: string, data: SignupData): Promise<void> {
        await redisClient.set(
            `signup:${email}`,
            JSON.stringify(data),
            {
                EX: config.signupExpiresIn,
            }
        );
    }

    async get(email: string): Promise<SignupData | null> {
        const data = await redisClient.get(`signup:${email}`);

        if (!data) {
            return null;
        }

        return JSON.parse(data) as SignupData;
    }

    async delete(email: string): Promise<void> {
        await redisClient.del(`signup:${email}`);
    }
}