import { ResendForgotPasswordOtpDto } from "../../../application/dto/ResendForgotPasswordOtpDto";

export interface IResendForgotPasswordOtpUseCase{
    execute(dto:ResendForgotPasswordOtpDto):Promise<void>
}