import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email: string;
      image?: string;
      accessToken: string;
      refreshToken: string;
      role: string;
      id: string;
      defaultPath: string;
      expiresIn: number;
      expiresAt: number;
    };
  }

  interface User {
    name?: string;
    email: string;
    image?: string;
    accessToken: string;
    refreshToken: string;
    role: string;
    id: string;
    defaultPath: string;
    expiresIn: number;
    expiresAt: number;
  }

  interface Token {
    name?: string;
    email: string;
    image?: string;
    accessToken: string;
    refreshToken: string;
    role: string;
    id: string;
    defaultPath: string;
    expiresIn: number;
    expiresAt: number;
  }
}
