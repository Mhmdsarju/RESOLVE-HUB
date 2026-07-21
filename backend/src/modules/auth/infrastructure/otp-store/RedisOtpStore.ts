import { redisClient } from "../../../../config/redis";
import { IOtpStore } from "../../domain/interfaces/IOtpStore";

export class RedisOtpStore implements IOtpStore {
    
  private readonly OTP_PREFIX = "otp:";
  private readonly OTP_EXPIRY = 300; // 5 minutes

  async saveOtp(email: string, otp: string): Promise<void> {
    await redisClient.set(
      `${this.OTP_PREFIX}${email}`,
      otp,
      {
        EX: this.OTP_EXPIRY,
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