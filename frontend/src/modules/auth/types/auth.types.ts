export type UserRole = "SUPER_ADMIN" | "ORG_ADMIN" | "ENGINEER";

export interface User {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;