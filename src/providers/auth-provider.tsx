"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "@/store/useAuthStore";
import { storage } from "@/services/api/auth";
import Loading from "@/components/molecules/loading";
import { PATHS_CONFIG } from "@/utils/paths";

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: string;
  exp: number;
}

const DEFAULT_PATHS = {
  customer: "/atividades",
  admin: "/admin",
  partner: "/parceiro/minhas-atividades",
} as const;

const isPublicRoute = (path: string) => {
  return PATHS_CONFIG.public.some((publicPath) => {
    // Verifica rotas exatas
    if (path === publicPath) return true;
    // Verifica rotas dinâmicas (com *)
    if (publicPath.endsWith("*")) {
      const basePath = publicPath.slice(0, -1);
      return path.startsWith(basePath);
    }
    return false;
  });
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      if (isPublicRoute(pathname)) {
        setIsLoading(false);
        return;
      }

      try {
        const auth = storage.getTokens();
        if (!auth?.access_token) {
          if (!pathname.startsWith("/login")) {
            router.push("/login");
          }
          setIsLoading(false);
          return;
        }

        const decoded = jwtDecode<DecodedToken>(auth.access_token);
        const isTokenValid = decoded.exp * 1000 > Date.now();

        if (!isTokenValid) {
          storage.clear();
          router.push("/login");
          return;
        }

        // Atualiza o estado do usuário
        setUser();

        const userRole = decoded.role.toLowerCase();
        const roleMapping = {
          superadmin: "admin",
          admin: "admin",
          partner: "partner",
          customer: "customer",
        };

        const mappedRole = roleMapping[userRole as keyof typeof roleMapping];

        const hasPermission = () => {
          if (pathname.startsWith("/admin")) {
            return mappedRole === "admin";
          }
          if (pathname.startsWith("/parceiro")) {
            return mappedRole === "partner" || mappedRole === "admin";
          }
          return true;
        };

        if (!hasPermission()) {
          const defaultPath =
            DEFAULT_PATHS[mappedRole as keyof typeof DEFAULT_PATHS];
          router.push(defaultPath);
        }
      } catch (error) {
        console.error("Erro na verificação de auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname]);

  return (
    <SessionProvider>{isLoading ? <Loading /> : children}</SessionProvider>
  );
}
