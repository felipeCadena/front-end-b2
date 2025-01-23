"use client"

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyLogo from "@/components/atoms/my-logo";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React from "react";

export default function Login() {
  const router = useRouter()
  return (
    <section className="px-6">
      <div className="relative">
        <MyLogo
          variant="regular"
          width={200}
          height={200}
          className="mx-auto"
        />
        <MyIcon 
        name="voltar" 
        className="absolute top-10 " 
        onClick={() => router.push(PATHS.initial)}
        />
      </div>

      <MyTypography variant="heading2" weight="bold">
        Login
      </MyTypography>

      <div className="mt-6">
        <MyTextInput
          label="Email ou celular"
          noHintText
          placeholder="b2adventure@gmail.com"
        />
      </div>
      <div className="mt-6">
          
        <MyTextInput label="Senha" placeholder="******" type="password" noHintText/>
      </div>
      <div className="flex flex-col">
        <MyButton variant="text" className="mt-4" onClick={() => router.push(PATHS["esqueci-minha-senha"])}>
          Esqueci minha senha
        </MyButton>

        <MyButton
          className="mt-8"
          variant="default"
          borderRadius="squared"
          size="md"
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
          <MyButton variant="text" onClick={() => router.push(PATHS.cadastro)}>
            Cadastre-se
          </MyButton>
        </div>
      </div>
    </section>
  );
}
