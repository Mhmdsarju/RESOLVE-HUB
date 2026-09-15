export interface IResetTokenStore {
    saveResetToken(email: string, token: string): Promise<void>;

    getResetToken(email: string): Promise<string | null>;

    deleteResetToken(email: string): Promise<void>;
}