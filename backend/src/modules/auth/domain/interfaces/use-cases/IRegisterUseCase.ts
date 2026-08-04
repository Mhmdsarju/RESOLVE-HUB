import { RegisterDto } from "../../../application/dto/RegisterDto";

export interface IRegisterUseCase{
    execute(dto:RegisterDto):Promise<{message:string}>
}