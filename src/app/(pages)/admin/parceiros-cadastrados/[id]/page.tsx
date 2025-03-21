"use client";

import { recentActivities } from "@/common/constants/mock";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
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

      <div className="space-y-6 md:bg-gray-100 md:border md:rounded-2xl relative">
        <div className="relative">
          <Image
            alt="foto de capa"
            src="/images/atividades/ar/ar-4.jpeg"
            width={375}
            height={150}
            className="w-full h-[300px] object-cover object-bottom rounded-t-2xl max-sm:hidden"
          />

          <div className="absolute max-sm:hidden -bottom-14 left-16">
            <Image
              alt="avatar"
              src={partner?.avatar ?? ""}
              width={28}
              height={28}
              className="w-32 h-32 rounded-full object-fit relative border-4 border-white"
            />
            <div className="absolute -top-1 -right-1 w-10 h-10 bg-primary-400 rounded-full border-4 border-white" />
          </div>
        </div>

        <div className="space-y-6 md:px-6 md:py-12 md:max-w-4xl md:mx-auto md:">
          <div className="flex flex-col max-sm:items-center gap-2 max-sm:text-center">
            <div className="md:hidden relative">
              <Image
                alt="avatar"
                src={partner?.avatar ?? ""}
                width={28}
                height={28}
                className="w-28 h-28 rounded-full object-fit border-4 border-white"
              />
              <div className="absolute top-0 right-1 w-8 h-8 bg-primary-400 rounded-full border-4 border-white" />
            </div>

            <div className="relative">
              <MyTypography variant="label" weight="semibold">
                {partner?.name}
              </MyTypography>
              <MyIcon
                name="chat-web"
                className="cursor-pointer md:hidden absolute top-0 -right-10"
              />

              <MyButton
                variant="partner"
                size="lg"
                borderRadius="squared"
                className="max-sm:hidden absolute top-0 right-0"
                leftIcon={<MyIcon name="chat-web" className="" />}
              >
                Falar com parceiro
              </MyButton>

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

          <div className="space-y-6 md:p-6 md:max-w-4xl md:mx-auto md:pt-24">
            <div>
              <MyTypography variant="subtitle1" weight="bold" className="">
                Atividades Recentes
              </MyTypography>

              <ActivitiesHidden notifications={recentActivities} admin />
            </div>

            <div className="w-full my-6 flex flex-col gap-1">
              <MyTypography variant="subtitle1" weight="bold" className="mb-4">
                Dados cadastrais
              </MyTypography>

              <div className="md:grid md:grid-cols-2 md:gap-4">
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
              <MyTypography
                variant="subtitle3"
                weight="semibold"
                className="mb-3"
              >
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
                Atualizar
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
          </div>
        </div>
      </div>
    </main>
  );
}
