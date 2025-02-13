"use client"

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyLogo from "@/components/atoms/my-logo";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React from "react";

export default function CadastroParceiro() {
  const [visibility, setVisibility] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const router = useRouter();

  return (
    <section className="m-6 space-y-4">
       <div className="relative">
          <MyLogo
            variant="mobile"
            width={100}
            height={100}
            className="mx-auto"
          />
          <MyIcon
            name="voltar"
            className="absolute top-1/3 left-0 md:hidden"
            onClick={() => router.push(PATHS.initial)}
          />
        </div>
      <div className="space-y-2">
        <MyTypography variant="heading2" weight="bold">
          Quer ser um de nossos parceiros?
        </MyTypography>
        <MyTypography variant="subtitle3" weight="regular" lightness={400}>
          Só precisa preencher alguns dados antes.
        </MyTypography>
      </div>

      <div className="space-y-2">
        <MyTextInput label="Nome Completo" placeholder="Nome Completo" className="mt-2"/>
        <MyTextInput
          type="email"
          label="E-mail ou celular"
          placeholder="b2adventure@gmail.com"
          className="mt-2"
        />
        <MyTextInput
          label="Telefone/Celular"
          placeholder="b2adventure@gmail.com"
          className="mt-2"
        />
        <MyTextInput
          label="Senha"
          placeholder="******"
          type={visibility ? "text" : "password"}
          rightIcon={<MyIcon name={visibility ? "hide" : "eye"} className="mr-4 mt-2 cursor-pointer" onClick={() => setVisibility(prev => !prev)} />}
          className="mt-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <MyTextInput
          label="Confirmar Senha"
          placeholder="******"
          type={visibility ? "text" : "password"}
          rightIcon={<MyIcon name={visibility ? "hide" : "eye"} className="mr-4 mt-2 cursor-pointer" onClick={() => setVisibility(prev => !prev)}/>}
          className="mt-2"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <MyButton
          className=""
          variant="default"
          borderRadius="squared"
          size="md"
          onClick={() => router.push(PATHS["sobre-a-empresa"])}
        >
          Cadastrar Conta
        </MyButton>

        <div className="text-center mt-8">
          <MyTypography
            variant="label"
            weight="regular"
            className="text-[#5F5C6B]"
          >
            Lembrou que tem uma conta?
          </MyTypography>
          <MyButton
            onClick={() => router.push(PATHS["login-parceiro"])}
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
