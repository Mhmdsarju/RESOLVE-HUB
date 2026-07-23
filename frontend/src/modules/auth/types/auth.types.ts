export interface User {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "ORG_ADMIN" | "ENGINEER";
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;