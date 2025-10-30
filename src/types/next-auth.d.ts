import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email: string;
      accessToken: string;
      refreshToken: string;
      role: string;
      id: string;
      defaultPath: string;
      expiresIn: number;
      expiresAt: number;
      partner?: {
        id: number;
        fantasyName: string;
        isActive: boolean;
      };
    };
    error?: string;
  }

  interface User {
    name?: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    role: string;
    id: string;
    defaultPath: string;
    expiresIn: number;
    expiresAt: number;
    partner?: {
      id: number;
      fantasyName: string;
      isActive: boolean;
    };
    error?: string;
  }

  interface Token {
    name?: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    role: string;
    id: string;
    defaultPath: string;
    expiresIn: number;
    expiresAt: number;
    partner?: {
      id: number;
      fantasyName: string;
      isActive: boolean;
    };
    error?: string;
  }
}
