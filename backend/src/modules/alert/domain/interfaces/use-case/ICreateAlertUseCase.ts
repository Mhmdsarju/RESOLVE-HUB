import { CreateAlertDTO } from "../../../application/dto/createAlertDto";
import { Alert } from "../../entities/alert.entity";

export interface ICreateAlertUseCase {
  execute(dto: CreateAlertDTO): Promise<Alert>;
}