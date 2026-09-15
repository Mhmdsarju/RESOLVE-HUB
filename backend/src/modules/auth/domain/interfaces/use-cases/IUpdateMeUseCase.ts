import { User } from "../../entities/User";
import { UpdateMeDto } from "../../../application/dto/updateMe.dto";

export interface IUpdateMeUseCase {
    execute(dto: UpdateMeDto): Promise<User>;
}