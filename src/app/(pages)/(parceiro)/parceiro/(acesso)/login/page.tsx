"use client";

import React, { useEffect } from "react";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyLogo from "@/components/atoms/my-logo";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import PATHS, { DEFAULT_ROLE_PATHS } from "@/utils/paths";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/useAuthStore";
import GoogleLoginButton from "@/components/molecules/google-login-button";
import { getSession, signIn, useSession } from "next-auth/react";
import FacebookLoginButton from "@/components/molecules/facebook-login-button";
import useLogin from "@/store/useLogin";

export default function Login() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const { data: session, status } = useSession();

  const [visibility, setVisibility] = React.useState(false);

  const { email, password, error, setEmail, setPassword, clearError } =
    useLogin();

  useEffect(() => {
    const handleSessionUpdate = async () => {
      if (status === "authenticated" && session?.user?.role) {
        try {
          const userData = {
            id: session.user.id,
            name: session.user.name ?? "",
            email: session.user.email ?? "",
            role: session.user.role.toLowerCase(),
          };

          setUser({
            id: session.user.id!, // Garante que id não é undefined
            name: userData.name,
            email: userData.email,
            role: userData.role,
          });

          const userRole = session.user.role.toLowerCase();
          const roleMapping = {
            superadmin: "admin",
            admin: "admin",
            partner: "partner",
            customer: "customer",
          };

          const mappedRole = roleMapping[userRole as keyof typeof roleMapping];
          const defaultPath =
            DEFAULT_ROLE_PATHS[mappedRole as keyof typeof DEFAULT_ROLE_PATHS];

          if (defaultPath) {
            console.log("Redirecionando para:", defaultPath);
            router.replace(defaultPath);
          }
        } catch (error) {
          console.error("Erro ao processar sessão:", error);
        }
      }
    };

    handleSessionUpdate();
  }, [session, status]);

  const handleLogin = async () => {
    setIsLoading(true);
    const credentials = { email, password };
    try {
      await signIn("credentials", {
        ...credentials,
        redirect: false,
      });

      // if (!session?.user?.role) {
      //   console.log("Erro ao obter dados do usuário");
      //   toast.error("Erro ao fazer login. Tente novamente em 5 minutos!");
      //   return;
      // }

      // const userRole = session.user.role.toLowerCase() ?? "";

      // // Atualiza o user no store global
      // setUser({
      //   id: session.user.id ?? "",
      //   name: session.user.name ?? "",
      //   email: session.user.email ?? "",
      //   role: userRole,
      // });

      // router.push(session.user.defaultPath ?? "/");

      toast.success("Login realizado com sucesso!");
    } catch (err) {
      console.error("Erro no login:", err);
      toast.error(error || "Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col bg-white rounded-lg max-w-lg m-auto w-full">
      <div className="px-6 md:px-12 md:py-6">
        <div className="relative">
          <MyLogo
            variant="mobile"
            width={200}
            height={200}
            className="mx-auto"
          />
          <MyIcon
            name="voltar"
            className="absolute top-16 left-0 md:hidden"
            onClick={() => router.push(PATHS.initial)}
          />
        </div>

        <MyTypography variant="heading2" weight="bold" className="mt-4">
          Login
        </MyTypography>

        <div className="mt-6">
          <MyTextInput
            label="E-mail"
            noHintText
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => {
              clearError();
              setEmail(e.target.value);
            }}
            className="mt-2"
          />
        </div>

        <div className="mt-6">
          <MyTextInput
            label="Senha"
            placeholder="******"
            type={visibility ? "text" : "password"}
            rightIcon={
              <MyIcon
                name={visibility ? "eye" : "hide"}
                className="mr-4 mt-6 cursor-pointer"
                onClick={() => setVisibility((prev) => !prev)}
              />
            }
            className="mt-2"
            onChange={(e) => {
              clearError();
              setPassword(e.target.value);
            }}
          />
        </div>

        {error && (
          <MyTypography variant="caption" className="text-red-500 mt-2">
            {error}
          </MyTypography>
        )}

        <div className="flex flex-col">
          <MyButton
            variant="text"
            className="p-0  underline"
            onClick={() => router.push(PATHS["esqueci-minha-senha"])}
          >
            Esqueci minha senha
          </MyButton>

          <MyButton
            className="mt-8 "
            variant="default"
            borderRadius="squared"
            size="md"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Login"}
          </MyButton>

          <GoogleLoginButton />

          <FacebookLoginButton />
          <div className="text-center mt-4">
            <MyTypography
              variant="label"
              weight="regular"
              className="text-[#5F5C6B]"
            >
              Deseja ser um parceiro? Clique{" "}
              <MyButton
                variant="text"
                className="p-0 underline"
                onClick={() => router.push(PATHS.parceiro)}
              >
                aqui
              </MyButton>
              .
            </MyTypography>
          </div>

          <div className="text-center mt-4">
            <MyTypography
              variant="label"
              weight="regular"
              className="text-[#5F5C6B]"
            >
              Ainda não tem uma conta?
            </MyTypography>
            <MyButton
              variant="text"
              onClick={() => router.push(PATHS.cadastro)}
            >
              Cadastre-se
            </MyButton>
          </div>
        </div>
      </div>
    </section>
  );
}
