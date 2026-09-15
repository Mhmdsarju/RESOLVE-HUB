import { ChangePasswordDto } from "../../../application/dto/ChangePasswordDto";

export interface IChangePasswordUseCase {
    execute(userId: string, dto: ChangePasswordDto): Promise<void>
}