"use client";

import { hiddenActivities, recentActivities } from "@/common/constants/mock";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import Star from "@/components/atoms/my-icon/elements/star";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import StarRating from "@/components/molecules/my-stars";
import ActivitiesHidden from "@/components/organisms/activities-hidden";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function Parceiro() {
  const router = useRouter();
  const { id } = useParams();

  const partnes = [
    {
      id: 1,
      name: "Luis Otávio Menezes",
      activitiesCount: 20,
      avatar: "/images/avatar3.png",
      isNew: false,
      star: 5,
    },
    {
      id: 2,
      name: "Vitória Batista",
      activitiesCount: 15,
      avatar: "/images/avatar1.png",
      isNew: false,
      star: 4,
    },
    {
      id: 4,
      name: "Vitória Batista",
      activitiesCount: 5,
      avatar: "/images/avatar1.png",
      isNew: false,
      star: 3,
    },
    {
      id: 5,
      name: "Vitória Batista",
      activitiesCount: 13,
      avatar: "/images/avatar1.png",
      isNew: false,
      star: 1,
    },
  ];

  const partner = partnes.find((partner) => partner.id === +id);

  return (
    <main className="space-y-6 px-4 mb-8">
      <div className="flex items-center gap-3 bg-white">
        <MyIcon
          name="voltar-black"
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle2" weight="bold">
          Parceiro Cadastrado
        </MyTypography>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <Image
          alt="avatar"
          src={partner?.avatar ?? ""}
          width={28}
          height={28}
          className="w-28 h-28 rounded-full object-contain"
        />
        <div className="relative">
          <MyTypography variant="label" weight="semibold">
            {partner?.name}
          </MyTypography>
          <MyIcon
            name="chat-web"
            className="cursor-pointer absolute top-0 -right-10"
          />
          <MyTypography
            variant="label"
            weight="regular"
            lightness={400}
            className="mt-2"
          >
            {partner?.activitiesCount} Atividades
          </MyTypography>
        </div>

        <div className="flex gap-2 items-center">
          <StarRating rating={partner?.star ?? 0} />
          <span className="font-bold">{partner?.star.toFixed(1)}</span>(
          {partner?.activitiesCount} Avaliações)
        </div>
      </div>

      <div>
        <MyTypography variant="subtitle1" weight="bold" className="">
          Atividades Recentes
        </MyTypography>

        <ActivitiesHidden notifications={recentActivities} />
      </div>

      <div className="w-full my-6 md:max-w-2xl md:mx-auto flex flex-col gap-1 md:items-center">
        <MyTypography variant="subtitle1" weight="bold" className="mb-4">
          Dados cadastrais
        </MyTypography>
        <MyTextInput
          type="email"
          label="E-mail"
          placeholder="b2adventure@gmail.com"
          className="mt-2"
          //   value={email ?? ""}
        />
        <MyTextInput
          label="Nome Completo"
          placeholder="Nome Completo"
          // value={activity?.parceiro?.nome}
          className="mt-2"
        />
        {/* <MyTextInput
          label="Senha cadastrada"
          placeholder="******"
          type={visibility ? "text" : "password"}
          rightIcon={<MyIcon name={visibility ? "hide" : "eye"} className="mr-4 mt-2 cursor-pointer" onClick={() => setVisibility(prev => !prev)} />}
          className="mt-2"
        /> */}

        <div className="mt-4">
          <MyTextInput
            type="empresa"
            label="Nome da empresa/pessoa"
            placeholder="Nome completo"
            className="mt-2"
            //   value={email ?? ""}
          />
          <MyTextInput
            label="CNPJ ou CPF"
            placeholder="CNPJ ou CPF"
            // value={activity?.parceiro?.nome}
            className="mt-2"
          />
        </div>
      </div>

      <div className="space-y-2">
        <MyTypography variant="subtitle3" weight="semibold" className="mb-3">
          Dados Bancários
        </MyTypography>
        <MyTextInput
          label="Número da conta"
          placeholder="0987 2348 2348 1243"
          className="mt-2"
        />

        <div className="flex gap-4">
          <MyTextInput
            label="Agência"
            placeholder="Digite sua agência"
            className="mt-2"
          />

          <MyTextInput label="Banco" placeholder="001" className="mt-2" />
        </div>

        <MySelect
          //   value={}
          //   onValueChange={}
          label="Data de Pagamento"
        >
          <SelectTrigger className="py-6 mt-1 mb-4">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectItem value="05">Todo dia 05</SelectItem>
            <SelectItem value="10">Todo dia 10</SelectItem>
            <SelectItem value="15">Todo dia 15</SelectItem>
          </SelectContent>
        </MySelect>
      </div>

      <div className="flex justify-center gap-4">
        <MyButton
          variant="default"
          borderRadius="squared"
          size="lg"
          className="w-full"
        >
          Gerenciar
        </MyButton>
        <MyButton
          variant="red"
          borderRadius="squared"
          size="lg"
          className="w-full"
          leftIcon={<MyIcon name="trash" className="" />}
        >
          Excluir
        </MyButton>
      </div>
    </main>
  );
}
