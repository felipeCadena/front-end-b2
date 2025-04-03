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
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }

  return config;
});
