import { type NextAuthOptions, type User } from "next-auth";
import { addSeconds, isAfter, parseISO } from "date-fns";

import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { authService } from "@/services/api/auth";
import { jwtDecode } from "jwt-decode";
import { DEFAULT_ROLE_PATHS } from "@/utils/paths";
import { signOut } from "next-auth/react";

declare module "next-auth" {
  interface User {
    expiresIn?: number;
  }
}

type SessionCallback = {
  session: any;
  token: any;
};

type JWTCallback = {
  user: any;
  token: any;
};

type SignCallback = {
  user: any;
  account: any;
};

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  image?: string;
  role: string;
  iat: number;
  exp: number;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      name: "google",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      name: "facebook",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const response = await authService.login(credentials);

          if (!response?.access_token) {
            signOut();

            return null;
          }

          // Decodifica o token para obter os dados do usuário
          const decodedToken = jwtDecode<DecodedToken>(response.access_token);

          // Calcula o timestamp exato de expiração
          const expiresAt = Date.now() + response.expires_in * 1000;

          // Retorna o usuário no formato esperado pelo NextAuth
          return {
            id: decodedToken.id,
            email: decodedToken.email,
            name: decodedToken.name,
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
            role: decodedToken.role,
            expiresIn: response.expires_in,
            expiresAt,
            defaultPath:
              DEFAULT_ROLE_PATHS[
                decodedToken?.role.toLowerCase() as keyof typeof DEFAULT_ROLE_PATHS
              ],
          };
        } catch (error) {
          console.error("Erro no login:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: SignCallback) {
      try {
        // Se for login social
        if (account?.provider === "google") {
          if (!account?.id_token) return false;

          const response = await authService.loginWithSocialNetwork(
            account.id_token,
            account.provider
          );

          if (!response) return false;

          const decodedToken = jwtDecode<DecodedToken>(response.access_token);

          // Calcula o timestamp exato de expiração
          const expiresAt = Date.now() + response.expires_in * 1000;

          (user.email = decodedToken.email),
            (user.name = decodedToken.name),
            (user.accessToken = response.access_token),
            (user.refreshToken = response.refresh_token),
            (user.role = decodedToken.role);
          user.expiresIn = response.expires_in;
          user.expiresAt = expiresAt;
          user.image = decodedToken.image;
          user.defaultPath =
            DEFAULT_ROLE_PATHS[
              decodedToken?.role.toLowerCase() as keyof typeof DEFAULT_ROLE_PATHS
            ];
        }

        if (account?.provider === "facebook") {
          if (!account?.access_token) return false;

          const response = await authService.loginWithSocialNetwork(
            account.access_token,
            account.provider
          );

          if (!response) return false;

          const decodedToken = jwtDecode<DecodedToken>(response.access_token);

          // Calcula o timestamp exato de expiração
          const expiresAt = Date.now() + response.expires_in * 1000;

          (user.email = decodedToken.email),
            (user.name = decodedToken.name),
            (user.accessToken = response.access_token),
            (user.refreshToken = response.refresh_token),
            (user.role = decodedToken.role);
          user.expiresIn = response.expires_in;
          user.expiresAt = expiresAt;
          user.image = decodedToken.image;
          user.defaultPath =
            DEFAULT_ROLE_PATHS[
              decodedToken?.role.toLowerCase() as keyof typeof DEFAULT_ROLE_PATHS
            ];
        }

        return true;
      } catch (error) {
        console.error("Erro no login por rede social:", error);
        return false;
      }
    },
    async jwt({ token, user }: JWTCallback) {
      // Quando fizer login, adiciona os dados ao token
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresIn = user.expiresIn;
        token.role = user.role;
        token.id = user.id;
        token.email = user.email;
        token.defaultPath = user.defaultPath;
        token.image = user.image ?? "";
        token.expiresAt = user.expiresAt;

        return token;
      }

      const now = Date.now();

      if (now > token.expiresAt) {
        try {
          const dataAuth = await authService.refreshToken(token?.refreshToken);

          if (dataAuth?.access_token) {
            const newExpiresAt = Date.now() + dataAuth.expires_in * 1000;

            token.accessToken = dataAuth.access_token;
            token.refreshToken = dataAuth.refresh_token;
            token.expiresAt = newExpiresAt;
          }
        } catch (err) {
          console.error("Erro ao renovar token:", (err as any)?.response?.data);
          // console.error("Erro ao renovar token");
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Passa os dados do token para a sessão
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          role: token.role,
          id: token.id,
          defaultPath: token.defaultPath,
          expiresIn: token.expiresIn,
          email: token.email,
          expiresAt: token.expiresAt,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
  },
  pages: {
    signIn: "/login",
    error: "/",
    signOut: "/",
    verifyRequest: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
