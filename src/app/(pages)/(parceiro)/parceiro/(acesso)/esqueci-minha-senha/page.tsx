"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyLogo from "@/components/atoms/my-logo";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React from "react";

export default function EsqueciMinhaSenha() {
  const router = useRouter();
  return (
    <section className="flex flex-col bg-white rounded-lg max-w-lg m-auto w-full py-16 px-6 md:px-12">
      <div className="relative flex max-sm:flex-col gap-4 md:items-center">
        {/* <MyLogo
          variant="mobile"
          width={200}
          height={200}
          className="mx-auto"
        /> */}
        <MyIcon name="voltar" className="" onClick={() => router.back()} />
        <MyTypography variant="heading2" weight="bold">
          Esqueci minha senha
        </MyTypography>
      </div>

      <div className="mt-6">
        <MyTextInput
          label="E-mail"
          noHintText
          placeholder="b2adventure@gmail.com"
          className="mt-2"
        />
      </div>
      <div className="flex flex-col">
        <MyButton
          className="mt-8"
          variant="default"
          borderRadius="squared"
          size="md"
        >
          Solicitar nova senha
        </MyButton>

        <div className="text-center mt-12">
          <MyTypography
            variant="label"
            weight="regular"
            className="text-[#5F5C6B]"
          >
            Lembrou da sua senha?
          </MyTypography>
          <MyButton
            variant="text"
            onClick={() => router.push(PATHS["login-parceiro"])}
          >
            Bora lá!
          </MyButton>
        </div>
      </div>
    </section>
  );
}
