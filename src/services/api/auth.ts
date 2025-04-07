import { api } from "@/libs/api";
import { getSession, signIn, signOut } from "next-auth/react";

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  role?: string;
  id?: string;
}

interface LoginCredentials {
  email: string | undefined;
  password: string | undefined;
}

export const authService = {
  // Login com email/senha
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await api.post<TokenResponse>(
        "/auth/login",
        credentials
      );

      return response.data;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  },

  // Login com redes sociais
  loginWithSocialNetwork: async (token: string, social: string) => {
    try {
      const response = await api.post<TokenResponse>(`/auth/login/${social}`, {
        token,
      });

      if (!response) {
        console.error("Erro:", response);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error("Erro no login:", error);
      return null;
    }
  },

  // Recuperação de senha
  forgotPassword: async (email: string) => {
    await api.post("/auth/request/reset-password", { email });
  },

  // Reset de senha
  resetPassword: async (password: string, refreshToken: string) => {
    await api.post(`/auth/reset-password/${refreshToken}`, { password });
  },

  // Refresh do token
  refreshToken: async (): Promise<TokenResponse> => {
    try {
      const response = await api.post<TokenResponse>("/auth/refresh");

      return response.data;
    } catch (error) {
      console.error("Erro no refresh");
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      // Limpa a sessão do NextAuth
      await signOut({ redirect: false });
    }
  },

  // Verifica se está autenticado
  isAuthenticated: async () => {
    const session = await getSession();
    return !!session;
  },

  // Pega os tokens da sessão
  getTokens: async () => {
    const session = await getSession();
    if (!session?.user) return null;

    return {
      access_token: session.user.accessToken,
      refresh_token: session.user.refreshToken,
    };
  },
};
