import axios from 'axios';
import { getSession } from 'next-auth/react';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (!session?.user.accessToken) return config;

  // Se for rota de logout ou refresh, usa refresh_token
  if (config.url?.includes('/auth/logout')) {
    config.headers.Authorization = `Bearer ${session?.user.refreshToken}`;
  } else {
    config.headers.Authorization = `Bearer ${session?.user.accessToken}`;
  }

  return config;
});
