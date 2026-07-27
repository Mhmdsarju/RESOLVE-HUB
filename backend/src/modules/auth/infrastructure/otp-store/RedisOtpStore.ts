import { injectable } from "inversify";
import { redisClient } from "../../../../config/redis";
import { IOtpStore } from "../../domain/interfaces/IOtpStore";
import { config } from "../../../../config/env";

@injectable()
export class RedisOtpStore implements IOtpStore {

  private readonly OTP_PREFIX = "otp:";

  async saveOtp(email: string, otp: string): Promise<void> {
    await redisClient.set(
      `${this.OTP_PREFIX}${email}`,
      otp,
      {
        EX: config.otpExpiresIn,
      }
    );
  }

  async getOtp(email: string): Promise<string | null> {
    return await redisClient.get(
      `${this.OTP_PREFIX}${email}`
    );
  }

  async deleteOtp(email: string): Promise<void> {
    await redisClient.del(
      `${this.OTP_PREFIX}${email}`
    );
  }

}