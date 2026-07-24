import { api, ENDPOINTS } from "@/core/api";

import type { ApiResponse } from "@/core/types/api.types";
import type { VerifySignupOtpDto, VerifySignupOtpResponse, } from "../types/verifySignupOtp.types";
import type { ForgotPasswordDto, ForgotPasswordResponse, } from "../types/forgotPassword.types";
import type { VerifyOtpDto, VerifyOtpResponse, } from "../types/verifyOtp.types";
import type { ResetPasswordDto, ResetPasswordResponse, } from "../types/resetPassword.types";

import type { LoginDto, LoginResponse, } from "../types/login.types";
import type { RegisterDto, RegisterResponse, } from "../types/register.types";
import type { RefreshResponse } from "../types/refresh.types";

import type { User } from "../types/auth.types";
import type {  ResendSignupOtpDto,  ResendSignupOtpResponse,} from "../types/resendSignupOtp.types";
import type {  ResendForgotPasswordOtpDto,  ResendForgotPasswordOtpResponse,} from "../types/resendForgotPasswordOtp.types";

export async function login(
  data: LoginDto,
): Promise<LoginResponse> {
  const response = await api.post<ApiResponse<LoginResponse>>(
    ENDPOINTS.AUTH.LOGIN,
    data,
  );

  return response.data.data;
}

export async function register(
  data: RegisterDto,
): Promise<RegisterResponse> {
  const response = await api.post<ApiResponse<null>>(
    ENDPOINTS.AUTH.REGISTER,
    data,
  );

  return {
    message: response.data.message,
  };
}

export async function logout(): Promise<void> {
  await api.post(ENDPOINTS.AUTH.LOGOUT);
}

export async function refresh(): Promise<RefreshResponse> {
  const response = await api.post<ApiResponse<RefreshResponse>>(
    ENDPOINTS.AUTH.REFRESH,
  );

  return response.data.data;
}

export async function verifySignupOtp(
  data: VerifySignupOtpDto,
): Promise<VerifySignupOtpResponse> {
  const response = await api.post<
    ApiResponse<VerifySignupOtpResponse>
  >(
    ENDPOINTS.AUTH.VERIFY_SIGNUP_OTP,
    data,
  );

  return response.data.data;
}

export async function forgotPassword(
  data: ForgotPasswordDto,
): Promise<ForgotPasswordResponse> {
  const response = await api.post<
    ApiResponse<ForgotPasswordResponse>
  >(
    ENDPOINTS.AUTH.FORGOT_PASSWORD,
    data,
  );

  return response.data.data;
}

export async function verifyOtp(
  data: VerifyOtpDto,
): Promise<VerifyOtpResponse> {
  const response =
    await api.post<ApiResponse<VerifyOtpResponse>>(
      ENDPOINTS.AUTH.VERIFY_OTP,
      data,
    );

  return response.data.data;
}

export async function resetPassword(
  data: ResetPasswordDto,
): Promise<ResetPasswordResponse> {
  const response =
    await api.post<
      ApiResponse<ResetPasswordResponse>
    >(
      ENDPOINTS.AUTH.RESET_PASSWORD,
      data,
    );

  return response.data.data;
}

export async function me(): Promise<User> {
  const response =
    await api.get<ApiResponse<User>>(
      ENDPOINTS.AUTH.ME,
    );

  return response.data.data;
}

export async function resendSignupOtp(
  data: ResendSignupOtpDto,
): Promise<ResendSignupOtpResponse> {
  const response =
    await api.post<ApiResponse<null>>(
      ENDPOINTS.AUTH.RESEND_SIGNUP_OTP,
      data,
    );

  return {
    message: response.data.message,
  };
}

export async function resendForgotPasswordOtp(
  data: ResendForgotPasswordOtpDto,
): Promise<ResendForgotPasswordOtpResponse> {
  const response =
    await api.post<ApiResponse<null>>(
      ENDPOINTS.AUTH.RESEND_FORGOT_PASSWORD_OTP,
      data,
    );

  return {
    message: response.data.message,
  };
}