export interface SignupData {
  organizationName: string;
  industry: string;
  companySize: string;
  name: string;
  email: string;
  password: string;
}

export interface ISignupStore {
  save(email: string, data: SignupData): Promise<void>;

  get(email: string): Promise<SignupData | null>;

  delete(email: string): Promise<void>;
}