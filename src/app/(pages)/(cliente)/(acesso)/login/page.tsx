"use client";

import { jwtDecode } from "jwt-decode";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyLogo from "@/components/atoms/my-logo";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import PATHS, { DEFAULT_ROLE_PATHS } from "@/utils/paths";
import { useRouter } from "next/navigation";
import useLogin from "./login-store";
import { toast } from "react-toastify";
import { useAutoLogin } from "@/hooks/useAutoLogin";
import { useAuthStore } from "@/store/useAuthStore";
import GoogleLoginButton from "@/components/molecules/google-login-button";

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: string;
  iat: number;
  exp: number;
}

export default function Login() {
  const router = useRouter();
  const {
    email,
    password,
    isLoading,
    error,
    setEmail,
    setPassword,
    login,
    clearError,
  } = useLogin();
  const { setUser } = useAuthStore();

  // Adiciona o hook de auto login
  // useAutoLogin();

  const handleLogin = async () => {
    try {
      const data = await login();
      // setUser();

      const decoded = jwtDecode<DecodedToken>(data.access_token);

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

      // Verifica se existe um caminho padrão para a role
      const defaultPath =
        DEFAULT_ROLE_PATHS[mappedRole as keyof typeof DEFAULT_ROLE_PATHS];

      if (!defaultPath) {
        console.error("Caminho não encontrado para role:", mappedRole);
        toast.error("Erro no redirecionamento");
        return;
      }

      router.push(defaultPath);
      router.refresh();

      toast.success("Login realizado com sucesso!");
    } catch (err) {
      console.error("Erro no login:", err);
      toast.error(error || "Erro ao fazer login");
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
            placeholder="b2adventure@gmail.com"
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
            type="password"
            noHintText
            value={password}
            onChange={(e) => {
              clearError();
              setPassword(e.target.value);
            }}
            className="mt-2"
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
            className="mt-4"
            onClick={() => router.push(PATHS["esqueci-minha-senha"])}
          >
            Esqueci minha senha
          </MyButton>

          <MyButton
            className="mt-8"
            variant="default"
            borderRadius="squared"
            size="md"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Login"}
          </MyButton>

          {/* <MyButton
            className="mt-4"
            variant="outline-neutral"
            borderRadius="squared"
            size="md"
            leftIcon={<MyIcon name="google" />}
          >
            Logar com o Google
          </MyButton> */}

          <GoogleLoginButton />

          <MyButton
            className="mt-4"
            variant="outline-neutral"
            borderRadius="squared"
            size="md"
            leftIcon={<MyIcon name="facebook" />}
          >
            Logar com o Facebook
          </MyButton>

          <div className="text-center mt-12">
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
