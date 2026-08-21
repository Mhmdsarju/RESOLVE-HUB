export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfilePayload {
  name: string;
}