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

export const storage = {
  setTokens: (response: TokenResponse) => {
    document.cookie = `@auth=${JSON.stringify(response)}; path=/; max-age=${response.expires_in}; samesite=lax`;
  },

  getTokens: () => {
    try {
      const cookie = document.cookie
        .split(";")
        .find((c) => c.trim().startsWith("@auth="));

      if (!cookie) return null;

      const value = cookie.split("=")[1];
      return JSON.parse(decodeURIComponent(value)) as TokenResponse;
    } catch {
      return null;
    }
  },

  clear: () => {
    document.cookie = "@auth=; path=/; max-age=0";
  },
};

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<TokenResponse>("/auth/login", credentials);
    storage.setTokens(response.data);
    return response.data;
  },

  loginWithSocialNetwork: async (token: string, social: string) => {
    const response = await api.post<TokenResponse>(`/auth/login${social}`, {
      token,
    });
    storage.setTokens(response.data);
    return response.data;
  },

  forgotPassword: async (email: string) => {
    await api.post("/auth/request/reset-password", { email });
  },

  resetPassword: async (password: string, refreshToken: string) => {
    await api.post(`/auth/reset-password${refreshToken}`, { password });
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
