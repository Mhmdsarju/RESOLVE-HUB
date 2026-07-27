import { injectable } from "inversify";
import { redisClient } from "../../../../config/redis";
import { IResetTokenStore } from "../../domain/interfaces/IResetTokenStore";
import { config } from "../../../../config/env";

@injectable()
export class RedisResetTokenStore implements IResetTokenStore {
    
    private readonly RESET_PREFIX = "reset:";

    async saveResetToken(email: string, token: string): Promise<void> {
        await redisClient.set(
            `${this.RESET_PREFIX}${email}`,
            token,
            {
                EX: config.resetTokenTtl,
            }
        );
    }

    async getResetToken(email: string): Promise<string | null> {
        return await redisClient.get(
            `${this.RESET_PREFIX}${email}`
        );
    }

    async deleteResetToken(email: string): Promise<void> {
        await redisClient.del(
            `${this.RESET_PREFIX}${email}`
        );
    }
}