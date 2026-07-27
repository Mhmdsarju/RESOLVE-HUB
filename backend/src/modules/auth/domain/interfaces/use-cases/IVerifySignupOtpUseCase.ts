import { VerifySignupOtpDto } from "../../../application/dto/VerifySignupOtpDto";
import { UserRole } from "../../enums/UserRole";

export interface VerifySignupOtpResponse {

    user: {
        id: string;
        name: string;
        email: string;
        organizationId: string;
        role: UserRole;
    };
    accessToken: string;
    refreshToken: string;

}

export interface IVerifySignupOtpUseCase {
    execute(dto: VerifySignupOtpDto): Promise<VerifySignupOtpResponse>
}