import { VerifyOtpDto } from "../../../application/dto/VerifyOtpDto";

export interface IVerifyOtpUseCase{
    execute(dto:VerifyOtpDto):Promise<{resetToken:string}>
}