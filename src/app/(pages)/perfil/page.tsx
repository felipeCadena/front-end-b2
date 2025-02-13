"use client";

import { activities } from "@/common/constants/mock";
import MyIcon from "@/components/atoms/my-icon";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import useLogin from "../(cliente)/(acesso)/login/login-store";

export default function Perfil() {
  const router = useRouter();
  const {email} = useLogin()
  const [visibility, setVisibility] = React.useState(false);
  

  const activity = activities.find((activity) => activity.id === "1");

  return (
    <section className="px-6 my-8">
      <div className="relative flex gap-4 items-center">
        <MyIcon
          name="seta"
          className="rotate-180"
          onClick={() => router.back()}
        />
        <MyTypography variant="heading3" weight="bold" className="">
          Perfil de Usuário
        </MyTypography>
      </div>

      <div className="flex flex-col items-center gap-2 text-center mt-8">
        <Image
          alt="avatar"
          src={activity?.parceiro?.avatar ?? ""}
          width={28}
          height={28}
          className="w-28 h-28 rounded-full object-contain"
        />
        <div>
          <MyTypography variant="label" weight="semibold">
            {activity?.parceiro?.nome}
          </MyTypography>
          <MyTypography
            variant="label"
            weight="regular"
            lightness={400}
            className="mt-2"
          >
            250 Atividades realizadas
          </MyTypography>
        </div>
      </div>

      <div className="my-6">
        <MyTypography variant="subtitle1" weight="bold" className="mb-4">
          Dados cadastrais
        </MyTypography>
        <MyTextInput
          type="email"
          label="E-mail"
          placeholder="b2adventure@gmail.com"
          className="mt-2"
          value={email ?? ""}
        />
        <MyTextInput label="Nome Completo" placeholder="Nome Completo" value={activity?.parceiro?.nome} className="mt-2"/>
        <MyTextInput
          label="Senha cadastrada"
          placeholder="******"
          type={visibility ? "text" : "password"}
          rightIcon={<MyIcon name={visibility ? "hide" : "eye"} className="mr-4 mt-2 cursor-pointer" onClick={() => setVisibility(prev => !prev)} />}
          className="mt-2"
        />
      </div>
    </section>
  );
}
