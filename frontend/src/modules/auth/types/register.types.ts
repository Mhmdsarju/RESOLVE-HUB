
export interface RegisterDto {
  organizationName: string;
  companyDomain: string;
  companySize: string;
  industry: string;

  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}