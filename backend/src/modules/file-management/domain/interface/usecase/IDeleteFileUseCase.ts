export interface IDeleteFileUseCase {
    execute(id: string): Promise<void>;
}