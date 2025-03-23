import { api } from "@/libs/api";

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  internalRole: string;
  permissions: Array<{
    nome: string;
    title: string;
    permissions: Record<string, string[]>;
  }>;
  iat: number;
  exp: number;
}

export const storage = {
  setTokens: (response: TokenResponse) => {
    // Salva todo o objeto de autenticação
    localStorage.setItem("@auth", JSON.stringify(response));
  },

  getTokens: () => {
    const auth = localStorage.getItem("@auth");
    if (!auth) return null;

    return JSON.parse(auth) as TokenResponse;
  },

  isTokenExpired: () => {
    const auth = storage.getTokens();
    if (!auth) return true;

    const decodedToken = JSON.parse(
      atob(auth.access_token.split(".")[1])
    ) as DecodedToken;
    return Date.now() >= decodedToken.exp * 1000;
  },

  clear: () => {
    localStorage.removeItem("@auth");
  },
};

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<TokenResponse>("/auth/login", credentials);
    storage.setTokens(response.data);
    return response.data;
  },

  refresh: async () => {
    const auth = storage.getTokens();
    if (!auth?.refresh_token) throw new Error("No refresh token available");

    const response = await api.post<TokenResponse>("/auth/refresh", {
      refresh_token: auth.refresh_token,
    });

    storage.setTokens(response.data);
    return response.data;
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      storage.clear();
    }
  },
};
