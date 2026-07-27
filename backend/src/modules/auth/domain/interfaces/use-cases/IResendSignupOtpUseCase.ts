import { ResendSignupOtpDto } from "../../../application/dto/ResendSignupOtpDto";

export interface IResendSignupOtpUseCase{
    execute(dto:ResendSignupOtpDto):Promise<void>;
}