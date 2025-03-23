"use client";

import { activities } from "@/common/constants/mock";
import MyIcon from "@/components/atoms/my-icon";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import useLogin from "../(cliente)/(acesso)/login/login-store";
import MyButton from "@/components/atoms/my-button";
import { users } from "@/services/api/users";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Perfil() {
  const router = useRouter();

  const { email } = useLogin();
  const [visibility, setVisibility] = React.useState(false);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => users.getUserLogged(),
  });

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
          src={user?.photo ?? ""}
          width={28}
          height={28}
          className="w-28 h-28 rounded-full object-contain"
        />
        <div>
          <MyTypography variant="label" weight="semibold">
            {user?.name}
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

      <div className="w-full my-6 md:max-w-2xl md:mx-auto flex flex-col gap-1 items-center">
        <MyTypography variant="subtitle1" weight="bold" className="mb-4">
          Dados cadastrais
        </MyTypography>
        <MyTextInput
          type="email"
          label="E-mail"
          placeholder="b2adventure@gmail.com"
          className="mt-2"
          value={user?.email ?? ""}
        />
        <MyTextInput
          label="Nome Completo"
          placeholder="Nome Completo"
          value={user?.name}
          className="mt-2"
        />
        <MyTextInput
          label="Senha cadastrada"
          placeholder="******"
          type={visibility ? "text" : "password"}
          rightIcon={
            <MyIcon
              name={visibility ? "hide" : "eye"}
              className="mr-4 mt-2 cursor-pointer"
              onClick={() => setVisibility((prev) => !prev)}
            />
          }
          className="mt-2"
        />

        <MyButton
          variant="default"
          borderRadius="squared"
          size="lg"
          className="mt-4 px-12"
          onClick={() => router.push("/")}
        >
          Atualizar
        </MyButton>
      </div>
    </section>
  );
}
