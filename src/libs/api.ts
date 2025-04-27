import { authService } from "@/services/api/auth";
import axios from "axios";
import { getSession, signIn } from "next-auth/react";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const session = await authService.getTokens();
  if (!session) {
    return config;
  }

  // const now = Date.now();

  // if (now > session.expiresAt && session?.refresh_token) {
  //   try {
  //     const dataAuth = await authService.refreshToken(session?.refresh_token);

  //     if (dataAuth?.access_token) {
  //       const newExpiresAt = Date.now() + dataAuth.expires_in * 1000;

  //       await signIn("credentials", {
  //         accessToken: dataAuth.access_token,
  //         refreshToken: dataAuth.refresh_token,
  //         expiresAt: newExpiresAt,
  //         redirect: false,
  //       });
  //     }
  //   } catch (err) {
  //     console.error("Erro ao renovar token:", (err as any)?.response?.data);
  //     // console.error("Erro ao renovar token");
  //   }
  // }

  // const newSession = await authService.getTokens();
  // Se for rota de logout ou refresh, usa refresh_token
  if (config.url?.includes("/auth/logout")) {
    config.headers.Authorization = `Bearer ${session?.refresh_token}`;
  } else {
    config.headers.Authorization = `Bearer ${session?.access_token}`;
  }
  return config;
});
