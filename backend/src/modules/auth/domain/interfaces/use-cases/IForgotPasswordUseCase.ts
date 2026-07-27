import { ForgotPasswordDto } from "../../../application/dto/ForgotPasswordDto";

export interface IForgotPasswordUseCase {
    execute(dto: ForgotPasswordDto): Promise<void>
}