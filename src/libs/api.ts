import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getSession, signIn } from "next-auth/react";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (!session?.user.accessToken) return config;

  // Se for rota de logout, usa refresh_token
  if (config.url?.includes("/auth/logout")) {
    if (session?.user.refreshToken) {
      config.headers.Authorization = `Bearer ${session?.user.refreshToken}`;
    }
  } else {
    const isSessionExpired = Date.now() > new Date(session.expires).getTime();

    if (isSessionExpired) {
      try {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${session?.user.refreshToken}`,
            },
          }
        );

        const { access_token, refresh_token } = refreshResponse.data;

        // Atualiza a sessão do NextAuth
        await signIn("credentials", {
          redirect: false,
          accessToken: access_token,
          refreshToken: refresh_token,
        });

        config.headers.Authorization = `Bearer ${access_token}`;
      } catch (error) {
        console.error("Erro ao renovar token:", error);
      }
    } else {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
  }

  return config;
});
