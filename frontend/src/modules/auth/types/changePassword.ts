export interface ChangePasswordDto{
    currentPassword:string;
    newPassword:string;
}

export interface ChangePasswordResponse {
    message:string;
}