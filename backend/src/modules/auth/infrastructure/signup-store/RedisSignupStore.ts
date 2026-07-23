import { redisClient } from "../../../../config/redis";

import {
    ISignupStore,
    SignupData,
} from "../../domain/interfaces/ISignupStore";

export class RedisSignupStore implements ISignupStore {
    async save(email: string, data: SignupData): Promise<void> {
        await redisClient.set(
            `signup:${email}`,
            JSON.stringify(data),
            {
                EX: 300,
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