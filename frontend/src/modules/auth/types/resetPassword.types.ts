export interface ResetPasswordDto {
  email: string;
  resetToken: string;
  password: string;
}

export interface ResetPasswordResponse {
  message: string;
}