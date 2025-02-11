"use client";

import MyButton from "@/components/atoms/my-button";
import MyCheckbox from "@/components/atoms/my-checkbox";
import MyIcon from "@/components/atoms/my-icon";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function Cadastro() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [visibility, setVisibility] = React.useState(false);
  
  const handleCadastro = () => {
    if (password === confirmPassword) {
      router.push(PATHS.login);
    } else {
      toast.error("As senhas não coincidem");
    }
  };

  return (
    <section className="flex flex-col bg-white rounded-lg max-w-lg m-auto w-full py-16 px-6 md:px-12">

      <div className="relative flex max-sm:flex-col gap-4 md:items-center">
        <MyIcon
          name="voltar"
          className=""
          onClick={() => router.push(PATHS.login)}
        />
      <MyTypography variant="heading2" weight="bold" className="mt-2">
        Cadastre-se
      </MyTypography>
      </div>


      <div className="my-6">
        <MyTextInput label="Nome Completo" placeholder="Nome Completo" className="mt-2"/>
        <MyTextInput
          type="email"
          label="Email ou celular"
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

        <MyCheckbox label="Li e aceito os termos de uso" />
      </div>

      <div className="flex flex-col">
        <MyButton
          className=""
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
