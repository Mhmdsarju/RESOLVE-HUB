import { ResetPasswordDto } from "../../../application/dto/ResetPasswordDto";

export interface IResetPasswordUseCase{
    execute(dto:ResetPasswordDto):Promise<void>
}