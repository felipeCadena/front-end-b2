"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyLogo from "@/components/atoms/my-logo";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React from "react";
import useLogin from "./login-store";

export default function Login() {
  const router = useRouter();
  const { email, setEmail } = useLogin();

  const handleLogin = () => {
    if (email === "cliente@gmail.com") {
      router.push(PATHS.atividades);
    }
  };

  return (
    <section className="flex flex-col bg-white rounded-lg max-w-lg m-auto w-full">
      <div className="md:px-12 md:py-6">
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
            label="Email"
            noHintText
            placeholder="b2adventure@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2"
          />
        </div>

        <div className="mt-6">
          <MyTextInput
            label="Senha"
            placeholder="******"
            type="password"
            noHintText
            className="mt-2"
          />
        </div>

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
          >
            Login
          </MyButton>

          <MyButton
            className="mt-4"
            variant="outline-neutral"
            borderRadius="squared"
            size="md"
            leftIcon={<MyIcon name="google" />}
          >
            Logar com o Google
          </MyButton>

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
