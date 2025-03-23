import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { storage } from "@/services/auth";
import { DEFAULT_ROLE_PATHS } from "@/utils/paths";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/useAuthStore";

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: string;
  exp: number;
}

export function useAutoLogin() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  useEffect(() => {
    // Verifica se já está em processo de login manual
    const isLoggingIn = sessionStorage.getItem("isLoggingIn");
    if (isLoggingIn) {
      sessionStorage.removeItem("isLoggingIn");
      return;
    }

    const checkAuthAndRedirect = () => {
      try {
        const auth = storage.getTokens();
        if (!auth?.access_token) {
          console.log("Não há token de autenticação");
          return;
        }

        const decoded = jwtDecode<DecodedToken>(auth.access_token);

        // Verifica se o token está válido
        const isTokenValid = decoded.exp * 1000 > Date.now();

        if (isTokenValid) {
          // Atualiza o user no store global
          setUser();

          const userRole = decoded.role.toLowerCase();

          const roleMapping = {
            superadmin: "admin",
            admin: "admin",
            partner: "partner",
            customer: "customer",
          };

          const mappedRole = roleMapping[userRole as keyof typeof roleMapping];
          const defaultPath =
            DEFAULT_ROLE_PATHS[mappedRole as keyof typeof DEFAULT_ROLE_PATHS];

          // Verifica se há um redirect na URL
          // const params = new URLSearchParams(window.location.search);
          // const redirectTo = params.get("redirect");

          // Redireciona para o redirect ou para o path padrão
          // const finalPath = redirectTo || defaultPath;

          toast.success("Login automático realizado!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          console.log("Login automático realizado!");
          router.push(defaultPath);
        }
      } catch (error) {
        console.error("Erro no auto login:", error);
        storage.clear(); // Limpa storage em caso de erro
      }
    };

    checkAuthAndRedirect();
  }, [router, setUser]);
}
