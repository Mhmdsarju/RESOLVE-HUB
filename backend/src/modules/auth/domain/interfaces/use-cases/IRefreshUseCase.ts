import { RefreshDto } from "../../../application/dto/RefreshDto";

export interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IRefreshUseCase {
    execute(dto: RefreshDto): Promise<RefreshResponse>;
}