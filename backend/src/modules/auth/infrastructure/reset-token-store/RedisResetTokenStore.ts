import { redisClient } from "../../../../config/redis";
import { IResetTokenStore } from "../../domain/interfaces/IResetTokenStore";

export class RedisResetTokenStore implements IResetTokenStore {
    private readonly RESET_PREFIX = "reset:";
    private readonly RESET_EXPIRY = 600; // 10 minutes

    async saveResetToken(email: string, token: string): Promise<void> {
        await redisClient.set(
            `${this.RESET_PREFIX}${email}`,
            token,
            {
                EX: this.RESET_EXPIRY,
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