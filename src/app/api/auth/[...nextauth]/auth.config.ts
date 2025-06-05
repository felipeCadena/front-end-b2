import { type NextAuthOptions, type User } from "next-auth";
import { addSeconds, isAfter, parseISO } from "date-fns";

import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { authService } from "@/services/api/auth";
import { jwtDecode } from "jwt-decode";
import { DEFAULT_ROLE_PATHS } from "@/utils/paths";
import { signIn, signOut } from "next-auth/react";

type JWTCallback = {
  user: any;
  token: any;
};

type SignCallback = {
  user: any;
  account: any;
};

type SessionCallback = {
  session: any;
  token: any;
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
  partner?: {
    id: number;
    fantasyName: string;
    isActive: boolean;
  };
}

const processedLogins = new Set<string>();

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

          // console.log("response login: " + response?.refresh_token);
          // console.log("response login access_token: " + response?.access_token);

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
            partnerId: decodedToken?.partner?.id,
            partnerName: decodedToken?.partner?.fantasyName,
            partnerIsActive: decodedToken?.partner?.isActive,
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
        const userId = user.email; // Use email or another unique identifier
        if (processedLogins.has(userId)) {
          // console.log(`Login already processed for user: ${userId}`);
          return true; // Retorna true para evitar processamento duplicado
        }

        processedLogins.add(userId);

        // Se for login social
        if (account?.provider === "google") {
          if (!account?.id_token) return false;

          const response = await authService.loginWithSocialNetwork(
            account.id_token,
            account.provider
          );

          if (!response) return false;

          // console.log("response google: " + response?.refresh_token);
          // console.log(
          //   "response google access_token: " + response?.access_token
          // );

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
          (user.partnerId = decodedToken?.partner?.id),
            (user.partnerName = decodedToken?.partner?.fantasyName),
            (user.partnerIsActive = decodedToken?.partner?.isActive),
            (user.defaultPath =
              DEFAULT_ROLE_PATHS[
                decodedToken?.role.toLowerCase() as keyof typeof DEFAULT_ROLE_PATHS
              ]);
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

          console.log("response google: " + response?.refresh_token);

          (user.email = decodedToken.email),
            (user.name = decodedToken.name),
            (user.accessToken = response.access_token),
            (user.refreshToken = response.refresh_token),
            (user.role = decodedToken.role);
          user.expiresIn = response.expires_in;
          user.expiresAt = expiresAt;
          (user.partnerId = decodedToken?.partner?.id),
            (user.partnerName = decodedToken?.partner?.fantasyName),
            (user.partnerIsActive = decodedToken?.partner?.isActive),
            (user.defaultPath =
              DEFAULT_ROLE_PATHS[
                decodedToken?.role.toLowerCase() as keyof typeof DEFAULT_ROLE_PATHS
              ]);
        }

        return true;
      } catch (error) {
        console.error("Erro no login por rede social:", error);
        return false;
      }
    },
    async jwt({ token, user }: JWTCallback) {
      // console.log("token: " + token?.refreshToken);
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresIn = user.expiresIn;
        token.role = user.role;
        token.id = user.id;
        token.email = user.email;
        token.defaultPath = user.defaultPath;
        token.expiresAt = user.expiresAt;
        token.loginSocial = user.loginSocial;
        token.partnerId = user.partnerId;
        token.partnerName = user.partnerName;
        token.partnerIsActive = user.partnerIsActive;

        return token;
      }

      const now = Date.now();

      if (token?.expiresAt && now > token.expiresAt && token?.refreshToken) {
        // console.log("token if expirado " + token?.refreshToken);
        try {
          const dataAuth = await authService.refreshToken(token?.refreshToken);

          // console.log("dataAuth?.access_token: " + dataAuth?.access_token);
          // console.log("dataAuth?.access_token: " + dataAuth?.refresh_token);

          if (dataAuth?.access_token) {
            const newExpiresAt = Date.now() + dataAuth.expires_in * 1000;

            // Atualiza tudo
            return {
              ...token, // preserva os campos anteriores
              accessToken: dataAuth.access_token,
              refreshToken: dataAuth.refresh_token,
              expiresAt: newExpiresAt,
            };
          }
        } catch (err) {
          console.error("Erro ao renovar token:", (err as any)?.response?.data);
          return {
            ...token,
            error: "RefreshAccessTokenError", // <- chave para verificar no frontend
          };
        }
      }

      return token;
    },
    async session({ session, token }: SessionCallback) {
      // console.log("token session ", token?.refreshToken);

      if (token?.error) {
        session.error = "RefreshAccessTokenError";
        session.user = null;
      } else if (token) {
        session.user = {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          role: token.role,
          id: token.id,
          defaultPath: token.defaultPath,
          expiresIn: token.expiresIn,
          email: token.email,
          expiresAt: token.expiresAt,
        };
        // você pode adicionar os dados do parceiro diretamente na session
        session.partnerId = token.partnerId;
        session.partnerName = token.partnerName;
        session.partnerIsActive = token.partnerIsActive;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/",
    // verifyRequest: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
