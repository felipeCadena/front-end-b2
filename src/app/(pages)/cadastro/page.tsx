"use client";

import MyButton from "@/components/atoms/my-button";
import MyCheckbox from "@/components/atoms/my-checkbox";
import MyIcon from "@/components/atoms/my-icon";
import MyLogo from "@/components/atoms/my-logo";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React from "react";

export default function Cadastro() {
  const router = useRouter();
  return (
    <section className="px-6">
      <div className="">
        <MyIcon
          name="voltar"
          className="mt-8"
          onClick={() => router.push(PATHS.login)}
        />
      </div>

      <MyTypography variant="heading2" weight="bold" className="mt-2">
        Cadastre-se
      </MyTypography>

      <div className="mt-6">
        <MyTextInput label="Nome Completo" placeholder="Nome Completo" />
        <MyTextInput
          type="email"
          label="Email ou celular"
          placeholder="b2adventure@gmail.com"
        />
        <MyTextInput
          label="Telefone/Celular"
          placeholder="b2adventure@gmail.com"
        />
        <MyTextInput
          label="Senha"
          placeholder="******"
          type="password"
          rightIcon={<MyIcon name="eye" className="mr-4 mt-2" />}
        />
        <MyTextInput
          label="Confirmar Senha"
          placeholder="******"
          type="password"
          rightIcon={<MyIcon name="hide" className="mr-4 mt-2" />}
        />

        <MyCheckbox label="Li e aceito os termos e condições" />
      </div>

      <div className="flex flex-col">
        <MyButton
          className="mt-8"
          variant="default"
          borderRadius="squared"
          size="md"
        >
          Cadastrar Conta
        </MyButton>

        <div className="text-center mt-12">
          <MyTypography
            variant="label"
            weight="regular"
            className="text-[#5F5C6B]"
          >
            Lembrou que tem uma conta?
          </MyTypography>
          <MyButton
            onClick={() => router.push(PATHS.login)}
            variant="text"
            className=""
          >
            Bora lá!
          </MyButton>
        </div>
      </div>
    </section>
  );
}
