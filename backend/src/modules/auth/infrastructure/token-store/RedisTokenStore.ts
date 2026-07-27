import { injectable } from "inversify";
import { redisClient } from "../../../../config/redis";
import { ITokenStore } from "../../domain/interfaces/ITokenStore";
import { config } from "../../../../config/env";
@injectable()
export class RedisTokenStore implements ITokenStore {

    async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
        await redisClient.set(
            `refresh:${userId}`,
            refreshToken,
            {
                EX: config.refreshTokenTtl,
            }
        );
    }

    async getRefreshToken( userId: string ): Promise<string | null> {
        return await redisClient.get(
            `refresh:${userId}`
        );
    }

    async deleteRefreshToken( userId: string ): Promise<void> {
        await redisClient.del(
            `refresh:${userId}`
        );
    }

}