"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import { DEFAULT_ROLE_PATHS } from "@/utils/paths";
import { set } from "date-fns";

export default function FacebookLoginButton() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { data: session, status } = useSession();

  // useEffect(() => {
  //   const handleSessionUpdate = async () => {
  //     if (
  //       isAuthenticating &&
  //       status === "authenticated" &&
  //       session?.user?.role
  //     ) {
  //       try {
  //         const userData = {
  //           id: session.user.id,
  //           name: session.user.name ?? "",
  //           email: session.user.email ?? "",
  //           role: session.user.role.toLowerCase(),
  //         };

  //         setUser({
  //           id: session.user.id!, // Garante que id não é undefined
  //           name: userData.name,
  //           email: userData.email,
  //           role: userData.role,
  //         });

  //         const userRole = session.user.role.toLowerCase();
  //         const roleMapping = {
  //           superadmin: "admin",
  //           admin: "admin",
  //           partner: "partner",
  //           customer: "customer",
  //         };

  //         const mappedRole = roleMapping[userRole as keyof typeof roleMapping];
  //         const defaultPath =
  //           DEFAULT_ROLE_PATHS[mappedRole as keyof typeof DEFAULT_ROLE_PATHS];

  //         if (defaultPath) {
  //           console.log("Redirecionando para:", defaultPath);
  //           router.replace(defaultPath);
  //           toast.success("Login realizado com sucesso!");
  //         }
  //       } catch (error) {
  //         console.error("Erro ao processar sessão:", error);
  //         toast.error("Erro ao processar login");
  //       }
  //     }
  //   };

  //   handleSessionUpdate();
  // }, [session, status, setUser, router]);

  const handleFacebookLogin = async () => {
    try {
      setIsLoading(true);
      setIsAuthenticating(true);

      const result = await signIn("facebook", {
        redirect: false,
      });

      if (result?.error) {
        console.error("Erro no login com Facebook:", result.error);
        toast.error("Erro ao fazer login com Facebook");
      }
    } catch (error) {
      console.error("Erro no processo de login:", error);
      toast.error("Erro ao processar login");
    } finally {
      setIsLoading(false);
      setIsAuthenticating(false);
    }
  };

  return (
    <MyButton
      className="mt-4"
      variant="outline-neutral"
      borderRadius="squared"
      size="md"
      leftIcon={<MyIcon name="facebook" />}
      onClick={handleFacebookLogin}
      disabled={isLoading}
    >
      {isLoading ? "Entrando..." : "Logar com o Facebook"}
    </MyButton>
  );
}
