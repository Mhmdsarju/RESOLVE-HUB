import { LogoutDto } from "../../../application/dto/LogoutDto";

export interface ILogoutUsecase{
    execute(dto:LogoutDto):Promise<void>
}