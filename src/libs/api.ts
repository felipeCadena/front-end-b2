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

  if (config.url?.includes("/auth/logout")) {
    console.log("session?.refresh_token", session?.refresh_token);

    config.headers.Authorization = `Bearer ${session?.refresh_token}`;
  } else {
    console.log("session?.access_token", session?.access_token);
    config.headers.Authorization = `Bearer ${session?.access_token}`;
  }
  return config;
});
