export interface IEmailService {
  sendSignupOtp(email: string, otp: string): Promise<void>;

  sendForgotPasswordOtp(email: string, otp: string): Promise<void>;

  sendTeamInvitationEmail(email:string,inviteLink:string):Promise<void>;

}